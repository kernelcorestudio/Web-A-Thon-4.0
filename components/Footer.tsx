'use client';

import React from 'react';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>NIRVAN &apos;26</h4>
            <p>Annual College Technical Fest • Graphic Era Hill University (GEHU Campus)</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--cyan-core)', marginTop: 6 }}>
              Theme: Innovations • Technology • Competition • Community
            </p>
          </div>

          <ul className="footer-links">
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
            </li>
            <li>
              <a href="#tracks" onClick={(e) => handleNavClick(e, '#tracks')}>Tracks</a>
            </li>
            <li>
              <a href="#highlights" onClick={(e) => handleNavClick(e, '#highlights')}>Highlights</a>
            </li>
            <li>
              <a href="#campus-video" onClick={(e) => handleNavClick(e, '#campus-video')}>Campus Video</a>
            </li>
            <li>
              <a href="#terminal" onClick={(e) => handleNavClick(e, '#terminal')}>Terminal</a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NIRVAN Technical Fest • Graphic Era Hill University (GEHU). Where Ideas Become Innovations.</p>
        </div>
      </div>
    </footer>
  );
}
