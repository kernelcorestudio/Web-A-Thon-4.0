# NIRVAN '26 — Architecture & Technical Design

## Architecture Overview

NIRVAN '26 is engineered as a high-performance, single-page interactive web application utilizing modern WebGL, Web Audio API, and modular vanilla JavaScript.

```
┌────────────────────────────────────────────────────────┐
│                      Client Layer                      │
│                                                        │
│  ┌─────────────────┐ ┌──────────────────────────────┐  │
│  │   DOM / HTML    │ │    Three.js WebGL Canvas     │  │
│  │  (index.html)   │ │      (three-scene.js)        │  │
│  └────────┬────────┘ └──────────────┬───────────────┘  │
│           │                         │                  │
│  ┌────────▼─────────────────────────▼───────────────┐  │
│  │             Application Controller               │  │
│  │                   (app.js)                       │  │
│  └────────┬─────────────────────────┬───────────────┘  │
│           │                         │                  │
│  ┌────────▼────────┐       ┌────────▼───────────────┐  │
│  │  Web Audio API  │       │  Canvas Confetti / UI  │  │
│  │   (audio.js)    │       │     (Lucide Icons)     │  │
│  └─────────────────┘       └────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### 1. WebGL Scene Pipeline (`three-scene.js`)
- **Rendering Loop**: Driven by `requestAnimationFrame` maintaining 60 FPS.
- **Camera & Frustum**: Perspective camera (FOV 60) positioned at Z: 600.
- **Lighting Model**:
  - `AmbientLight` (Hex: `0x0a192f`, Intensity: 1.5) for base environmental illumination.
  - `PointLight` Cyan (Hex: `0x00f0ff`, Intensity: 3.0, Range: 800) simulating neon reflections.
  - `PointLight` Purple (Hex: `0x8b5cf6`, Intensity: 2.5, Range: 800) for edge contrast.
- **Coordinate Space Positioning**: Responsive logic dynamically repositions the 3D core to `X: +240` on desktop monitors to achieve visual balance alongside the left-aligned hero copy, while centering on mobile screens.

### 2. Audio Synthesizer Pipeline (`audio.js`)
- **Web Audio Context**: Creates an instance of `AudioContext` connected to a Master `GainNode`.
- **Envelope Modulation**: Uses `exponentialRampToValueAtTime` for realistic sound decay without audio clipping or popping.
- **State Management**: Persists mute/unmute status in browser `localStorage`.

### 3. Glassmorphic CSS Design System (`style.css`)
- **Tokens**: Centralized CSS Custom Properties for palettes, fonts, and transitions.
- **Layers**:
  - `z-index: 1`: Three.js Canvas container
  - `z-index: 2`: Cyber Grid & Ambient Blur Nebulas
  - `z-index: 3`: Animated Scanline
  - `z-index: 10`: Main interactive UI components
  - `z-index: 100`: Sticky HUD Navbar
  - `z-index: 1000`: Modals and Drawers
  - `z-index: 9999`: Custom interactive cursor dot & ring
