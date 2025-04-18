# ♻️ AI-Driven E-Waste Management Platform

An intelligent, AI-powered platform that promotes **environmental sustainability** through responsible **e-waste management**, starting with smartphones.

This system empowers users to upload images of their damaged or old electronic devices. The AI then analyzes these images to detect visible damage and dynamically generates diagnostic questions. Based on combined visual and user-input data, the device is categorized into one of three classifications: **Recycle**, **Reuse**, or **Reduce**. Final classification is reviewed by admins, ensuring a **human-in-the-loop system** for trust and accuracy.

---

## 🧠 Key Features

### 📷 Image Upload Interface
- Allows users to upload images of electronic devices, primarily smartphones.
- Supported formats: `.jpg`, `.jpeg`, `.png`.

### 🧠 AI-Based Image Analysis
- Utilizes `Ollama Llava 7B` model for **computer vision**-based damage analysis.
- Detects screen cracks, missing components, and visible wear.

### 🧾 Dynamic Question Generation
- Tailored diagnostic questions based on image insights.
- Helps enrich AI decisions with user-reported symptoms.

### 📦 Intelligent Categorization
- AI classifies devices into:
  - ♻️ **Recycle** – Not usable, to be broken down.
  - 🔄 **Reuse** – Can be repaired and reused.
  - 📉 **Reduce** – Functionally fine, but users are encouraged to keep using the device.

### 🛠️ Admin Dashboard
- Built using **Next.js**, it allows:
  - Admin review of classifications.
  - Option to override AI decisions.
  - Trigger repair or pickup workflows (to be added).

### 💬 Feedback System
- Users provide feedback post-classification to improve AI accuracy and user experience.

---

## 🔄 User Flow

1. Users sign up/login.
2. Upload a smartphone image via the upload interface.
3. AI analyzes the image and provides initial findings.
4. User answers follow-up diagnostic questions.
5. AI classifies the device into Recycle, Reuse, or Reduce.
6. Admin reviews and confirms or overrides classification.
7. Action is taken (pickup, repair, or user encouragement to retain).

---

## 🧱 Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| **Frontend**| `Next.js 15.1.7`, `Tailwind CSS`          |
| **Backend** | `Next.js 15.1.7`, `PostgreSQL`, `Socket`  |
| **Model API** | `FastAPI` at port `8000` connected to `Next.js` server |
| **AI Model**| `Ollama Llava` 7B parameter version        |
| **Auth**    | `BetterAuth` (Open Source Library)         |
| **Hosting** | Self-hosted or cloud (e.g. Vercel + EC2 combo) |

---

## 🛠️ Backend Structure

### 🗃️ Database Schema
- **Users**: Auth data and activity log.
- **Images**: Path, upload metadata.
- **AnalysisResults**: AI response data.
- **Classification**: Final output (Recycle, Reuse, Reduce).
- **AdminReviews**: Overrides and follow-up actions.

### 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth[...all]` | User authentication |
| `GET`  | `/api/auth[...all]` | Auth check |
| `POST` | `/api/save-waste-classification` | Save analysis and user responses |

---

## 🔒 Security

- ✅ **BetterAuth** ensures secure login and role-based access (user/admin).
- ✅ All data is transferred over **HTTPS**.
- ✅ AI decisions are **audited** by human admins.

---

## 🎨 UI/UX Guidelines

- **Color Scheme**: Green-based palette reflecting sustainability.
- **Typography**: Clear, accessible fonts.
- **Layout**:
  - **Sidebar**: Navigation for upload, dashboard, and feedback.
  - **Topbar**: Profile & account settings.
  - **Responsiveness**: Mobile-first design principles.

---

## 🧪 Local Development Setup

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL 15+
- Python 3.11+
- Ollama setup with Llava 7B

### Setup Instructions


```
# Clone repo
git clone https://github.com/<your-username>/e-waste-ai-platform.git
cd e-waste-ai-platform

# Install Next.js dependencies
bun install

# Start frontend (port 3000)
bun dev

# Navigate to FastAPI server folder
cd fastapi-server/

# Create virtual env and install dependencies
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start FastAPI server (port 8000)
uvicorn main:app --reload
```


🚧 In-Scope vs Out-of-Scope
✅ In Scope
Image upload and AI classification.

Admin review workflow.

User feedback loop.

❌ Out of Scope (for now)
Sustainability scoring.

Impact metric visualizations.

Reward/incentive systems.

Integration with government/recycler APIs.

🤝 Contributing
Fork the repository.

Create a new branch: git checkout -b feature/feature-name.

Commit your changes.

Push and create a PR.

Follow code style and test your features.

🧠 Future Enhancements
Add reward points and gamification.

Introduce sustainability impact charts.

Integrate with verified recycling partners (e.g. NGOs, e-waste recyclers).

Add multilingual support.

Optimize AI model for edge deployments (using ONNX or TensorRT).

📄 License
This project is licensed under the MIT License – feel free to use, modify, and build upon it.
