#  Cortex-AI : Microservices-Based AI Agent Platform

Cortex-AI is a full-stack, highly scalable AI platform built using a robust Microservices architecture. It provides users with elite AI agents capable of generating high-quality images, PDFs, and Presentations through intelligent prompts.

 **Live Demo:**  https://cortex-ai-topaz.vercel.app

##  Key Features
* **AI Image Generation:** Elite vision agent powered by Pollinations.ai for 8K cinematic image generation.
* **Smart Document AI:** Automated PDF and PPT generation using LangGraph.
* **Microservices Architecture:** Independently scalable backend services communicating via an API Gateway.
* **Secure Authentication:** Handled seamlessly via Firebase Auth.
* **Integrated Payments:** Razorpay integration for premium AI credits and billing management.
* **Cloud & Edge Ready:** Designed for modern cloud deployments with Docker support.

##  Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Redux Toolkit
* **Backend:** Node.js, Express.js
* **Architecture:** API Gateway Pattern, Microservices
* **AI & LLM:** LangGraph, Pollinations.ai, Custom Prompt Engineering
* **Database & Cache:** MongoDB Atlas, Redis (Upstash)
* **Authentication:** Firebase Auth
* **Payment Gateway:** Razorpay
* **DevOps/Deployment:** Docker, GitHub Actions (CI/CD), Vercel (Frontend), Render (Backend)

##  Project Structure
The repository is organized into a scalable monorepo format:

* `frontend/`: Contains the React/Vite user interface, components, and Redux state management.
* `backend/gateway/`: The central entry point that routes all incoming client requests to the appropriate microservice.
* `backend/services/agent/`: The core AI brain handling LLM invocations, agents (Vision, PDF, PPT, Chat), and file generation.
* `backend/services/auth/`: Manages user sessions, profiles, and Firebase validation.
* `backend/services/billing/`: Manages user credits, plans, and Razorpay webhooks.
* `backend/services/chat/`: Maintains conversation state, message history, and DB operations.
* `backend/shared/`: Shared utilities like Redis caching configurations across services.
* `.github/workflows/`: CI/CD pipelines for automated deployment.

##  Local Setup & Installation

**1. Clone the repository:**
\`\`\`bash
git clone https://github.com/jb-28-sde/Cortex-Ai.git
cd Cortex-Ai
\`\`\`

**2. Frontend Setup:**
\`\`\`bash
cd frontend
npm install
# Create a .env file and add your Firebase, Razorpay, and Gateway API keys (prefixed with VITE_)
npm run dev
\`\`\`

**3. Backend Setup (Microservices):**
You will need to install dependencies and start each service individually, or use Docker.
\`\`\`bash
# Example for starting the Gateway
cd backend/gateway
npm install
# Add .env variables
npm start

# Repeat for backend/services/auth, agent, billing, and chat.
\`\`\`

**4. Docker (Optional):**
The project includes `Dockerfile` and `docker-compose.yml` configurations for containerized deployment[cite: 1].
\`\`\`bash
cd backend
docker-compose up --build
\`\`\`

##  Architecture Flow
1. User interacts with the **React** frontend.
2. API calls are sent to the **API Gateway**.
3. The Gateway validates requests via the **Auth Service**.
4. Feature requests are routed to the **Agent Service** (for AI generation) or **Chat Service** (for history).
5. The **Billing Service** ensures the user has sufficient credits before executing heavy AI tasks.

---
*Built by Jaibhim Bangrey*
