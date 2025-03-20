/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Loader2, Upload, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface Message {
  type: "question" | "result" | "error";
  content: string;
}

export default function WasteClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "connecting" | "analyzing" | "questioning" | "complete" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const wsRef = useRef<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStatus("idle");
        setError("");
        setResult("");
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

    setStatus("connecting");
    setError("");
    setResult("");
    setQuestionCount({ current: 0, total: 0 });

    wsRef.current = new WebSocket("ws://localhost:8000/ws");

    wsRef.current.onopen = () => {
      setStatus("analyzing");
      if (wsRef.current?.readyState === WebSocket.OPEN && selectedImage) {
        wsRef.current.send(selectedImage);
      }
    };

    wsRef.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case "question":
          setStatus("questioning");
          setCurrentQuestion(message.content);
          break;
        case "result":
          setResult(message.content);
          setCurrentQuestion("");
          setStatus("complete");
          break;
        case "error":
          setError(message.content);
          setStatus("error");
          break;
      }
    };

    wsRef.current.onerror = () => {
      setError("Connection error occurred. Please try again.");
      setStatus("error");
    };

    wsRef.current.onclose = () => {
      if (status !== "complete" && status !== "error") {
        setError("Connection closed unexpectedly. Please try again.");
        setStatus("error");
      }
    };
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return (
          <Alert className="mb-4">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <AlertDescription>Connecting to the server...</AlertDescription>
          </Alert>
        );
      case "analyzing":
        return (
          <Alert className="mb-4">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <AlertDescription>Analyzing your image...</AlertDescription>
          </Alert>
        );
      case "questioning":
        return (
          <Alert className="mb-4">
            <MessageSquare className="h-4 w-4 mr-2" />

          </Alert>
        );
      case "complete":
        return (
          <Alert className="mb-4 bg-green-50">
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
            <AlertDescription>Analysis complete!</AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert className="mb-4 bg-red-50">
            <XCircle className="h-4 w-4 mr-2 text-red-600" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>E-Waste Classifier</CardTitle>
          <CardDescription>
            Upload an image of your electronic waste item for classification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getStatusDisplay()}

            {/* Image Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                disabled={status !== "idle" && status !== "error" && status !== "complete"}
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedImage ? "Change Image" : "Upload Image"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              {selectedImage && (
                <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Selected waste item"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Start Classification Button */}
            {selectedImage && (status === "idle" || status === "error" || status === "complete") && (
              <Button
                onClick={startClassification}
                className="w-full"
                disabled={["connecting", "analyzing", "questioning"].includes(status)}
              >
                {status === "complete" ? "Classify Again" : "Start Classification"}
              </Button>
            )}

            {/* Question-Answer Section */}
            {currentQuestion && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}