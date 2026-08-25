'use client';

import React, { useState, useEffect } from 'react';
import { soundFX } from '@/lib/audio';

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
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      <div className="container">
        <div className="hero-center-content">
          <div className="hero-title-wrap">
            <h1 className="hero-glitch-title" onMouseEnter={handleTitleHover}>
              <span className="scramble-title">{titleText}</span>
            </h1>
          </div>

          <div className="tagline-container">
            <h2 className="hero-tagline scramble-tagline">{taglineText}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
