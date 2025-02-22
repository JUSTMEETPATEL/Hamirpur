
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtual environment
RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Copy requirements first to cache dependencies
COPY backend/requirements.txt .

# Install dependencies inside virtual environment
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Expose the port
EXPOSE 8000

# Ensure the backend waits for Ollama
CMD ["/app/venv/bin/python", "server.py"]
