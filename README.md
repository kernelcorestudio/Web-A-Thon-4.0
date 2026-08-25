# NIRVAN '26 — Annual College Technical Fest

> **"Where Ideas Become Innovations"**  
> Flagship Technical Fest at **Graphic Era Hill University (GEHU Campus)**  
> Audience: Developers, Designers, Innovators, Students | Theme: Innovations, Technology, Competition, Community

---

## ⚡ Quick Links & Documentation

- 📋 **[Implementation Plan](plan/implementation_plan.md)** — Architectural plan & Next.js migration specifications
- 🗺️ **[Project Roadmap](plan/roadmap.md)** — Milestones, Next.js App Router upgrade, and future roadmap
- ✨ **[Features Guide](docs/features.md)** — Detailed breakdown of all interactive Next.js components
- 🏗️ **[Architecture](docs/architecture.md)** — System architecture, Three.js WebGL pipeline, and Web Audio engine
- 🚀 **[Setup & Usage Guide](docs/setup_and_usage.md)** — How to run, build, test, and interact with the application

---

## 🌟 Core Highlights

- **Next.js App Router & React 18/19 Architecture**: High-performance modular component structure with TypeScript and dynamic client-side rendering.
- **3D Holographic WebGL Engine**: Three.js interactive 3D Quantum Core, orbital gimbal rings, and 2,200+ particle constellation with mouse physics.
- **Campus Drone Showcase Video**: Embedded GEHU campus aerial video (`Drone.mp4`) in an interactive Cyber Cinema modal and preview spotlight.
- **Synchronized Live Countdown Timer**: Dynamic countdown (Days, Hours, Minutes, Seconds) with micro-ticks and live status.
- **Procedural Sound Synthesizer**: Native Web Audio API audio engine with sci-fi hover tones, warp sweeps, and celebratory chords.
- **Interactive Developer Terminal**: Embedded CLI command terminal supporting `help`, `about`, `tracks`, `gehu`, `prizes`, `register`, `video`, `matrix`, `easteregg`.
- **Holographic Hacker Pass Generator**: Instant personalized attendee pass generation with custom QR codes and celebratory confetti.
- **6 Competition Tracks**: AI & Autonomous Agents, Cyber Security & CTF, Web 3.0 & Decentralized, UI/UX & Creative Tech, Robotics & Edge IoT, and Open Moonshot.

---

## 💻 Running Locally (Next.js)

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production (optional)
npm run build
npm start
```
Open **`http://localhost:3000`** in your browser.

---

## 📂 Repository Structure

```
Web-A-Thon-4.0/
├── app/
│   ├── globals.css          # Cyberpunk glassmorphic design system
│   ├── layout.tsx           # Root layout, Google Fonts, and SEO metadata
│   └── page.tsx             # Main page assembling all components
├── components/
│   ├── CampusSpotlight.tsx  # GEHU Drone.mp4 video preview card
│   ├── CustomCursor.tsx     # Spring-interpolated interactive cursor
│   ├── Footer.tsx           # Cyberpunk footer & navigation links
│   ├── Hero.tsx             # Scramble title, countdown timer & HUD panel
│   ├── HighlightsMarquee.tsx# Key fest statistics & prize highlights
│   ├── Navbar.tsx           # Cyber HUD header & audio equalizer toggle
│   ├── RegisterModal.tsx    # Hacker pass generator & canvas-confetti
│   ├── Terminal.tsx         # Interactive CLI developer console
│   ├── ThreeScene.tsx       # Three.js 3D WebGL hologram engine
│   ├── Tracks.tsx           # 6 competition track cards with 3D tilt
│   └── VideoModal.tsx       # Cyber cinema video player for Drone.mp4
├── lib/
│   └── audio.ts             # Web Audio API procedural sound synthesizer
├── public/
│   └── Drone.mp4            # Official GEHU campus drone video
├── docs/                    # Detailed technical documentation
│   ├── architecture.md
│   ├── features.md
│   └── setup_and_usage.md
├── plan/                    # Project roadmaps and migration plans
│   ├── implementation_plan.md
│   └── roadmap.md
├── package.json             # Next.js & project dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js build config
└── README.md                # Project overview and instructions
```
