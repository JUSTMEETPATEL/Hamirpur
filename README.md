# ♻️ AI-Driven E-Waste Management Platform

An intelligent, AI-powered platform that promotes **environmental sustainability** through responsible **e-waste management**, starting with smartphones.

This system empowers users to upload images of their damaged or old electronic devices. The AI then analyzes these images to detect visible damage and dynamically generates diagnostic questions. Based on combined visual and user-input data, the device is categorized into one of three classifications: **Recycle**, **Reuse**, or **Reduce**. Final classification is reviewed by admins, ensuring a **human-in-the-loop system** for trust and accuracy.

---

## 🧠 Key Features

### 📷 Image Upload Interface
- Upload images of smartphones or electronic devices.
- Supports `.jpg`, `.jpeg`, `.png`.

### 🧠 AI-Based Image Analysis
- Uses `Ollama Llava 7B` for vision-based damage detection.
- Identifies cracks, component loss, screen issues, etc.

### 🧾 Dynamic Question Generation
- Tailored diagnostic questions based on visual damage.
- Captures user-reported issues for better classification.

### 📦 Intelligent Categorization
- Categories:
  - ♻️ **Recycle** – Severely damaged, extract usable parts.
  - 🔄 **Reuse** – Repairable, can be put back into use.
  - 📉 **Reduce** – Working, minimize unnecessary replacement.

### 🛠️ Admin Dashboard
- Built in **Next.js**.
- Admins can:
  - View submissions.
  - Validate or override AI classifications.
  - Flag items for repair or collection.

### 💬 Feedback System
- Optional user feedback after each classification.

---

## 🔄 User Flow

1. Users register or log in.
2. Upload an image of the electronic device.
3. AI analyzes image and returns observations.
4. Diagnostic questions are asked dynamically.
5. AI classifies the device.
6. Admin reviews classification and triggers any action.

---

## 🧱 Tech Stack

| Layer         | Technology                                     |
|---------------|------------------------------------------------|
| **Frontend**  | `Next.js 15.1.7`, `Tailwind CSS`               |
| **Backend**   | `Next.js` (API routes), `PostgreSQL`, `Socket` |
| **Model API** | `FastAPI` (Python) with `Llava 7B` on `Ollama` |
| **Authentication** | `BetterAuth` (Open Source)                  |
| **Deployment**| **Self-hosted VPS (Linux)**                    |

---

## 🛠️ Backend Structure

### 🗃️ Database Schema
- `users`: credentials, roles
- `uploads`: image metadata
- `analysis`: AI-generated observations
- `classification`: Recycle / Reuse / Reduce
- `admin_reviews`: overrides and logs

### 🔌 API Endpoints

| Method | Endpoint                            | Description                     |
|--------|-------------------------------------|---------------------------------|
| `POST` | `/api/auth[...all]`                 | Handles login, signup, logout   |
| `GET`  | `/api/auth[...all]`                 | Returns session/auth info       |
| `POST` | `/api/save-waste-classification`    | Saves classification data       |

---

## 🔐 Security Measures

- ✅ **BetterAuth** for user authentication and role protection.
- ✅ End-to-end **HTTPS** over Nginx or Caddy with SSL.
- ✅ Admin reviews to audit all AI decisions.

---

## 🎨 UI/UX Design

- **Palette**: Eco-friendly greens and off-whites.
- **Font**: Clean, accessible, sans-serif.
- **Layout**:
  - Sidebar navigation (Upload, Dashboard, Feedback)
  - Topbar for profile & logout
- **Mobile-First**: Fully responsive interface

---

## ⚙️ VPS Deployment (Linux)

### Prerequisites

- **Node.js** (v20+)
- **Python** (3.11+)
- **PostgreSQL** (v15+)
- **Ollama** with `llava` model installed
- **Nginx or Caddy** for reverse proxy
- **PM2** for managing Node/Next.js
- **Uvicorn** for FastAPI

### Architecture Diagram

