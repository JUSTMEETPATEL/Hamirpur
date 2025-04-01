from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import ollama
import base64
import io
from PIL import Image
import traceback
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
            except Exception as e:
                print(f"Error sending message: {e}")
                self.disconnect(websocket)

def process_image(image_bytes):
    """
    Process and validate the input image
    
    Args:
        image_bytes (bytes): Raw image bytes
    
    Returns:
        bytes: Processed image bytes suitable for Ollama
    """
    try:
        # Open image and convert to RGB PNG
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB to ensure compatibility
        rgb_image = image.convert('RGB')
        
        # Resize if image is too large (optional)
        MAX_SIZE = (1024, 1024)
        if rgb_image.size[0] > MAX_SIZE[0] or rgb_image.size[1] > MAX_SIZE[1]:
            rgb_image.thumbnail(MAX_SIZE, Image.LANCZOS)
        
        # Save to buffer
        buffered = io.BytesIO()
        rgb_image.save(buffered, format="PNG")
        processed_image_bytes = buffered.getvalue()
        
        print(f"Image processed. Original size: {image.size}, New size: {rgb_image.size}")
        return processed_image_bytes
    
    except Exception as e:
        print(f"Image processing error: {e}")
        traceback.print_exc()
        raise ValueError(f"Could not process image: {str(e)}")

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    try:
        # Receive the image data
        image_data = await websocket.receive_text()
        print("Debug: Received image data from client")

        # Decode base64 image data
        try:
            # Handle both standard and data URL base64 formats
            if ',' in image_data:
                image_bytes = base64.b64decode(image_data.split(',')[1])
            else:
                image_bytes = base64.b64decode(image_data)
            
            print(f"Debug: Decoded image size: {len(image_bytes)} bytes")
        except Exception as e:
            print(f"Error decoding image data: {str(e)}")
            traceback.print_exc()
            await manager.send_message(websocket, {
                "type": "error",
                "content": "Invalid image data received"
            })
            return

        # Process image
        try:
            processed_image_bytes = process_image(image_bytes)
        except ValueError as ve:
            await manager.send_message(websocket, {
                "type": "error",
                "content": str(ve)
            })
            return

        # Generate initial questions using llava model
        try:
            messages = [
                {
                    "role": "system",
                    "content": "You are an expert in waste categorization based on images. Your task is to ask simple, actionable "
                    "questions that help classify items into 'Reduce', 'Reuse', or 'Recycle'."
                },
                {
                    "role": "user",
                    "content": "Analyze this image and generate simple, clear questions to help classify the e-waste.",
                    "images": [processed_image_bytes]
                }
            ]

            response = ollama.chat(model='llava:latest', messages=messages)
            generated_questions = response['message']['content']
            print(f"Generated questions: {generated_questions}")

        except Exception as e:
            print(f"Error in initial analysis: {str(e)}")
            traceback.print_exc()
            await manager.send_message(websocket, {
                "type": "error",
                "content": f"Error analyzing image: {str(e)}"
            })
            return

        # Extract and clean questions
        questions_start_index = generated_questions.find("1.")
        if questions_start_index == -1:
            questions = [q.strip() + '?' for q in generated_questions.split('?') if q.strip()]
        else:
            cleaned_questions = generated_questions[questions_start_index:].strip()
            questions = [q.strip() for q in cleaned_questions.split('\n') if q.strip()]

        if not questions:
            await manager.send_message(websocket, {
                "type": "error",
                "content": "No questions were generated from the image analysis"
            })
            return

        # Send questions and receive answers
        answers = []
        for idx, question in enumerate(questions, 1):
            try:
                await manager.send_message(websocket, {
                    "type": "question",
                    "content": f"{idx}. {question}"
                })
                
                # Receive answer from client
                answer = await websocket.receive_text()
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

        # Generate final analysis
        try:
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

            final_decision = ollama.chat(model='llava:latest', messages=final_messages)
            decision_content = final_decision['message']['content']

            # Send final decision to client
            await manager.send_message(websocket, {
                "type": "result",
                "content": decision_content
            })

        except Exception as e:
            print(f"Error in final decision: {str(e)}")
            traceback.print_exc()
            await manager.send_message(websocket, {
                "type": "error",
                "content": f"Error generating final decision: {str(e)}"
            })

    except WebSocketDisconnect:
        print("Client disconnected unexpectedly")
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Unhandled error: {str(e)}")
        traceback.print_exc()
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