# 🎓 CampusConnect — Student Event Management & Analytics Platform

A modern, production-ready **Student Event Management & Analytics Platform** designed for colleges and universities. Built with **React.js**, **TypeScript**, **Node.js**, **Express.js**, and **PostgreSQL (Supabase)**.

---

## 🌟 Key Features & Role Capabilities

### 🎓 1. Student Portal
- **Interactive Event Discovery**: Filter events by category (Hackathons, Workshops, Cultural Fests, Seminars) and academic departments.
- **Instant Event Passes & QR Tokens**: Register for campus events and generate digital attendance QR tokens.
- **Participation History & Digital Certificates Vault**: View event completion records, verify authenticity, and preview/download PDF certificates.
- **Live Notifications**: Receive real-time alerts for upcoming events and check-in verifications.

### 📋 2. Faculty Organizer Portal
- **Event Lifecycle Management**: Create, update, publish, or delete campus events with location, capacity, and custom poster URLs.
- **Registration Tracking & Rosters**: Track live student registration counts and export attendance rosters.
- **QR Code & Manual Attendance Check-In**: Scan student QR passes or mark attendance manually in real time.
- **Automated Certificate Generation**: Automatically issue digital completion certificates upon check-in.

### 📈 3. Centralized Admin Dashboard
- **Executive Analytics**: Track total platform users, event completion rates, top active departments, and monthly participation trends.
- **User Role Management**: Manage permissions and assign roles (`student`, `organizer`, `admin`).
- **Department Administration**: Oversee academic departments and organizer event portfolios.

---

## 🎨 Visual Design & Theme Engine

- **High-Contrast Dark & Light Mode**: Seamless toggle between a crisp white interface and a deep obsidian black interface.
- **Animated Splash Screen**: 2-second initial portal loading transition.
- **Modern Glassmorphism & Micro-animations**: Built with custom HSL tokens, subtle backdrop blurs, and responsive grid layouts.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Client** | React 18, TypeScript, Lucide Icons, Custom CSS Design System |
| **Backend REST API** | Node.js, Express.js, TypeScript, JWT Auth, Bcrypt Hashing, Helmet |
| **Database** | PostgreSQL (Normalized Relational Schema on Supabase) |
| **Deployment** | Vercel (Frontend Static & SPA) + Render (Node.js API Web Service) |

---

## 📂 Project Repository Structure

```
student-event-dashboard/
├── client/                     # React + TypeScript Frontend
│   ├── public/                 # Static assets & HTML template
│   ├── src/
│   │   ├── components/         # Reusable UI Components (Navbar, Sidebar, Modals)
│   │   ├── views/              # View Screens (EventBrowser, StudentDashboard, AdminAnalytics, etc.)
│   │   ├── services/           # REST API HTTP Client Service
│   │   ├── App.js              # Main React App Entry & Routing
│   │   └── index.css           # High-Contrast Black & White CSS Design System
│   └── vercel.json             # Vercel SPA Routing Configuration
├── server/                     # Node.js + Express + TypeScript REST API
│   ├── db/                     # Relational Database SQL Schemas & Seeds
│   │   ├── schema.sql          # PostgreSQL normalized tables & indexes
│   │   └── seed.sql            # Initial seed dataset
│   ├── src/
│   │   ├── controllers/        # REST API Controllers (Auth, Events, Registrations, Attendance, etc.)
│   │   ├── middleware/         # JWT Auth, Error Handler, Rate Limiter
│   │   ├── routes/             # Express API Endpoint Routes
│   │   └── index.ts            # Server Entry Point
│   └── tsconfig.json           # TypeScript Server Config
├── vercel.json                 # Monorepo Vercel Deployment Config
├── render.yaml                 # Render Blueprint Deployment Config
└── README.md                   # Project Documentation
```

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Description | Role Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user / student account | Public |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token | Public |
| `GET` | `/api/events` | Fetch all published campus events | Public |
| `POST` | `/api/events` | Create a new campus event | Organizer / Admin |
| `POST` | `/api/registrations` | Register student for an event | Student |
| `POST` | `/api/attendance/mark` | Mark student attendance (QR / Manual) | Organizer |
| `GET` | `/api/certificates/my` | Fetch authenticated student certificates | Student |
| `GET` | `/api/analytics` | Fetch platform executive analytics | Admin |
| `GET` | `/api/users` | List all registered users | Admin |

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **PostgreSQL** instance (or Supabase connection string)

### 2. Install Dependencies
```bash
# Clone the repository
git clone https://github.com/manikantavarma2889/student-event-dashboard.git
cd student-event-dashboard

# Install Client Dependencies
cd client
npm install --legacy-peer-deps

# Install Server Dependencies
cd ../server
npm install
```

### 3. Run Development Servers
```bash
# Start Backend Express REST API (Runs on http://localhost:5000)
cd server
npm run dev

# Start Frontend React App (Runs on http://localhost:3000)
cd client
npm start
```

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel
1. Import repository `student-event-dashboard` into **Vercel**.
2. Set **Root Directory** to `client`.
3. Set Environment Variable:
   - `REACT_APP_API_URL` = `https://<your-render-backend-url>/api`
4. Click **Deploy**.

### Deploying Backend API to Render
1. Create a **New Web Service** on **Render.com**.
2. Connect your GitHub repository `student-event-dashboard`.
3. Set **Root Directory** to `server`.
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `npm start`
6. Add Environment Variables (`NODE_ENV`, `PORT`, `JWT_SECRET`, `DATABASE_URL`).

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
