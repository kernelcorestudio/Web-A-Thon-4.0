# NIRVAN '26 — Annual College Technical Fest

> **"Where Ideas Become Innovations"**  
> Flagship Technical Fest at **Graphic Era Hill University (GEHU Campus)**  
> Audience: Developers, Designers, Innovators, Students | Theme: Innovations, Technology, Competition, Community

---

## ⚡ Quick Links & Documentation

- 📋 **[Implementation Plan](plan/implementation_plan.md)** — Architectural plan & technical specifications
- 🗺️ **[Project Roadmap](plan/roadmap.md)** — Milestones and future roadmap
- ✨ **[Features Guide](docs/features.md)** — Detailed breakdown of all interactive features
- 🏗️ **[Architecture](docs/architecture.md)** — System architecture, WebGL pipeline, and audio engine design
- 🚀 **[Setup & Usage Guide](docs/setup_and_usage.md)** — How to run, test, and interact with the application

---

## 🌟 Core Highlights

- **3D Holographic WebGL Engine**: Three.js interactive 3D Quantum Core, orbital gimbal rings, and 2,200+ particle constellation with mouse physics.
- **Synchronized Live Countdown Timer**: Dynamic countdown (Days, Hours, Minutes, Seconds) with micro-ticks and live status.
- **Procedural Sound Synthesizer**: Native Web Audio API audio engine with sci-fi hover tones, warp sweeps, and celebratory chords.
- **Campus Video Showcase**: Embedded GEHU campus video in an interactive Cyber Cinema modal.
- **Interactive Developer Terminal**: Embedded CLI command terminal supporting `help`, `about`, `tracks`, `gehu`, `prizes`, `register`, `matrix`, `easteregg`.
- **Holographic Hacker Pass Generator**: Instant personalized attendee pass generation with custom QR codes and celebratory confetti.
- **6 Competition Tracks**: AI & Autonomous Agents, Cyber Security & CTF, Web 3.0 & Decentralized, UI/UX & Creative Tech, Robotics & Edge IoT, and Open Moonshot.

---

## 💻 Running Locally

```bash
# Clone the repository
git clone https://github.com/Ankushra69/Web-A-Thon-4.0.git

# Navigate to project directory
cd Web-A-Thon-4.0

# Start local server
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

---

## 📂 Repository Structure

```
Web-A-Thon-4.0/
├── index.html           # Main UI layout & meta tags
├── style.css            # Cyberpunk glassmorphic CSS design system
├── three-scene.js       # Three.js 3D WebGL hologram engine
├── audio.js             # Web Audio API sound synthesizer
├── app.js               # Application logic & interactive controllers
├── bhai_mujhe_yehh_graphic_era_hi_gwr_video_mvp.mp4 # Campus video
├── plan/                # Project planning & roadmap
│   ├── implementation_plan.md
│   └── roadmap.md
├── docs/                # Documentation & feature guides
│   ├── architecture.md
│   ├── features.md
│   └── setup_and_usage.md
└── README.md            # Repository overview & navigation
```
