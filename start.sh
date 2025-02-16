#!/bin/bash
# Start FastAPI backend
cd /app/backend && python main.py &
# Start Next.js frontend
cd /app/frontend && npm run start