```mermaid
flowchart TD
    subgraph "User Layer"
        Client["Client Browser"]:::user
    end

    subgraph "Infrastructure"
        Proxy["Reverse Proxy (Nginx/Caddy)"]:::infra
        Orchestration["Container Orchestration (Docker Compose)"]:::infra
    end

    subgraph "Frontend Service"
        subgraph "UI Layer"
            UI["Next.js Frontend UI"]:::user
        end
        subgraph "API Layer"
            API["Next.js API Layer"]:::service
        end
        subgraph "Auth Provider"
            Auth["BetterAuth (Auth Pages & Libs)"]:::auth
        end
        subgraph "Prisma ORM & Schema"
            Prisma["Prisma ORM & PostgreSQL Schema"]:::db
        end
    end

    subgraph "AI Service"
        FastAPI["FastAPI Model Service"]:::service
        Modules["Model Inference Modules"]:::service
        Ollama["Ollama Model Runtime"]:::service
    end

    subgraph "Database"
        Postgres["PostgreSQL Database"]:::db
    end

    Client -->|"HTTPS:443"| Proxy
    Proxy -->|"Route Traffic"| UI
    UI -->|"HTTP:3000 → API"| API
    API -->|"ORM Calls"| Prisma
    Prisma -->|"TCP:5432"| Postgres
    UI -->|"Socket /ws"| FastAPI
    API -->|"Socket /ws"| FastAPI
    FastAPI -->|"Invokes Modules"| Modules
    FastAPI -->|"Performs Inference"| Ollama
    FastAPI -->|"Returns JSON"| UI
    UI -->|"User Input + AI Response"| API
    API -->|"Save Classification"| Prisma
    UI -->|"Admin Read/Write"| Prisma

    Orchestration --> Proxy
    Orchestration --> UI
    Orchestration --> FastAPI
    Orchestration --> Ollama
    Orchestration --> Postgres

    click UI "https://github.com/iie-projects/nithamirpur/tree/main/frontend/src/app"
    click API "https://github.com/iie-projects/nithamirpur/tree/main/frontend/src/app/api"
    click Prisma "https://github.com/iie-projects/nithamirpur/blob/main/frontend/prisma/schema.prisma"
    click Auth "https://github.com/iie-projects/nithamirpur/tree/main/frontend/src/app/(auth)"
    click FastAPI "https://github.com/iie-projects/nithamirpur/blob/main/backend/app.py"
    click Modules "https://github.com/iie-projects/nithamirpur/blob/main/backend/capture_image.py"
    click Ollama "https://github.com/iie-projects/nithamirpur/blob/main/Dockerfile.ollama"
    click Orchestration "https://github.com/iie-projects/nithamirpur/blob/main/docker-compose.yml"

    classDef user fill:#D6EAF8,stroke:#3498DB,color:#154360
    classDef service fill:#FAD7A0,stroke:#D35400,color:#78281F
    classDef db fill:#ABEBC6,stroke:#27AE60,color:#145A32
    classDef infra fill:#D5D8DC,stroke:#566573,color:#1C2833
    classDef auth fill:#E8DAEF,stroke:#8E44AD,color:#4A235A

```

### 🧪 Local Dev Setup

```bash
# Clone the repo
git clone https://github.com/<your-username>/e-waste-ai-platform.git
cd e-waste-ai-platform

# Install dependencies for frontend/backend
bun install

# Run Next.js frontend/backend (port 3000)
bun dev
```

### ⚙️ Model Server Setup (FastAPI)

```bash
cd fastapi-server/

# Set up Python virtual environment
python -m venv venv
source venv/bin/activate

# Install required libraries
pip install -r requirements.txt

# Run FastAPI on port 8000
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 🔀 Reverse Proxy Setup (Nginx)

Example `/etc/nginx/sites-available/e-waste-ai`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ai {
        proxy_pass http://localhost:8000;
    }
}
```

### 🛡️ TLS (SSL)
Use [Let's Encrypt](https://letsencrypt.org/) or [ZeroSSL](https://zerossl.com/) with Certbot or Caddy for HTTPS.

---

## 🚧 In-Scope vs Out-of-Scope

### ✅ In Scope
- Image upload
- AI classification
- Admin review panel
- Feedback loop

### ❌ Out of Scope (Initial Phase)
- Impact scoring
- Sustainability dashboards
- Reward system
- Integration with e-waste orgs

---

## 🤝 Contributing

1. Fork this repository.
2. Create your feature branch: `git checkout -b feat/your-feature-name`.
3. Commit your changes: `git commit -m 'feat: add xyz feature'`.
4. Push to the branch: `git push origin feat/your-feature-name`.
5. Open a Pull Request.

---

## 🔮 Future Roadmap

- 🏆 User reward system for sustainable behavior
- 📊 Visualization of sustainability impact
- 🌐 Integration with verified recyclers
- 🌍 Multilingual UI support
- 🚀 Model optimization with ONNX/TensorRT for edge devices
