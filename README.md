# AI Cold Email Generator (Monorepo)

A fully dockerized full-stack MERN application that uses AI to generate personalized **Cold Emails**, **LinkedIn DMs**, and **Follow-up Emails** using the Groq LLM API. The application includes JWT authentication, MongoDB for persistent storage, Redis for caching AI responses, Docker support, and CI/CD with GitHub Actions.

---

# 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🤖 AI-powered Cold Email Generation using Groq LLM
- 💼 Generates:
  - Cold Email
  - LinkedIn DM
  - Follow-up Email
- 📜 Email History stored in MongoDB
- ⚡ Redis Caching for repeated prompts
- 🐳 Docker & Docker Compose support
- 📦 Monorepo architecture
- 🔄 GitHub Actions CI/CD pipeline
- ☁️ Ready for deployment on Render + Vercel

---

# 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Redis
- JWT Authentication
- Groq API

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- Render
- Vercel

---

# 📂 Project Structure

```
AI-COLD-MAIL-GENERATOR-MONOREPO/
│
├── client/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🚀 Run Locally (Without Docker)

## 1. Install Dependencies

```bash
npm run install:all
```

---

## 2. Backend Environment Variables

Create `server/.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

REDIS_URL=redis://localhost:6379
```

---

## 3. Frontend Environment Variables

Create `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Start MongoDB & Redis

If using Docker only for infrastructure:

```bash
docker compose up -d mongo redis
```

---

## 5. Run Frontend & Backend

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 🐳 Run Using Docker

The application is fully containerized.

## Services

- React Frontend
- Express Backend
- MongoDB
- Redis

Start all services

```bash
docker compose up --build
```

Run in background

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

# ⚡ Redis Caching

The application caches AI-generated responses using Redis.

Cache Key Format

```
email:<userId>:<normalizedPrompt>
```

Example

```
email:6a535a7b286b87bb24ce8310:backend engineer at microsoft
```

When the same authenticated user submits the same prompt again:

- No Groq API request is made.
- Response is served directly from Redis.
- Cache TTL: **1 hour (3600 seconds)**.

Example server log

```text
Cache hit for key: email:6a535a7b286b87bb24ce8310:backend engineer at microsoft
```

---

# 🔄 CI/CD

GitHub Actions automatically:

- Installs dependencies
- Builds the React application
- Verifies project integrity on every push and Pull Request

Workflow

```
.github/workflows/pipeline.yml
```

---

# 🚀 Deployment

## Backend (Render)

Create a **Web Service**

Settings

```
Root Directory: server

Build Command:
npm install

Start Command:
node server.js
```

### Environment Variables

```
MONGODB_URI=...

JWT_SECRET=...

GROQ_API_KEY=...

REDIS_URL=<Your Redis Connection URL>
```

> **Important:** If using Redis in production, create a Redis (Key Value) service (e.g., Render Key Value or another hosted Redis provider) and use the connection URL it provides. `redis://redis:6379` only works inside Docker Compose.

---

## Frontend (Vercel)

Root Directory

```
client
```

Environment Variable

```
VITE_API_URL=https://your-render-backend.onrender.com/api
```

After deployment, update the backend CORS configuration to allow your Vercel domain.

---

# 📸 Application Flow

```
User
   │
   ▼
React Frontend
   │
   ▼
Express Backend
   │
   ▼
Redis Cache
   │
   ├── Cache Hit
   │      │
   │      ▼
   │  Return Response
   │
   └── Cache Miss
          │
          ▼
      Groq API
          │
          ▼
     Store in Redis
          │
          ▼
      MongoDB History
          │
          ▼
      Return Response
```

---

# 👨‍💻 Author

**Vansh Parashar**

Computer Science Engineer | MERN Stack Developer

GitHub: https://github.com/VANSH-73-WEB