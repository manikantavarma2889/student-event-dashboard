<div align="center">

# 🎓 CampusConnect — Student Event Management & Analytics Platform

### Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=recharts&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECFBB)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

<br/>

A modern, production-ready **Student Event Management & Analytics Platform** designed for colleges and universities. Built with **React.js**, **TypeScript**, **Node.js**, **Express.js**, and **PostgreSQL (Supabase)**, with **TanStack Query** for server-state management, **Recharts** for analytics visualization, and **Playwright** for end-to-end browser testing.

</div>

---

## 🌟 Key Features & Role Capabilities

### 🎓 1. Student Portal
- **Interactive Event Discovery**: Filter events by category and academic department.
- **Instant Event Passes & QR Tokens**: Register for campus events and generate digital attendance QR tokens.
- **Participation History & Digital Certificates Vault**: View event completion records, verify authenticity, and preview/download PDF certificates.
- **Live Notifications**: Receive alerts for upcoming events and check-in verification.

### 📋 2. Faculty Organizer Portal
- **Event Lifecycle Management**: Create, update, publish, or delete campus events with location, capacity, and poster URLs.
- **Registration Tracking & Rosters**: Track student registration counts and attendance rosters.
- **QR Code & Manual Attendance Check-In**: Scan student QR passes or mark attendance manually.
- **Automated Certificate Generation**: Issue digital completion certificates after check-in.

### 📈 3. Centralized Admin Dashboard
- **Executive Analytics**: Track platform users, event completion rates, departments, and participation trends.
- **Interactive Data Visualizations**: Present monthly registration/attendance trends and department participation using Recharts.
- **Server-State Data Fetching**: Use TanStack Query to retrieve analytics data with caching, controlled refetching, and retry behavior.
- **User Role Management**: Manage permissions and assign `student`, `organizer`, and `admin` roles.
- **Department Administration**: Oversee academic departments and organizer event portfolios.

---

## ♿ Accessibility Engineering

CampusConnect includes accessibility-focused frontend engineering aligned with **WCAG 2.2 principles** and common **WAI-ARIA** practices.

### Accessibility Features

- Semantic navigation landmarks and page structure
- Keyboard-operable sidebar navigation using native buttons
- Skip-to-main-content navigation
- Visible `:focus-visible` indicators
- Accessible names for icon-only controls
- `aria-current` and `aria-pressed` for navigation and state
- Event dialogs using `role="dialog"` and `aria-modal`
- Escape-to-close dialog behavior and initial dialog focus
- Descriptive alternative text for event imagery
- Semantic event-detail descriptions
- Live status messaging for registration state
- Reduced-motion support with `prefers-reduced-motion`
- Forced-colors/high-contrast support
- Responsive layouts designed for zoom and reflow
- Theme controls with descriptive accessible states

Accessibility documentation and verification scenarios are available in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

---

## 🎨 Visual Design & Theme Engine

- **High-Contrast Dark & Light Mode**: Seamless toggle between light and dark interfaces.
- **Responsive Design System**: Responsive layouts for desktop and smaller screens.
- **Modern UI**: Glassmorphism, custom design tokens, subtle transitions, and responsive grid layouts.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Client** | React 18, TypeScript, React Router, Lucide Icons, Custom CSS Design System |
| **Server State & API Data** | TanStack Query, REST API client |
| **Data Visualization** | Recharts (Bar and Pie charts with responsive layouts and tooltips) |
| **Frontend Testing** | Playwright (Chromium end-to-end tests) |
| **Backend REST API** | Node.js, Express.js, TypeScript, JWT Auth, Bcrypt Hashing, Helmet |
| **Database** | PostgreSQL (Normalized Relational Schema on Supabase) |
| **Deployment** | Vercel (Frontend SPA) + Render (Node.js API Web Service) |

---

## 🧪 Frontend Testing

The frontend includes a Playwright end-to-end testing setup for validating important user-facing flows in a real browser environment.

### Playwright Configuration

- Chromium browser project
- Local frontend base URL: `http://127.0.0.1:3000`
- Automatic frontend startup through the Playwright web server configuration
- CI-friendly retries and worker settings
- HTML test reports
- Trace and screenshot capture for failed tests

Run the end-to-end tests from the `client` directory:

```bash
npm run e2e
```

For the interactive Playwright UI:

```bash
npm run e2e:ui
```

---

## 📂 Project Repository Structure

```text
student-event-dashboard/
├── client/                     # React + TypeScript Frontend
│   ├── public/                 # Static assets & HTML template
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   ├── views/              # Event, Student, Organizer & Admin views
│   │   ├── services/           # REST API HTTP Client Service
│   │   ├── queryClient.ts      # Shared TanStack Query configuration
│   │   ├── App.js              # Main React application
│   │   ├── index.js            # Application entry point + QueryClientProvider
│   │   ├── index.css           # Main design system
│   │   └── accessibility.css   # Accessibility styles and interaction support
│   ├── e2e/
│   │   └── campusconnect.spec.ts # Playwright end-to-end tests
│   ├── playwright.config.ts    # Playwright test configuration
│   └── vercel.json              # Vercel SPA Routing Configuration
├── server/                     # Node.js + Express + TypeScript REST API
│   ├── db/                     # Relational Database SQL Schemas & Seeds
│   ├── src/
│   │   ├── controllers/        # REST API Controllers
│   │   ├── middleware/         # JWT Auth, Error Handler, Rate Limiter
│   │   ├── routes/             # Express API Endpoint Routes
│   │   └── index.ts            # Server Entry Point
│   └── tsconfig.json
├── ACCESSIBILITY.md            # Accessibility engineering documentation
├── vercel.json
├── render.yaml
└── README.md
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
git clone https://github.com/manikantavarma2889/student-event-dashboard.git
cd student-event-dashboard

cd client
npm install --legacy-peer-deps

cd ../server
npm install
```

### 3. Run Development Servers

```bash
# Backend API — http://localhost:5000
cd server
npm run dev

# Frontend — http://localhost:3000
cd client
npm start
```

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel

1. Import `student-event-dashboard` into Vercel.
2. Set **Root Directory** to `client`.
3. Set `REACT_APP_API_URL` to your deployed backend API URL.
4. Deploy the frontend.

### Deploying Backend API to Render

1. Create a new Web Service on Render.
2. Connect the GitHub repository.
3. Set **Root Directory** to `server`.
4. Set **Build Command** to `npm install && npm run build`.
5. Set **Start Command** to `npm start`.
6. Configure `NODE_ENV`, `PORT`, `JWT_SECRET`, and `DATABASE_URL` environment variables.

The project uses **Vercel + Render** for deployment; GitHub Pages is not part of the deployment setup.

---

## 📋 Accessibility Verification

The repository includes an accessibility verification checklist covering:

- Keyboard navigation
- Dialog keyboard interaction
- Screen-reader/accessibility-tree review
- Form validation
- Registration status announcements
- Browser zoom and reflow
- High-contrast/forced-colors behavior
- Reduced-motion behavior

See [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) for the detailed verification scenarios and test values.

---

## 📄 License

This project is developed as a portfolio and academic software engineering project.
