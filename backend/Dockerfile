FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtual environment
RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Upgrade pip and install wheel
RUN /app/venv/bin/pip install --no-cache-dir --upgrade pip wheel setuptools

# Copy requirements first to cache dependencies
COPY backend/requirements.txt .

# Install dependencies inside virtual environment with verbose output
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt --verbose

# Copy backend source code
COPY backend/ .

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Expose the port
EXPOSE 8000

# Use entrypoint script for better startup handling
COPY <<EOF /app/entrypoint.sh
#!/bin/sh
echo "Starting backend service..."
echo "Python version: $(python --version)"
echo "Pip version: $(pip --version)"
echo "Installed packages:"
pip list

exec /app/venv/bin/python server.py
EOF

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
