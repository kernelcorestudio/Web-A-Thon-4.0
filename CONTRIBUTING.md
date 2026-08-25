# Contributing to NIRVAN '26

Thank you for your interest in contributing to **NIRVAN '26**! This document outlines our code standards, branching conventions, component guidelines, and pull request workflows.

---

## 🛠️ Development Workflow

### 1. Branching Strategy
- `main`: Production-ready code (automatically deployed on Vercel).
- `feat/<feature-name>`: New components or feature additions.
- `fix/<bug-name>`: Bug fixes and performance patches.
- `docs/<doc-name>`: Documentation additions and updates.

```bash
git checkout -b feat/new-cyber-module
```

### 2. Local Setup
```bash
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🎨 Coding & Component Guidelines

1. **Next.js App Router & TypeScript**:
   - Every interactive client-side component must include `'use client';` at the very top.
   - Use strict TypeScript interfaces for all props and state objects.
2. **Design System Consistency**:
   - Always use defined CSS custom properties from [`app/globals.css`](app/globals.css) (`--cyan-core`, `--purple-core`, `--neon-pink`, etc.).
   - Follow the glassmorphic card design pattern (`backdrop-filter: blur(...)`).
3. **Performance Standards**:
   - Any heavy 3D canvas or WebGL components must use dynamic imports with `{ ssr: false }`.
   - Keep images optimized and placed in `public/` or `components/assests/`.
4. **Clean Commits**:
   - Format: `<type>: <short description>`
   - Examples: `feat: add live CTF leaderboard widget`, `fix: mobile touch scroll bug on gallery`

---

## 📬 Submitting a Pull Request (PR)

1. Ensure code builds without TypeScript or Next.js errors:
   ```bash
   npm run build
   ```
2. Push your feature branch:
   ```bash
   git push origin feat/new-cyber-module
   ```
3. Open a Pull Request against `main` on GitHub with a clear description and screenshots of your changes.
