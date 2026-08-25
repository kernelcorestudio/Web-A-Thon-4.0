# NIRVAN '26 — Setup & Usage Guide

This guide walks through local installation, environment configuration, testing, and production deployment for NIRVAN '26.

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or later (LTS recommended)
- **npm** (v9+), **yarn**, or **pnpm**
- **Git**

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kernelcorestudio/Web-A-Thon-4.0.git
cd Web-A-Thon-4.0
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at **`http://localhost:3000`** with hot module replacement (HMR).

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server on port 3000 |
| `npm run build` | Compiles and optimizes production build bundle |
| `npm start` | Runs the production Next.js server locally |
| `npm run lint` | Runs ESLint to check for syntax and type issues |

---

## 🚢 Production Deployment

### Deploying to Vercel (Recommended)
1. Push all code to the `main` branch on GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository in [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Click **Deploy**.
