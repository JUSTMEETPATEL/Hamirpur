FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtual environment
RUN python -m venv /app/venv

# Copy requirements file first
COPY backend/requirements.txt .

# Install dependencies inside virtual environment
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Make sure the script is executable
RUN chmod +x server.py

# Expose the port
EXPOSE 8000

# Use the virtual environment when running the server
CMD ["/app/venv/bin/python", "server.py"]
