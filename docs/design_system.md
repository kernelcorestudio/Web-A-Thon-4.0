# NIRVAN '26 — Design System & UI Specifications

This document outlines the visual design language, color hierarchy, typography rules, glassmorphism tokens, and micro-interaction principles used across NIRVAN '26.

---

## 🎨 1. Color Palette & Tokens

### Primary Brand Accents
| Token Name | Hex Value | Preview / Usage |
| :--- | :--- | :--- |
| `--cyan-primary` | `#00f0ff` | Cyber Cyan (Key action buttons, active borders, primary glow) |
| `--purple-primary` | `#8b5cf6` | Electric Violet (Secondary accents, gradient stops, core rings) |
| `--neon-pink` | `#ec4899` | Neon Magenta (Highlights, prize badges, alert tags) |
| `--neon-green` | `#10b981` | Emerald Matrix (Success states, live status indicators) |
| `--amber-warning`| `#f59e0b` | Warning states, countdown highlights |

### Background & Surface Hierarchy
| Token Name | Hex Value / RGBA | Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#030712` | Deep Void Black (Main canvas backdrop) |
| `--card-bg` | `rgba(15, 23, 42, 0.75)` | Glassmorphic card surface |
| `--card-border` | `rgba(255, 255, 255, 0.08)`| Subtle structural borders |
| `--card-border-glow` | `rgba(0, 240, 255, 0.35)` | Interactive hover glow border |

---

## 🔤 2. Typography Scale

Google Fonts imported via Next.js Font Optimization in [`app/layout.tsx`](file:///d:/Web-A-Thon-4.0/app/layout.tsx):

1. **Heading & Display Font**: `'Orbitron', sans-serif`
   - Used for: Section titles, Fest Title ("NIRVAN '26"), track names, scoreboards.
   - Weights: `700`, `900`
   - Letter Spacing: `0.05em` to `0.15em` uppercase.

2. **Code & Terminal Font**: `'Fira Code', monospace`
   - Used for: Timers, ticket hash codes, badge IDs, metadata labels, CLI outputs.
   - Weights: `400`, `600`

3. **Body & Interface Font**: `'Inter', sans-serif`
   - Used for: Descriptions, paragraphs, form labels, tooltips.
   - Weights: `300`, `400`, `500`, `600`

---

## 💎 3. Glassmorphism & UI Utilities

### Cyber Glass Card Specification
```css
.cyber-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cyber-card:hover {
  border-color: rgba(0, 240, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.15),
              inset 0 0 15px rgba(0, 240, 255, 0.05);
  transform: translateY(-4px);
}
```

### Neon Glow Filters
- **Cyan Glow**: `filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.6))`
- **Purple Glow**: `filter: drop-shadow(0 0 14px rgba(139, 92, 246, 0.5))`
- **Pink Glow**: `filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.6))`

---

## ⚡ 4. Animation & Motion Design

1. **Scramble Text Decoder**: Randomized ASCII characters converting to real text upon viewport entry.
2. **Pulse Nebula**: Slow breathing background radial gradient (`scale(1)` to `scale(1.15)` over 8s).
3. **Retro Space Shuttle Cursor**: Custom pixelated Windows space shuttle cursor (`https://cdn.cursors-4u.net/previews/space-shuttle-dd2c77fb-32.webp`) from [Cursors-4U](https://www.cursors-4u.com/cursor/mec8-11).
4. **Scroll Reveal Transitions**: GPU-accelerated `translateY(0)` and `opacity: 1` triggers with cubic bezier easing.

