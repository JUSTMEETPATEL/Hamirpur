from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import ollama
import base64
import json
from typing import List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_message(self, websocket: WebSocket, message: dict):
        if websocket in self.active_connections:
            try:
                await websocket.send_json(message)
            except RuntimeError:
                # Connection might be closed
                self.disconnect(websocket)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    try:
        # Receive the image data
        image_data = await websocket.receive_text()
        print("Debug: Received image data from client")

        # Convert base64 string back to bytes
        try:
            image_bytes = base64.b64decode(image_data.split(',')[1])
            print(f"Debug: Decoded image size: {len(image_bytes)} bytes")
        except Exception as e:
            print(f"Error decoding image data: {str(e)}")
            await manager.send_message(websocket, {
                "type": "error",
                "content": "Invalid image data received"
            })
            return

        try:
            # Generate initial questions using llava model
            print("\nDebug: === Initial Model Request ===")
            messages = [
                {
                    "role": "system",
                    "content": "You are an expert in waste categorization based on images. Your task is to ask simple, actionable "
                    "questions that help classify items into 'Reduce', 'Reuse', or 'Recycle'."
                },
                {
                    "role": "user",
                    "content": "Analyze this image and generate simple questions that will help classify the e-wastte.",
                    "images": [image_bytes]
                }
            ]
            print(f"Debug: System message: {messages[0]['content']}")
            print(f"Debug: User message: {messages[1]['content']}")
            print(f"Debug: Sending to llava model with {len(image_bytes)} bytes image")

            response = ollama.chat(model='llava', messages=messages)
            
            print("\nDebug: === Initial Model Response ===")
            print(f"Debug: Raw response: {response}")
            generated_questions = response['message']['content']
            print(f"Debug: Generated content:\n{generated_questions}")

        except Exception as e:
            print(f"\nError in initial analysis: {str(e)}")
            await manager.send_message(websocket, {
                "type": "error",
                "content": f"Error analyzing image: {str(e)}"
            })
            return

        # Extract and clean questions
        questions_start_index = generated_questions.find("1.")
        if questions_start_index == -1:
            print("\nDebug: No numbered questions found - using fallback parsing")
            questions = [q.strip() for q in generated_questions.split('?') if q.strip()]
            questions = [q + '?' for q in questions if not q.endswith('?')]
        else:
            cleaned_questions = generated_questions[questions_start_index:].strip()
            questions = [q.strip() for q in cleaned_questions.split('\n') if q.strip()]

        print(f"\nDebug: Parsed questions: {questions}")
        
        if not questions:
            print("Debug: No questions generated after parsing")
            await manager.send_message(websocket, {
                "type": "error",
                "content": "No questions were generated from the image analysis"
            })
            return

        # Send questions one by one and receive answers
        answers = []
        for idx, question in enumerate(questions):
            try:
                print(f"\nDebug: Sending question {idx+1}/{len(questions)}: {question}")
                await manager.send_message(websocket, {
                    "type": "question",
                    "content": question
                })
                
                # Receive answer from client
                answer = await websocket.receive_text()
                print(f"Debug: Received answer: {answer}")
                answers.append(answer.lower())
            except WebSocketDisconnect:
                return
            except Exception as e:
                print(f"Error during Q&A: {str(e)}")
                await manager.send_message(websocket, {
                    "type": "error",
                    "content": f"Error during question-answer phase: {str(e)}"
                })
                return

        try:
            # Generate final analysis using llava
            print("\nDebug: === Final Model Request ===")
            final_messages = [
                {
                    "role": "system",
                    "content": "You are classifying the e-waste item based on the user's answers. Provide the final categorization (Reduce, Reuse, or Recycle)."
                },
                {
                    "role": "user",
                    "content": f"Based on the user's answers: {answers}, provide the final categorization (Reduce, Reuse, or Recycle) with a clear explanation."
                }
            ]
            print(f"Debug: System message: {final_messages[0]['content']}")
            print(f"Debug: User message: {final_messages[1]['content']}")

            final_decision = ollama.chat(model='llava', messages=final_messages)

            print("\nDebug: === Final Model Response ===")
            print(f"Debug: Raw response: {final_decision}")
            decision_content = final_decision['message']['content']
            print(f"Debug: Final decision content:\n{decision_content}")

            # Send final decision to client
            await manager.send_message(websocket, {
                "type": "result",
                "content": decision_content
            })

        except Exception as e:
            print(f"\nError in final decision: {str(e)}")
            await manager.send_message(websocket, {
                "type": "error",
                "content": f"Error generating final decision: {str(e)}"
            })

    except WebSocketDisconnect:
        print("Client disconnected unexpectedly")
        manager.disconnect(websocket)
    except Exception as e:
        print(f"\nUnhandled error: {str(e)}")
        try:
            await manager.send_message(websocket, {
                "type": "error",
                "content": str(e)
            })
        except:
            pass
    finally:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
