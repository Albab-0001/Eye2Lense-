# Eye2Lense (i2lense)

A full-stack web platform for **photography and videography** services: browse professionals, view profiles and portfolios, contact vendors, apply as a vendor, and manage accounts with **email/password (JWT)** or **Google (Firebase)** authentication.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [API overview](#api-overview)
- [Authentication](#authentication)
- [Firebase setup](#firebase-setup)
- [MongoDB](#mongodb)
- [Production build](#production-build)
- [Contributing](#contributing)
- [License](#license)

---

## Tech stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React 19, Vite 7, React Router 7, Framer Motion, Axios |
| **Backend** | Node.js, Express 4, Mongoose, JWT (HTTP-only cookies), express-validator |
| **Database** | MongoDB (Atlas or local) |
| **Auth (social)** | Firebase (Google sign-in, Firestore user docs) |
| **Email** | Nodemailer (contact and related flows) |

---

## Features

- **Home, About, Contact** — marketing and contact pages  
- **Services** — photography / videography listings with category routing  
- **Vendor profiles** — detail pages with About, Portfolio, Reviews, Contact tabs  
- **Vendor application** — “Apply as a vendor” flow  
- **User auth** — sign up / sign in with email + password (API + JWT cookie) and Google (Firebase)  
- **Protected areas** — profile (`/profile`), admin panel (`/admin/*`), debug tools for admins  
- **Responsive UI** — custom CSS, icons (react-icons)  
- **Offline / network awareness** — basic client-side indicators  

---

## Project structure

```
├── public/                 # Static assets
├── server/                 # Express API
│   ├── controllers/        # Route handlers (auth, contact, …)
│   ├── middleware/       # auth, errors
│   ├── routes/             # API route definitions
│   ├── services/           # e.g. email
│   └── server.js           # App entry, CORS, mounts `/api/*`
├── src/
│   ├── components/         # Navbar, Footer, forms, …
│   ├── contexts/           # AuthContext (JWT + Firebase)
│   ├── pages/              # Route-level pages
│   ├── services/           # Axios API client (`api.js`)
│   ├── firebase/           # Firebase config & Firestore init
│   ├── models/             # Mongoose User schema (used by server)
│   ├── config/             # DB connection helper
│   ├── styles/             # Page/component CSS
│   ├── App.jsx             # Routes & layout
│   └── main.jsx            # React entry
├── vite.config.js          # Vite + dev proxy `/api` → backend
├── package.json
├── FIREBASE_SETUP.md       # Detailed Firebase steps
└── README.md               # This file
```

---

## Prerequisites

- **Node.js** 18+ (recommended; Vite 7 and React 19 align with current LTS)
- **npm** (comes with Node)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI
- **Firebase project** (optional but required for Google sign-in and Firestore features used in the app)

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/<your-org>/Eye2Lense.git
cd Eye2Lense
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a **`.env`** file in the project root (see [Environment variables](#environment-variables)).  
If you maintain a **`.env.example`**, copy it:

```bash
cp .env.example .env
```

### 4. Run MongoDB

Ensure `MONGO_URI` in `.env` points to a running MongoDB instance (local or Atlas).

### 5. Start development

**Option A — frontend + backend together**

```bash
npm start
```

**Option B — two terminals**

```bash
# Terminal 1 — API (default http://localhost:5001)
npm run server:dev

# Terminal 2 — Vite dev server (port from terminal output, often 5173 or 5174)
npm run dev
```

- **Frontend:** Vite prints the URL (e.g. `http://localhost:5173` or `http://localhost:5174`).  
- **Backend:** `http://localhost:5001` by default (`PORT` in `.env` overrides).  
- **Vite proxy:** Requests to `/api` from the dev server are proxied to `http://localhost:5001` (see `vite.config.js`).

---

## Environment variables

Create **`.env`** in the repository root. Typical variables:

### Backend / shared (Node reads these for `server/`)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string (default dev: `mongodb://localhost:27017/i2lense`) |
| `PORT` | API port (default **5001**) |
| `JWT_SECRET` | Secret for signing JWTs (**set a strong value in production**) |
| `JWT_COOKIE_EXPIRE` | Cookie lifetime in days (optional) |
| `NODE_ENV` | `development` or `production` (affects cookie `secure` flag, etc.) |

Optional for **contact / email** (see `server/services/emailService.js`):

| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | SMTP / Gmail address used to send mail |
| `EMAIL_APP_PASSWORD` | App password or SMTP secret (never commit real values) |
| `CONTACT_EMAIL` | Inbox that receives contact form submissions |

### Frontend (Vite — must be prefixed with `VITE_`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for Axios (default in code: `http://localhost:5001/api`). Use full URL including `/api` if not using the Vite proxy. |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Optional (Analytics) |

> **Security:** Never commit real `.env` files or secrets to Git. Add `.env` to `.gitignore` and use GitHub Actions secrets or your host’s env UI in production.

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server only |
| `npm run build` | Production build of the frontend (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run server` | Start Express API (no auto-reload) |
| `npm run server:dev` | Start API with nodemon |
| `npm start` | Run API + Vite concurrently (`concurrently`) |

---

## API overview

Base path: **`/api`** (mounted in `server/server.js`).

| Area | Prefix | Notes |
|------|--------|--------|
| Auth | `/api/auth` | Register, login, logout, `me`, profile update, password reset, refresh token |
| Contact | `/api/contact` | Contact form / email-related endpoints |

Health check (root of API server, not under `/api` in current setup):

- `GET http://localhost:5001/` → JSON status message

---

## Authentication

1. **Email / password**  
   - Register and login go to **`POST /api/auth/register`** and **`POST /api/auth/login`**.  
   - On success, JWT is issued and stored in an **HTTP-only cookie** (`credentials: true` in Axios).  
   - **`GET /api/auth/me`** returns the current user when the cookie is valid.

2. **Google**  
   - Handled in the browser via **Firebase Auth** (`signInWithPopup`).  
   - User profile data can be synced to **Firestore** (see `AuthContext` and `firebase/`).

The React **`AuthProvider`** (`src/contexts/AuthContext.jsx`) coordinates JWT session checks and Firebase auth state.

---

## Firebase setup

Step-by-step Firebase console setup (Auth, Firestore, Storage) is documented in **`FIREBASE_SETUP.md`**.

Summary:

1. Create a Firebase project and web app.  
2. Enable **Google** (and Email/Password if you use Firebase email features).  
3. Add all `VITE_FIREBASE_*` variables to `.env`.  
4. Add your dev site origin (e.g. `http://localhost:5173`) under **Authentication → Settings → Authorized domains**.

---

## MongoDB

- Connection is configured in **`src/config/db.js`** using `process.env.MONGO_URI`.  
- The **User** model lives in **`src/models/User.js`** (roles: `user`, `vendor`, `admin`).  
- For Atlas: create a cluster, database user, allow network access, then paste the SRV connection string into `MONGO_URI`.

---

## Production build

```bash
npm run build
```

Serve the contents of **`dist/`** with any static host or behind a reverse proxy, and run the **Express** API separately with `NODE_ENV=production`, proper `MONGO_URI`, `JWT_SECRET`, and CORS origins adjusted for your real frontend domain (the dev server currently allows `http://localhost:*` for convenience).

---

## Contributing

1. Fork the repository  
2. Create a branch: `git checkout -b feature/your-feature`  
3. Commit with clear messages  
4. Push and open a **Pull Request**

---

## License

This project is licensed under the **MIT License** (see repository license file if present; otherwise add a `LICENSE` file to match your legal preference).

---

## Acknowledgments

- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Express](https://expressjs.com/).  
- Auth and realtime data patterns powered by [Firebase](https://firebase.google.com/) where applicable.
