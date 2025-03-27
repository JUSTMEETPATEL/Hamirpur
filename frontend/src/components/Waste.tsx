"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { toast } from "@/hooks/use-toast"; // Assuming you're using shadcn/ui toast

// Interfaces for type safety
interface Message {
  type: "question" | "result" | "error";
  content: string;
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface ClassificationData {
  questions: QuestionAnswer[];
  result: string;
  confidence?: number;
}

export default function WasteClassifier() {
  // State management
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [classificationData, setClassificationData] = useState<ClassificationData>({
    questions: [],
    result: '',
    confidence: undefined
  });
  const [status, setStatus] = useState<
    "idle" | 
    "connecting" | 
    "analyzing" | 
    "questioning" | 
    "complete" | 
    "error"
  >("idle");
  const [error, setError] = useState<string>("");
  
  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const answerInputRef = useRef<HTMLInputElement>(null);

  // Image selection handler
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Image size validation
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: "destructive", description: "Image size should be less than 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // Reset states
        setStatus("idle");
        setError("");
        setClassificationData({
          questions: [],
          result: '',
          confidence: undefined
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save classification to database
  const saveClassification = useCallback(async () => {
    if (!selectedImage || !classificationData.result) return;

    try {
      const response = await fetch('/api/save-waste-classification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          questions: classificationData.questions,
          result: classificationData.result,
          confidence: classificationData.confidence
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save classification');
      }

      toast({ variant: "default", description: "Classification saved successfully" });
    } catch (err) {
      console.error('Error saving classification:', err);
      toast({ variant: "destructive", description: "Failed to save classification" });
    }
  }, [selectedImage, classificationData]);

  // Handle user's answer to current question
  const handleAnswer = async (answer: string) => {
    if (!answer.trim()) {
      toast({ variant: "destructive", description: "Please provide an answer" });
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Update questions array with the current question and answer
      setClassificationData(prev => ({
        ...prev,
        questions: [...prev.questions, { 
          question: currentQuestion, 
          answer: answer 
        }]
      }));

      // Send answer to WebSocket
      wsRef.current.send(answer);

      // Clear input
      if (answerInputRef.current) {
        answerInputRef.current.value = '';
      }
    }
  };

  // Start classification process
  const startClassification = async () => {
    if (!selectedImage) {
      toast({ variant: "destructive", description: "Please upload an image first" });
      return;
    }

    // Reset classification data
    setClassificationData({
      questions: [],
      result: '',
      confidence: undefined
    });

    setStatus("connecting");
    setError("");

    // Establish WebSocket connection
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
          setClassificationData(prev => ({
            ...prev,
            result: message.content,
            // Optional: parse confidence if available
            // confidence: extractConfidence(message.content)
          }));
          setCurrentQuestion("");
          setStatus("complete");
          
          // Save classification to database
          saveClassification();
          break;
        case "error":
          setError(message.content);
          setStatus("error");
          toast({ variant: "destructive", description: message.content });
          break;
      }
    };

    wsRef.current.onerror = () => {
      setError("Connection error occurred. Please try again.");
      setStatus("error");
      toast({ variant: "destructive", description: "Connection error. Please try again." });
    };

    wsRef.current.onclose = () => {
      if (status !== "complete" && status !== "error") {
        setError("Connection closed unexpectedly. Please try again.");
        setStatus("error");
        toast({ variant: "destructive", description: "Connection closed unexpectedly." });
      }
    };
  };

  // Render status alerts
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
            <AlertDescription>Please answer the question</AlertDescription>
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
            {/* Status Display */}
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
                    ref={answerInputRef}
                    placeholder="Type your answer..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAnswer((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (answerInputRef.current) {
                        handleAnswer(answerInputRef.current.value);
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Result Section */}
            {classificationData.result && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Classification Result:</h3>
                <p>{classificationData.result}</p>
                {classificationData.confidence && (
                  <p className="text-sm text-gray-600 mt-2">
                    Confidence: {(classificationData.confidence * 100).toFixed(2)}%
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}