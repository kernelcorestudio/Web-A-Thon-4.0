# NIRVAN '26 — Feature Specification & Breakdown

This document details every major module, user interaction, and visual component in the NIRVAN '26 Next.js application.

---

## 1. 3D WebGL Holographic Engine
- **File**: [`components/ThreeScene.tsx`](file:///d:/Web-A-Thon-4.0/components/ThreeScene.tsx)
- **Features**:
  - **Quantum Core**: Centered 3D wireframe Icosahedron with glowing cyan nodes and an inner pulsating crystal Octahedron.
  - **Orbital Gimbal Rings**: Dual multi-axis rotating rings with particle point emitters that spin in opposing directions.
  - **Starfield Matrix**: 2,200+ particle stars in 3D perspective space responding dynamically to mouse coordinates.
  - **Parallax Mouse Physics**: Smooth interpolation (lerp) tracking cursor coordinates to rotate the camera and 3D core in real time.
  - **Burst Pulse**: Viewport clicks trigger an energetic scale pulse across the 3D core.

---

## 2. Hero Section & Synchronized Live Countdown
- **Files**: [`components/Hero.tsx`](file:///d:/Web-A-Thon-4.0/components/Hero.tsx), [`components/Countdown.tsx`](file:///d:/Web-A-Thon-4.0/components/Countdown.tsx)
- **Features**:
  - Precision countdown to fest launch (October 24, 2026 at 09:00:00 AM IST).
  - Four independent cyber counters: **Days**, **Hours**, **Minutes**, and **Seconds**.
  - Dynamic zero-padding and micro-tick updates with hover glow states.
  - Text decoder scramble animation for event title ("NIRVAN '26") and fest theme.
  - Quick-action CTA buttons for direct ticket booking and agenda exploration.

---

## 3. About & Vision Section
- **File**: [`components/AboutSection.tsx`](file:///d:/Web-A-Thon-4.0/components/AboutSection.tsx)
- **Features**:
  - Campus lore, vision, and core fest pillars (Innovate, Compete, Connect, Elevate).
  - Highlighting Graphic Era Hill University (GEHU Campus) as the innovation hub.
  - Interactive statistic counters (5000+ Attendees, 50+ Colleges, ₹5L+ Prize Pool, 36H Non-stop Hackathon).

---

## 4. Event Arena & Competition Directory
- **Files**: [`components/EventArena.tsx`](file:///d:/Web-A-Thon-4.0/components/EventArena.tsx), [`components/ContinuousTabs.tsx`](file:///d:/Web-A-Thon-4.0/components/ContinuousTabs.tsx)
- **Features**:
  - Interactive multi-category filter tabs (All, Hackathons, Cybersecurity, Gaming, Workshops, Fun/Hunt).
  - Visual cards with official event posters, prize pool badges, team size requirements, and schedule timestamps.
  - Detailed modal trigger with pre-selected event context.
  - Includes flagship events: **Hackathon**, **Capture The Flag (CTF)**, **Esports Championship**, **Treasure Hunt**, and **Hands-on AI Workshops**.

---

## 5. Dual-Day Interactive Fest Schedule
- **File**: [`components/Schedule.tsx`](file:///d:/Web-A-Thon-4.0/components/Schedule.tsx)
- **Features**:
  - Interactive tab switcher between **Day 01** and **Day 02**.
  - Chronological timeline cards with exact timings, stages/venues, and event status tags (Opening Ceremony, Keynotes, Hacking Rounds, Pitch Finals, Afterparty).

---

## 6. Keynote Speakers & Mentors Showcase
- **File**: [`components/Speakers.tsx`](file:///d:/Web-A-Thon-4.0/components/Speakers.tsx)
- **Features**:
  - Profile cards for tech mentors, keynote presenters, and hackathon judges.
  - Social handles, company badges, and keynote discussion topics.

---

## 7. Fest Photo & Highlights Gallery
- **File**: [`components/EventsGallery.tsx`](file:///d:/Web-A-Thon-4.0/components/EventsGallery.tsx)
- **Features**:
  - High-resolution masonry grid of real fest photos from previous editions.
  - Interactive hover zoom effects with glassmorphic captions.

---

## 8. Holographic Hacker Pass Generator & Ticket Modal
- **File**: [`components/RegisterModal.tsx`](file:///d:/Web-A-Thon-4.0/components/RegisterModal.tsx)
- **Features**:
  - Supports **Solo** and **Team** registration modes with dynamic member input fields.
  - Strict input validation for emails, phone numbers, and college IDs.
  - Interactive Pass Generation displaying a futuristic hacker badge with a custom QR code.
  - Celebratory full-screen confetti explosion via `canvas-confetti`.
  - One-click pass download / print functionality.

---

## 9. Sponsors, Partners & Contact Section
- **Files**: [`components/Sponsors.tsx`](file:///d:/Web-A-Thon-4.0/components/Sponsors.tsx), [`components/ContactSection.tsx`](file:///d:/Web-A-Thon-4.0/components/ContactSection.tsx)
- **Features**:
  - Tiered sponsorship directory (Title, Platinum, Gold, Community Partners).
  - Direct inquiry contact form with real-time feedback and campus location details.

---

## 10. Dual Audio System & Ambient Soundtrack
- **Files**: [`components/AudioPlayer.tsx`](file:///d:/Web-A-Thon-4.0/components/AudioPlayer.tsx), [`lib/audio.ts`](file:///d:/Web-A-Thon-4.0/lib/audio.ts)
- **Features**:
  - Procedural sound synthesis (Web Audio API) for instant button hovers, clicks, and modal opens.
  - Ambient cyberpunk background soundtrack player with persistent mute toggle and animated navbar equalizer.
