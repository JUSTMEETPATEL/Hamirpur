#!/bin/bash
# Start Ollama in the background
ollama serve &

# Wait for Ollama to start
sleep 5

# Pull LLAVA model (you can specify the version you want)
ollama pull llava

# Start FastAPI backend
cd /app/backend && python3 server.py &

# Start Next.js frontend
cd /app/frontend && npm run start
