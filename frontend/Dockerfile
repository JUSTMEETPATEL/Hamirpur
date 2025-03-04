FROM node:21-alpine

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY frontend/ .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
