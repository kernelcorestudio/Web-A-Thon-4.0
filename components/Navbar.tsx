'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Ticket } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    setAudioEnabled(soundFX.isEnabled());
    const unsubscribe = soundFX.subscribe((enabled) => {
      setAudioEnabled(enabled);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleAudioToggle = () => {
    soundFX.toggle();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="brand-group" onClick={(e) => handleNavClick(e, '#about')}>
          <div className="brand-symbol">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              NIRVAN <span className="accent-year">&apos;26</span>
            </div>
            <div className="brand-badge">
              <span className="campus-pill">GEHU CAMPUS</span>
              <span>TECH FEST</span>
            </div>
          </div>
        </a>

        <nav>
          <ul className="nav-links">
            <li className="nav-item">
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
            </li>
            <li className="nav-item">
              <a href="#tracks" onClick={(e) => handleNavClick(e, '#tracks')}>Tracks</a>
            </li>
            <li className="nav-item">
              <a href="#highlights" onClick={(e) => handleNavClick(e, '#highlights')}>Highlights</a>
            </li>
            <li className="nav-item">
              <a href="#campus-video" onClick={(e) => handleNavClick(e, '#campus-video')}>Campus Spotlight</a>
            </li>
            <li className="nav-item">
              <a href="#terminal" onClick={(e) => handleNavClick(e, '#terminal')}>Terminal</a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Audio SFX Switcher */}
          <button
            id="audio-toggle-btn"
            className={`audio-toggle-btn ${audioEnabled ? 'sound-on' : ''}`}
            onClick={handleAudioToggle}
            title="Toggle Futuristic Audio Feedback"
          >
            <span className="sound-bars">
              <span className="sound-bar"></span>
              <span className="sound-bar"></span>
              <span className="sound-bar"></span>
            </span>
            <span id="audio-status-text">{audioEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          {/* Register Pass Button */}
          <button className="nav-cta-btn open-register-btn" onClick={onOpenRegister}>
            <Ticket className="w-4 h-4" />
            <span>GET PASS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
