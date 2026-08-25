# NIRVAN '26 — Setup, Development & Usage Guide

## Quick Start (Running with Next.js)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Next.js Development Server
```bash
npm run dev
```
Navigate to:
```
http://localhost:3000
```

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## User Interaction Guide

| Action | Component / Trigger | Description |
| :--- | :--- | :--- |
| **Holographic Hacker Pass** | Click **"REGISTER NOW"** or **"GET PASS"** | Opens attendee form & generates personalized digital pass with celebratory confetti |
| **Campus Drone Video Showcase** | Click **"WATCH TEASER"** / Spotlight Card | Opens embedded `Drone.mp4` video player in Cyber Cinema modal view |
| **Audio SFX Synthesizer** | Click **"SFX OFF / ON"** in Navbar | Enables/mutes native Web Audio procedural synthesizer |
| **Terminal CLI Console** | Type command & press `Enter` | Executes interactive commands (`help`, `tracks`, `gehu`, `prizes`, `register`, `video`, `matrix`, `easteregg`) |
| **3D Parallax Card Tilt** | Hover over track cards or move mouse | Real-time 3D card tilt physics and holographic reflection |
| **3D Core Shockwave Pulse** | Click anywhere on the background canvas | Sends acceleration pulse to the Three.js 3D Quantum Core |
