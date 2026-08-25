# NIRVAN '26 — Implementation Plan & Architecture Specification

## Project Overview
- **Event Name**: NIRVAN '26
- **Tagline**: *"Where Ideas Become Innovations"*
- **Type**: Annual College Technical Fest
- **Venue**: Graphic Era Hill University (GEHU Campus), Dehradun
- **Target Audience**: Student Developers, UI/UX Designers, Tech Creators, Innovators
- **Theme**: Innovations, Technology, Competition, Community

---

## System Architecture & Module Breakdown

### 1. 3D WebGL Engine (`three-scene.js`)
- **Technology**: Three.js (WebGL)
- **Visual Centerpiece**: Holographic 3D Quantum Core composed of:
  - Wireframe Icosahedron outer shell with emissive cyan edges
  - Inner pulsating faceted Octahedron crystal
  - Dual orthogonal orbital gimbal rings with emissive particle vertices
  - Interactive Starfield (2,200+ particles) with mouse velocity damping and reactive inertia
  - Ambient floating 3D tetrahedral space dust with independent rotational physics
- **Performance Optimization**: Dynamic DPR scaling (`Math.min(devicePixelRatio, 2)`), frustum culling, and 60 FPS requestAnimationFrame loop.

### 2. Live Countdown & Scramble Decoder Engine (`app.js`)
- **Countdown Module**: Calculates real-time time delta to October 24, 2026 09:00:00 AM IST with zero lag and micro-ticks.
- **Hologram Scrambler**: Procedural character permutation algorithm with randomized frame iterations for glitch reveals.

### 3. Procedural Audio Synthesizer (`audio.js`)
- **Technology**: HTML5 Web Audio API
- **Zero Asset Latency**: Procedurally generates sound waves (sine, square, sawtooth, triangle oscillators) with gain envelopes and LFO frequency modulation:
  - Hover Tone (High sine sweep 800Hz → 1200Hz)
  - Click Pulse (320Hz → 80Hz punchy sub click)
  - Modal Warp Sweep (Sawtooth 180Hz → 880Hz)
  - Terminal Glitch (Square wave randomized dual-burst)
  - Pass Celebratory Chords (C5, E5, G5, C6 arpeggiated synth)

### 4. Interactive Fest Terminal CLI (`app.js`)
- **Command Shell**:
  - `help`, `about`, `tracks`, `gehu`, `prizes`, `register`, `video`, `matrix`, `easteregg`, `clear`

### 5. Instant Holographic Hacker Pass Generator (`app.js`)
- Dynamic DOM badge generation with randomized unique hash ID (e.g. `#NIRVAN26-XXXX-XXX`), SVG QR Code matrix, custom attendee details, and celebratory confetti shower using Canvas-Confetti.

---

## Directory Structure
```
Web-A-Thon-4.0/
├── index.html           # Main UI structure & meta tags
├── style.css            # Cyberpunk glassmorphic CSS system
├── three-scene.js       # Three.js 3D WebGL hologram engine
├── audio.js             # Web Audio API sound synthesizer
├── app.js               # Application logic & interactive controllers
├── bhai_mujhe_yehh_graphic_era_hi_gwr_video_mvp.mp4 # Campus video
├── plan/                # Project plans and roadmap
│   ├── implementation_plan.md
│   └── roadmap.md
├── docs/                # Technical documentation & feature breakdowns
│   ├── architecture.md
│   ├── features.md
│   └── setup_and_usage.md
└── README.md            # Repository overview & navigation
```
