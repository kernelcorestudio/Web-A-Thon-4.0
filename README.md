# NIRVAN '26 — Flagship Annual College Technical Fest

> **"Where Ideas Become Innovations"**  
> Flagship Technical Fest at **Graphic Era Hill University (GEHU Campus)**  
> **Audience**: Developers, Designers, Innovators, Competitors, Students | **Theme**: Innovation, Cyberpunk Tech, Community, Competition  

---

## 🎥 Campus Drone Video Showcase (GEHU)

<p align="center">
  <video src="public/Drone.mp4" width="100%" max-width="850px" controls autoplay loop muted playsinline>
    <a href="public/Drone.mp4">🎬 Watch Official GEHU Campus Drone Video</a>
  </video>
</p>

---

## ⚡ Quick Links & Documentation Directory

### 📖 Master Documentation
- 📘 **[Master Project Documentation](docs/PROJECT_DOCUMENTATION.md)** — **Consolidated all-in-one guide covering A to Z of NIRVAN '26**

> [!TIP]
> 📁 **Central Media & Raw Assets Repository**: All project multimedia assets, high-definition videos, audio soundtracks, official branding, competition posters, and event photographs are organized within the **[`components/assests/`](file:///d:/Web-A-Thon-4.0/components/assests/)** and **[`public/`](file:///d:/Web-A-Thon-4.0/public/)** directories:
> - 🎥 **Videos**: `components/assests/hero.mp4`, `components/assests/black_hole.mp4`, `public/Drone.mp4`
> - 🎵 **Audio**: `components/assests/audio.mpeg`, `public/audio.mpeg`
> - 🖼️ **Posters & Tracks**: `components/assests/events/poster/` (Hackathon, CTF, Esports, Treasure Hunt, Workshop)
> - 📸 **Event Gallery**: `components/assests/events/` (13 High-Resolution Event Photographs)
> - 🌌 **3D Graphics & Branding**: `public/3D.png`, `components/assests/logo.png`, `components/assests/form_bg.jpeg`



### 📋 Plans & Roadmaps
- 📋 **[Implementation Plan](plan/implementation_plan.md)** — Architectural plan & Next.js system specifications
- 🗺️ **[Project Roadmap](plan/roadmap.md)** — Milestones, completed phases & future backend enhancements
- ✅ **[Release Checklist](plan/release_checklist.md)** — Quality assurance, performance & launch checklist

### 📚 Technical Documentation
- ✨ **[Features Guide](docs/features.md)** — Complete breakdown of all interactive components & modules
- 🏗️ **[Architecture](docs/architecture.md)** — System architecture, 3D WebGL pipeline, audio engine & CSS layer design
- 🎨 **[Design System](docs/design_system.md)** — Color hierarchy, typography scale, glassmorphism tokens & neon glow rules
- 🛰️ **[API & Integrations](docs/api_and_integration.md)** — Registration schema, database tables & email/webhook pipeline
- 🛠️ **[Troubleshooting & FAQ](docs/troubleshooting_and_faq.md)** — Common questions, WebGL SSR fixes & audio policies
- 🚀 **[Setup & Usage Guide](docs/setup_and_usage.md)** — Local development, production build & Vercel deployment

---

## 🌟 Core Highlights & Features

- ⚛️ **Next.js 14+ App Router & TypeScript**: High-performance modular architecture with clean component boundaries, strict typing, and SEO metadata.
- 🌌 **3D Holographic WebGL Engine**: Interactive Three.js 3D Quantum Core, orbital gimbal rings, and 2,200+ particle constellation reacting to mouse physics and scroll.
- 🎠 **Pure CSS-Only Infinite Scrolling Carousels**: Seamless infinite marquees with **Pause-on-Hover** for both the **Event Arena** (Posters) and **Fest Gallery** (13 Photos in Dual Rows).
- 🎬 **Video Separators & Ambient Cinematic Hero**: Integrated high-definition cinematic background and black hole particle video separators (`black_hole.mp4`, `hero.mp4`).
- ⏱️ **Synchronized Live Countdown & Text Decoder**: Precision countdown timer (Days, Hours, Minutes, Seconds) with micro-ticks and dynamic hacker scramble text animations.
- 🎪 **Event Arena & Interactive Modals**: Comprehensive competition directory featuring Hackathon, CTF (Capture The Flag), Esports, Treasure Hunt, and Workshops with event posters, rules, team sizes, and prize pools.
- 🎫 **Holographic Hacker Pass Generator**: Dynamic modal supporting Team & Solo registrations, validation, unique badge ID generation, and multi-color celebratory confetti (`canvas-confetti`).
- 📅 **Dual-Day Interactive Schedule**: Day 1 & Day 2 timelines with chronological event stages and category tags.
- 🎤 **Keynote Speakers & Mentors Grid**: Spotlight showcase for industry leaders, technical judges, and keynote presenters.
- 📸 **Live Photo & Events Gallery**: Dynamic high-resolution event photo grid showcasing past fest highlights.
- 🎵 **Dual Audio Architecture**: Procedural Web Audio API sound synthesizer (hover chimes, warp sweeps, clicks) + ambient background soundtrack player (`audio.mpeg`) with equalizer controls.
- 🚀 **Retro Space Shuttle Custom Cursor**: Integrated pixelated sci-fi [Space Shuttle Cursor](https://www.cursors-4u.com/cursor/mec8-11) across the entire application interface for an authentic retro-futuristic desktop vibe.
- 🤝 **Sponsors Showcase & Contact Portal**: Tiered partner directory (Alpha, Beta, Community) and interactive direct inquiry form with campus coordinates.
- ✨ **Scroll-Driven Micro-Interactions**: Custom physics-interpolated spring cursor and smooth directional scroll reveals (`ScrollReveal.tsx`).

---

## 🚀 Custom Space Shuttle Cursor

Launch your browsing experience into orbit with our custom pixelated **Space Shuttle Cursor**:

> **"Launch your desktop into orbit with this pixelated Space Shuttle cursor for Windows. This retro craft features a white body and orange tip for a cool tech vibe."**  
> Source: [Space Shuttle Cursor \| Cursors-4U](https://www.cursors-4u.com/cursor/mec8-11)

```css
/* Space Shuttle - https://www.cursors-4u.com/cursor/mec8-11 */
* {
  cursor: url('https://cdn.cursors-4u.net/previews/space-shuttle-dd2c77fb-32.webp') 32 32, auto !important;
}
/* End www.Cursors-4U.com Code */
```


## 💻 Quick Start & Running Locally

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm**

```bash
# 1. Clone the repository
git clone https://github.com/kernelcorestudio/Web-A-Thon-4.0.git
cd Web-A-Thon-4.0

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build & Deploy

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📂 Repository Structure

```
Web-A-Thon-4.0/
├── app/
│   ├── globals.css          # Glassmorphic cyberpunk tokens, animations & UI styles
│   ├── layout.tsx           # Root layout, Google Fonts (Inter, Orbitron, Fira Code), SEO tags
│   └── page.tsx             # Master page assembling all interactive sections
├── components/
│   ├── AboutSection.tsx     # Lore, core pillars, stats counters & fest vision
│   ├── AudioPlayer.tsx      # Ambient cyber soundtrack player & equalizer
│   ├── ContactSection.tsx   # Interactive inquiry form & campus location
│   ├── Countdown.tsx        # High-precision synchronized countdown timer
│   ├── CustomCursor.tsx     # Spring-interpolated interactive cyber cursor
│   ├── EventArena.tsx       # CSS-only Infinite Carousel of event posters & rules modal
│   ├── EventsGallery.tsx    # Dual-row CSS-only Infinite Carousel with lightbox
│   ├── Footer.tsx           # Cyberpunk footer, social links & copyright
│   ├── Hero.tsx             # Scramble title, HUD stats & quick registration
│   ├── Navbar.tsx           # Sticky HUD navigation, audio equalizer & quick action
│   ├── RegisterModal.tsx    # Team/Solo registration form & Hacker Pass generator
│   ├── Schedule.tsx         # Day 1 & Day 2 chronological agenda breakdown
│   ├── ScrollReveal.tsx     # Directional IntersectionObserver scroll transitions
│   ├── Speakers.tsx         # Industry mentors, judges & speaker showcase
│   ├── Sponsors.tsx         # Partner & sponsor tier cards
│   ├── ThreeScene.tsx       # Dynamic Three.js WebGL 3D Quantum Core
│   └── VideoSeparator.tsx   # Cinematic video separator with overlay
├── lib/
│   └── audio.ts             # Web Audio API procedural SFX synthesizer
├── public/
│   ├── audio.mpeg           # Ambient background audio track
│   ├── black_hole.mp4       # Cinematic black hole video
│   ├── hero.mp4             # High-definition hero backdrop video
│   ├── form_bg.jpeg         # Modal glassmorphism backdrop
│   ├── events/              # High-resolution fest gallery photographs
│   └── posters/             # Official competition track posters (Hackathon, CTF, etc.)
├── docs/                    # Complete technical documentation suite
│   ├── PROJECT_DOCUMENTATION.md # Master consolidated documentation
│   ├── architecture.md      # System architecture & WebGL pipeline
│   ├── features.md          # Feature specifications & breakdown
│   ├── design_system.md     # Color palette, typography, glassmorphism tokens
│   ├── api_and_integration.md # Registration schema, database tables & API
│   ├── troubleshooting_and_faq.md # SSR, audio & runtime FAQ
│   └── setup_and_usage.md   # Local development & production setup
├── plan/                    # Project roadmaps and verification
│   ├── implementation_plan.md # Architectural plan & Next.js system specifications
│   ├── roadmap.md           # Completed milestones & future phases
│   └── release_checklist.md # Production launch QA checklist
├── package.json             # Project dependencies & scripts
├── tsconfig.json            # Strict TypeScript configuration
└── README.md                # Project documentation & overview
```

---

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D WebGL**: [Three.js](https://threejs.org/)
- **Audio**: Web Audio API + HTML5 Audio
- **Effects & UI**: Canvas Confetti, Lucide React Icons, Pure CSS3 Glassmorphism
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🌌 3D Holographic Quantum Core Preview

<p align="center">
  <img src="public/3D.png" alt="3D Holographic Quantum Core Preview" width="460" style="max-width: 90%; border-radius: 14px; border: 1px solid rgba(0, 240, 255, 0.3); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.2);" />
</p>


