# NIRVAN '26 — Troubleshooting & FAQ Guide

Solutions to common questions and edge-case issues during local development and deployment.

---

## 🛠️ Common Development Questions

### 1. Why is Three.js loaded with `next/dynamic`?
**Issue**: WebGL uses browser `window`, `document`, and `WebGLRenderingContext` which do not exist during Next.js Node.js server-side pre-rendering (SSR).  
**Solution**:
```tsx
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false });
```
This ensures the 3D canvas is only initialized after the client DOM mounts, completely eliminating SSR hydration mismatches.

---

### 2. How does the Web Audio API handle browser Autoplay policies?
**Issue**: Modern browsers block audio playback until user interaction (click/touch).  
**Solution**:  
The audio synthesizer in [`lib/audio.ts`](file:///d:/Web-A-Thon-4.0/lib/audio.ts) automatically calls `audioContext.resume()` on the very first user click or hover event, smoothly resuming audio output without throwing console warnings.

---

### 3. Media files not playing or 404 errors
**Issue**: Video or audio files fail to load.  
**Checklist**:
1. Verify media files are placed directly in `public/` (e.g. `public/audio.mpeg`, `public/black_hole.mp4`, `public/hero.mp4`).
2. Verify relative paths in code use `/audio.mpeg` and not `../public/audio.mpeg`.
3. Check MIME types configured on your hosting provider (Vercel automatically configures MP4 and MPEG headers).

---

### 4. Custom Cursor stuck on mobile devices
**Fix**: The custom spring cursor in [`components/CustomCursor.tsx`](file:///d:/Web-A-Thon-4.0/components/CustomCursor.tsx) automatically hides on touch-enabled screens (`@media (pointer: coarse)`) to ensure native mobile gesture performance.
