# NIRVAN '26 — System Architecture & Technical Design

## 1. System Architecture Overview

NIRVAN '26 is built on **Next.js App Router** with **React**, **TypeScript**, **Three.js WebGL**, and the **Web Audio API**. It leverages client-side rendering where dynamic canvas, audio, and animations are active, alongside optimized static assets for media.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Next.js App Router (Client)                        │
│                                                                             │
│  ┌─────────────────────────┐         ┌───────────────────────────────────┐  │
│  │   Root Layout           │         │   Dynamic Three.js WebGL Canvas   │  │
│  │   (app/layout.tsx)      │         │   (components/ThreeScene.tsx)     │  │
│  └────────────┬────────────┘         └─────────────────┬─────────────────┘  │
│               │                                        │                    │
│  ┌────────────▼────────────────────────────────────────▼──────────────────┐  │
│  │                      Master Page Assembly                              │  │
│  │                      (app/page.tsx)                                    │  │
│  └──────┬──────────────────┬──────────────────┬────────────────────┬──────┘  │
│         │                  │                  │                    │         │
│  ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐      ┌──────▼──────┐  │
│  │ Hero & HUD  │    │ Event Arena │    │ Schedule &  │      │ Gallery &   │  │
│  │ Countdown   │    │ & Posters   │    │ Speakers    │      │ Sponsors    │  │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘      └──────┬──────┘  │
│         │                  │                  │                    │         │
│  ┌──────▼──────────────────▼──────────────────▼────────────────────▼──────┐  │
│  │  Global Audio Synthesizer (lib/audio.ts) + AudioPlayer (audio.mpeg)    │  │
│  ├────────────────────────────────────────────────────────────────────────┤  │
│  │  Interactive Modals (RegisterModal.tsx with Confetti & Ticket Gen)     │  │
│  ├────────────────────────────────────────────────────────────────────────┤  │
│  │  Scroll Engine (ScrollReveal.tsx) + Custom Physics Spring Cursor       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Subsystems

### 2.1 3D WebGL Holographic Engine (`components/ThreeScene.tsx`)
- **SSR Isolation**: Dynamically loaded via `next/dynamic(() => import(...), { ssr: false })` preventing server-side window/canvas errors.
- **Rendering Pipeline**: Custom `requestAnimationFrame` loop rendering at a consistent 60 FPS.
- **Scene Geometry**:
  - **Outer Core**: High-definition wireframe Icosahedron with cyan vertex points.
  - **Inner Crystal**: Rotating faceted Octahedron with neon magenta reflection.
  - **Orbital Gimbal Rings**: Dual orthogonal tori with rotating particle rings.
  - **Particle Constellation**: 2,200+ particle stars with mouse velocity damping and dynamic depth parallax.
- **Performance Guard**: Clamps device pixel ratio (`Math.min(window.devicePixelRatio, 2)`) to preserve GPU battery on mobile and laptops.

### 2.2 Dual Audio Architecture
1. **Procedural Sound FX (`lib/audio.ts`)**:
   - Built on native browser `AudioContext`.
   - Generates pure mathematical synthesizer soundwaves (sine, square, sawtooth) with exponential gain envelope decays.
   - Zero HTTP requests or audio loading delay for hover chimes, click pulses, and modal opening swooshes.
2. **Ambient Soundtrack Player (`components/AudioPlayer.tsx`)**:
   - Manages HTML5 audio streaming for the fest background cyberpunk soundtrack (`public/audio.mpeg`).
   - Global mute/unmute state with synced equalizer bars in the navigation bar.

### 2.3 Event Arena & Registration Engine (`components/EventArena.tsx`, `components/RegisterModal.tsx`)
- **Interactive Event Discovery**: Categorized tabs for Hackathon, CTF, Esports, Treasure Hunt, and Technical Workshops.
- **Team & Solo Registration**: Validates member details, team names, leader email, and tracks.
- **Holographic Ticket Generator**: Computes a unique alphanumeric participant hash `#NIRVAN26-XXXX-XXX`, creates an attendee badge, and triggers multi-color confetti showers (`canvas-confetti`).

### 2.4 Motion & Scroll Reveal Pipeline (`components/ScrollReveal.tsx`)
- Utilizes the `IntersectionObserver` API to lazily trigger directional entrance animations (`up`, `down`, `left`, `right`, `fade`).
- Zero performance overhead compared to heavy external animation libraries.

---

## 3. Glassmorphic Styling & CSS Architecture (`app/globals.css`)

- **Design System Tokens**:
  - `--bg-primary`: `#030712` (Void Black)
  - `--cyan-primary`: `#00f0ff` (Cyber Cyan)
  - `--purple-primary`: `#8b5cf6` (Electric Purple)
  - `--neon-pink`: `#ec4899` (Neon Magenta)
  - `--font-cyber`: `'Orbitron', sans-serif`
  - `--font-code`: `'Fira Code', monospace`
- **Layer Stacking Model**:
  - `z-index: 1`: Three.js Canvas container
  - `z-index: 2`: Ambient nebula gradients and cyber grid background
  - `z-index: 3`: Horizontal CRT scanlines
  - `z-index: 10`: Main content sections & cards
  - `z-index: 100`: Sticky HUD Navigation bar
  - `z-index: 1000`: Interactive Ticket Registration Modal
  - `z-index: 9999`: Spring-interpolated custom cursor
