'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Ticket } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ContinuousTabs } from './ContinuousTabs';

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
      <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left: Logo Placeholder */}
        <div className="nav-left" style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <a href="#" className="brand-group" onClick={(e) => handleNavClick(e, '#about')}>
            <div className="brand-symbol" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.3)' }}>
              {/* Placeholder for Club Logo */}
              <Cpu className="w-5 h-5 text-gray-400" />
            </div>
            <div className="brand-text">
              <div className="brand-title">
                CLUB LOGO
              </div>
            </div>
          </a>
        </div>

        {/* Center: Continuous Tabs */}
        <div className="nav-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ContinuousTabs />
        </div>

        {/* Right: Actions */}
        <div className="nav-right" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
              <span>REGISTER</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
