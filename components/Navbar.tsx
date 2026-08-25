'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ticket, Menu, X } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { ContinuousTabs } from './ContinuousTabs';
import clubLogo from './assests/logo.png';

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Close mobile menu on click
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src={clubLogo} alt="TECH GEEKS" width={65} height={65} style={{ objectFit: 'contain' }} />
            </div>
            <div className="brand-text">
              <div className="brand-title">
                TECH GEEKS
              </div>
            </div>
          </a>
        </div>

        {/* Center: Continuous Tabs (Desktop) */}
        <div className="nav-center desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ContinuousTabs />
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="nav-right desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div className="nav-actions">
            <button className="nav-cta-btn open-register-btn" onClick={onOpenRegister}>
              <Ticket className="w-4 h-4" />
              <span>REGISTER</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <a href="#about" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#about')}>Home</a>
          <a href="#about-fest" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#about-fest')}>About</a>
          <a href="#events" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#events')}>Events</a>
          <a href="#schedule" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#schedule')}>Schedule</a>
          <a href="#gallery" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#gallery')}>Gallery</a>
          <a href="#sponsors" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#sponsors')}>Sponsors</a>
          <a href="#contact" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
          
          <button className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }} onClick={() => {
            setIsMobileMenuOpen(false);
            onOpenRegister();
          }}>
            REGISTER NOW
          </button>
        </div>
      )}
    </header>
  );
}
