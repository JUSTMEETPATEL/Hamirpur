Brief Description

An intelligent platform leveraging Artificial Intelligence to promote environmental sustainability through responsible e-waste management, starting with smartphones. Users upload images of their damaged or old devices, which the AI analyzes to identify visible damage and generates diagnostic questions. Based on user responses and visual analysis, the AI classifies the device into three categories: Recycle, Reuse, or Reduce. The classification feeds into an admin dashboard for review, ensuring a trustworthy human-in-the-loop system.

Features
  
Image Upload Interface: Users can easily upload images of their electronic devices for analysis.  
AI-Based Image Analysis: Utilize computer vision to analyze images for visible damage, such as cracks or missing components.  
Dynamic Question Generation: Generate tailored diagnostic questions based on initial image analysis to gain deeper insights into the device's condition.  
Intelligent Categorization: Classify devices into Recycle, Reuse, or Reduce categories using AI insights.  
Admin Dashboard: Allow admins to review classifications, validate AI decisions, and initiate follow-up actions like scheduling pickups or repairs.  
User Feedback System: Enable users to provide feedback on the classification process and their experience, enhancing future analyses.

User Flow  

Users navigate to the landing page and create an account or log in.  
Users access the image upload interface and submit images of their electronic devices.  
The AI analyzes the images and produces initial findings.  
Users receive dynamic diagnostic questions based on the findings.  
Users answer the questions to provide deeper insights into the device's condition.  
The AI classifies the device into Recycle, Reuse, or Reduce.  
The classification is sent to the admin dashboard for review.  
Admins validate the classification or override the decision as necessary and take further actions to facilitate recycle, reuse, or repair.

Technical Stack  

Frontend: Next.js 15.1.7 for a responsive user experience.  
Backend: Next.js 15.1.7 at port 3000 for server logic and Nodal center, and PostgreSQL for database management. FastAPI server for model connection at port 8000 with Next.js 15.1.7 server using socket.
AI/ML Framework: Ollama model Llava 7B parameters  
Admin Panel: Built with Next.js 15.1.7 for managing device classifications and user interactions.



Design Guidelines  

Styling Guidelines: Utilize a green-centric color palette to reflect sustainability, with accessible typography for easy reading.  
Page Layout: Maintain a simple layout with a clear path from image upload to classification results, ensuring intuitive navigation.  
Navigation Structure: Implement a sidebar for quick access to different sections (upload, dashboard, user feedback) and a top bar for account management.

Backend Structure  

Database Architecture: Design a schema for user accounts, uploaded device images, AI analysis results, and admin reviews.  
API Endpoints:  
POST /api/auth[...all]: For authentications.
GET  /api/auth[...all]: For authentications.
POST /api/save-waste-classification: For submitting user responses and saving classifications.  


Security Measures: Implement BetterAuth(Open Source Library) for user authentication and HTTPS for secure data transmission.

In-Scope and Out-of-Scope: 

ItemsIn-Scope:  

Core features as listed above, including image upload, AI analysis, and categorization.

Out-of-Scope:  

Advanced features like sustainability scoring, impact metrics, and user rewards initially.  
Direct integration with external recycling service databases or hardware repair systems.


