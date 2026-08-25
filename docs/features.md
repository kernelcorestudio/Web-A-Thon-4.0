# NIRVAN '26 — Feature Specification & Breakdown

This document provides a comprehensive breakdown of all interactive features implemented across the NIRVAN '26 Hero Application.

---

## 1. 3D WebGL Holographic Engine
- **File**: [`three-scene.js`](file:///d:/Web-A-Thon-4.0/three-scene.js)
- **Features**:
  - **Quantum Core**: Centered 3D wireframe Icosahedron with glowing cyan nodes and an inner pulsating crystal Octahedron.
  - **Orbital Gimbal Rings**: Two multi-axis rotating rings with particle point emitters that spin in opposing directions.
  - **Starfield Matrix**: 2,200+ particle stars distributed in 3D perspective space that respond dynamically to mouse velocity and scroll.
  - **Parallax Mouse Physics**: Smooth interpolation (lerp) tracking cursor coordinates to rotate the camera and 3D core in real time.
  - **Burst Effect**: Clicking anywhere in the viewport triggers an energetic scale pulse across the 3D core.

---

## 2. Live Synchronized Countdown Timer
- **Files**: [`index.html`](file:///d:/Web-A-Thon-4.0/index.html), [`app.js`](file:///d:/Web-A-Thon-4.0/app.js)
- **Features**:
  - Precision countdown to fest launch (October 24, 2026 at 09:00:00 AM IST).
  - Four independent cyber counters: **Days**, **Hours**, **Minutes**, and **Seconds**.
  - Dynamic zero-padding and micro-tick updates with hover glow states.
  - Live status badge indicating active registrations.

---

## 3. Procedural Audio Synthesizer (SFX)
- **File**: [`audio.js`](file:///d:/Web-A-Thon-4.0/audio.js)
- **Features**:
  - 100% procedural audio generation using the browser's native **Web Audio API**.
  - Zero external audio files required — zero download latency.
  - **Hover Chimes**: 800Hz to 1200Hz sine wave sweep on interactive element hovers.
  - **Click Pulses**: 320Hz to 80Hz punchy sub-bass click.
  - **Modal Warp Sweep**: 180Hz to 880Hz sawtooth sweep when opening modals.
  - **Terminal Glitch**: Randomized square-wave bursts for hacker actions.
  - **Celebratory Fanfare**: Arpeggiated C-major chords on pass generation.
  - **HUD Audio Switch**: Visual toggle in navbar with an animated 3-bar equalizer and `localStorage` preference memory.

---

## 4. Campus Video Teaser & Cinema Player
- **Files**: [`index.html`](file:///d:/Web-A-Thon-4.0/index.html), [`app.js`](file:///d:/Web-A-Thon-4.0/app.js), [`bhai_mujhe_yehh_graphic_era_hi_gwr_video_mvp.mp4`](file:///d:/Web-A-Thon-4.0/bhai_mujhe_yehh_graphic_era_hi_gwr_video_mvp.mp4)
- **Features**:
  - Embedded campus highlight video showcasing Graphic Era Hill University (GEHU).
  - Preview card with looping ambient video and glowing play button.
  - Cyber Cinema modal with full playback controls, escape key handler, and auto-pause on close.

---

## 5. Interactive Developer CLI Terminal
- **Files**: [`index.html`](file:///d:/Web-A-Thon-4.0/index.html), [`app.js`](file:///d:/Web-A-Thon-4.0/app.js)
- **Features**:
  - Authentic Linux/macOS styled terminal window with window controls.
  - Built-in command interpreter supporting:
    - `help`: Lists all available commands.
    - `about`: Fest theme, venue, and summary.
    - `tracks`: Comprehensive list of all 6 competition tracks.
    - `gehu`: Campus history, lore, and location.
    - `prizes`: Breakdown of the ₹5,00,000+ prize pool.
    - `register`: Automatically opens the ticket registration modal.
    - `video`: Launches the campus video player.
    - `matrix`: Activates a temporary cyber visual hue flux filter.
    - `easteregg`: Displays secret coder easter egg message.
    - `clear`: Wipes terminal history.

---

## 6. Holographic Hacker Pass Generator & Confetti
- **Files**: [`index.html`](file:///d:/Web-A-Thon-4.0/index.html), [`app.js`](file:///d:/Web-A-Thon-4.0/app.js)
- **Features**:
  - Dynamic registration modal form with name, email, college, track, and role inputs.
  - Instant ticket generation creating a futuristic holographic badge.
  - Generates a unique serial number (e.g., `#NIRVAN26-8891-AI`).
  - Renders custom SVG QR code and attendee details.
  - Multi-color confetti explosion using `canvas-confetti`.
  - One-click "Print / Save Pass" action.

---

## 7. 6 Future-Ready Competition Tracks
1. **AI & Autonomous Agents**: LLM workflows, generative models, autonomous agent networks.
2. **Cyber Security & CTF**: Offensive/defensive hacking, zero-trust architectures, cryptography.
3. **Web 3.0 & Decentralized**: Scalable dApps, smart contracts, ZK-proofs, DeFi.
4. **UI/UX & Creative Tech**: Spatial interfaces, 3D WebGL experiences, design systems.
5. **Robotics & Edge IoT**: Smart hardware, autonomous drones, edge AI sensor systems.
6. **Open Moonshot Innovation**: Wildcard moonshots across fintech, sustainability, and health.
