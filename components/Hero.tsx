'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { soundFX } from '@/lib/audio';
import Countdown from './Countdown';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenRegister, onOpenVideo }: HeroProps) {
  const [titleText, setTitleText] = useState("NIRVAN '26");
  const [taglineText, setTaglineText] = useState("WHERE IDEAS BECOME INNOVATIONS");

  const scramble = (targetText: string, setText: (val: string) => void) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________010101';
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= targetText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    scramble("NIRVAN '26", setTitleText);
    const timeout = setTimeout(() => {
      scramble("WHERE IDEAS BECOME INNOVATIONS", setTaglineText);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleTitleHover = () => {
    soundFX.playGlitch();
    scramble("NIRVAN '26", setTitleText);
  };

  return (
    <section
      id="about"
      className="hero-section hero-section--centered"
    >
      <video autoPlay loop muted playsInline className="hero-video-bg">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="hero-center-content">
          <div className="hero-title-sponsor-label">TITLE SPONSOR</div>
          <div className="hero-title-wrap">
            <h1 className="hero-glitch-title" onMouseEnter={handleTitleHover}>
              <span className="scramble-title">{titleText}</span>
            </h1>
          </div>

          <div className="tagline-container">
            <h2 className="hero-tagline scramble-tagline">{taglineText}</h2>
          </div>

          <div className="hero-date-venue">
            <span className="hero-date"><Calendar /> Nov 12 - 14, 2026</span>
            <span className="hero-divider">•</span>
            <a 
              href="https://maps.app.goo.gl/eotZBsqwYr7ZW8Kr7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-venue"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'inherit' }}
            >
              <MapPin /> GEHU Campus <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div style={{ marginTop: '2.5rem', marginBottom: '-1rem', textAlign: 'center' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #00f0ff, #b966ff, #00f0ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.75rem',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              animation: 'shine 3s linear infinite',
              filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))'
            }}>
              ★ Over ₹38,000 In Prizes ★
            </span>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shine {
              to { background-position: 200% center; }
            }
          `}} />

          <Countdown />

          <div className="hero-cta-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
            <button className="btn-primary" onClick={() => {
              document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Events
            </button>
            <button className="btn-secondary" onClick={onOpenRegister} style={{ backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.8)', color: 'white', padding: '0.75rem 2rem', borderRadius: '0px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
