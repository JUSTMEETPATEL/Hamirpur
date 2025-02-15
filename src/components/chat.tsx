"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";

interface Message {
  type: "question" | "result" | "error";
  content: string;
}

export default function WasteClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(answer);
    }
  };

  const startClassification = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setError("");
    setResult("");

    wsRef.current = new WebSocket("ws://localhost:8000/ws");

    wsRef.current.onopen = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN && selectedImage) {
        wsRef.current.send(selectedImage);
      }
    };

    wsRef.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case "question":
          setCurrentQuestion(message.content);
          break;
        case "result":
          setResult(message.content);
          setCurrentQuestion("");
          setIsProcessing(false);
          break;
        case "error":
          setError(message.content);
          setIsProcessing(false);
          break;
      }
    };

    wsRef.current.onerror = () => {
      setError("WebSocket error occurred");
      setIsProcessing(false);
    };

    wsRef.current.onclose = () => {
      setIsProcessing(false);
    };
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>E-Waste Classifier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              {selectedImage && (
                <div className="relative w-full h-64">
                  <Image
                    height={64}
                    width={64}
                    src={selectedImage}
                    alt="Selected waste item"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Start Classification Button */}
            {selectedImage && !isProcessing && !currentQuestion && (
              <Button
                onClick={startClassification}
                className="w-full"
                disabled={isProcessing}
              >
                Start Classification
              </Button>
            )}

            {/* Question-Answer Section */}
            {currentQuestion && (
              <div className="space-y-4">
                <p className="font-medium">{currentQuestion}</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your answer..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAnswer((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector(
                        'input[type="text"]'
                      ) as HTMLInputElement;
                      handleAnswer(input.value);
                      input.value = "";
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Result Section */}
            {result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Classification Result:</h3>
                <p>{result}</p>
              </div>
            )}

            {/* Error Section */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                <p>{error}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
