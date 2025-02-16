# Final stage
FROM cuda-base

WORKDIR /app

# Copy Python backend from python-base
COPY --from=python-base /app/backend /app/backend
# Fix: Copy from the correct Python packages location
COPY --from=python-base /usr/lib/python3/dist-packages /usr/lib/python3/dist-packages
COPY --from=python-base /usr/local/lib/python3/dist-packages /usr/local/lib/python3/dist-packages

# Copy Next.js build from node-base
COPY --from=node-base /app/frontend/.next /app/frontend/.next
COPY --from=node-base /app/frontend/public /app/frontend/public
COPY --from=node-base /app/frontend/node_modules /app/frontend/node_modules
COPY --from=node-base /app/frontend/package*.json /app/frontend/

# Install Node.js in the final stage
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Create directory for Ollama models
RUN mkdir -p /root/.ollama

# Expose ports for FastAPI, Next.js, and Ollama
EXPOSE 3000 8000 11434

# Copy the startup script
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Environment variables for Ollama
ENV OLLAMA_HOST=0.0.0.0
ENV NVIDIA_VISIBLE_DEVICES=all

# Start all services
CMD ["/app/start.sh"]


