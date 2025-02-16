# Use multi-stage build
FROM python:3.9-slim as python-base

# Set working directory for Python app
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Python backend files
COPY backend/ .

# Node.js stage
FROM node:18-alpine as node-base

# Set working directory for Next.js app
WORKDIR /app/frontend

# Install Node.js dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy Next.js frontend files
COPY frontend/ .

# Build Next.js app
RUN npm run build

# Final stage
FROM python:3.9-slim

WORKDIR /app

# Copy Python backend from python-base
COPY --from=python-base /app/backend /app/backend
COPY --from=python-base /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

# Copy Next.js build from node-base
COPY --from=node-base /app/frontend/.next /app/frontend/.next
COPY --from=node-base /app/frontend/public /app/frontend/public
COPY --from=node-base /app/frontend/node_modules /app/frontend/node_modules
COPY --from=node-base /app/frontend/package*.json /app/frontend/

# Install necessary runtime dependencies
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Expose ports for both FastAPI and Next.js
EXPOSE 3000 8000

# Copy the startup script
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]