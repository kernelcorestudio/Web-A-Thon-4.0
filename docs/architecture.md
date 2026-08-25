# NIRVAN '26 — Next.js Architecture & Technical Design

## Architecture Overview

NIRVAN '26 is engineered with **Next.js App Router**, **React**, **TypeScript**, **Three.js WebGL**, and the **Web Audio API**.

```
┌─────────────────────────────────────────────────────────────┐
│                 Next.js App Router (Client)                 │
│                                                             │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │   Next.js Root Layout   │  │   Three.js 3D Canvas     │  │
│  │   (app/layout.tsx)      │  │  (ThreeScene.tsx dynamic)│  │
│  └────────────┬────────────┘  └─────────────┬────────────┘  │
│               │                             │               │
│  ┌────────────▼─────────────────────────────▼────────────┐  │
│  │                Page Component Assembly                │  │
│  │                   (app/page.tsx)                      │  │
│  └────────────┬─────────────────────────────┬────────────┘  │
│               │                             │               │
│  ┌────────────▼────────────┐   ┌────────────▼────────────┐  │
│  │     Web Audio API       │   │  Interactive Components │  │
│  │     (lib/audio.ts)      │   │   (Hero, Terminal, etc.)│  │
│  └─────────────────────────┘   └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### 1. WebGL 3D Pipeline (`components/ThreeScene.tsx`)
- **SSR Safety**: Loaded with `next/dynamic` (`{ ssr: false }`) to ensure client-side WebGL canvas initialization without hydration mismatch.
- **Rendering Loop**: Driven by `requestAnimationFrame` maintaining 60 FPS.
- **Camera & Frustum**: Perspective camera (FOV 60) positioned at Z: 600.
- **Lighting Model**:
  - `AmbientLight` (Hex: `0x0a192f`, Intensity: 1.5) for base environmental illumination.
  - `PointLight` Cyan (Hex: `0x00f0ff`, Intensity: 3.0, Range: 800) simulating neon reflections.
  - `PointLight` Purple (Hex: `0x8b5cf6`, Intensity: 2.5, Range: 800) for edge contrast.
- **Responsive Positioning**: Dynamically offsets the 3D core to `X: +240` on desktop monitors to balance the hero copy, while centering on mobile screens.

### 2. Audio Synthesizer Engine (`lib/audio.ts`)
- **Web Audio Context**: Creates a singleton instance of `AudioContext` connected to a Master `GainNode`.
- **Envelope Modulation**: Uses `exponentialRampToValueAtTime` for realistic sound decay without audio clipping or popping.
- **State Management & Observer**: Exposes subscription callbacks for reactive UI toggles with soundbars, persisting user preferences in `localStorage`.

### 3. Glassmorphic Design System (`app/globals.css`)
- **Tokens**: Centralized CSS Custom Properties for palettes, fonts, and transitions.
- **Layers**:
  - `z-index: 1`: Three.js Canvas container
  - `z-index: 2`: Cyber Grid & Ambient Blur Nebulas
  - `z-index: 3`: Animated Scanline
  - `z-index: 10`: Main interactive UI components
  - `z-index: 100`: Sticky HUD Navbar
  - `z-index: 1000`: Modals (Cinema Video & Hacker Pass)
  - `z-index: 9999`: Custom interactive spring cursor
