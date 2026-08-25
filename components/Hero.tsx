'use client';

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Palette,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  MapPin,
  Play,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenRegister, onOpenVideo }: HeroProps) {
  // Scramble text states
  const [titleText, setTitleText] = useState("NIRVAN '26");
  const [taglineText, setTaglineText] = useState("WHERE IDEAS BECOME INNOVATIONS");

  // Countdown timer states
  const [timeLeft, setTimeLeft] = useState({
    days: '60',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Text scrambler effect
  const scramble = (targetText: string, setText: (val: string) => void) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________010101';
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    scramble("NIRVAN '26", setTitleText);
    const timeout = setTimeout(() => {
      scramble("WHERE IDEAS BECOME INNOVATIONS", setTaglineText);
    }, 400);

    // Target Fest Date: October 24, 2026 at 09:00:00 AM IST
    const targetDate = new Date('2026-10-24T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const pad = (n: number) => String(n).padStart(2, '0');

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(timerInterval);
    };
  }, []);

  const handleTitleHover = () => {
    soundFX.playGlitch();
    scramble("NIRVAN '26", setTitleText);
  };

  return (
    <section id="about" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left: Info & Countdown */}
          <div className="hero-content">
            <div className="hero-pill-badge">
              <span className="pulse-dot"></span>
              <span className="pill-text">Annual College Technical Fest • GEHU Campus</span>
            </div>

            <div className="hero-title-wrap">
              <h1 className="hero-glitch-title" onMouseEnter={handleTitleHover}>
                <span className="scramble-title">{titleText}</span>
              </h1>
            </div>

            <div className="tagline-container">
              <span className="tagline-prefix">⚡</span>
              <h2 className="hero-tagline scramble-tagline">{taglineText}</h2>
            </div>

            <p className="hero-description">
              The premier annual innovation summit at <strong>Graphic Era Hill University</strong>.
              Bringing together visionary student developers, designers, and tech creators to build, compete, and shape tomorrow.
            </p>

            {/* Target Audience Chips */}
            <div className="hero-audience-chips">
              <div className="audience-chip">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Developers</span>
              </div>
              <div className="audience-chip">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Designers</span>
              </div>
              <div className="audience-chip">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Innovators</span>
              </div>
              <div className="audience-chip">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Students</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="hero-cta-group">
              <button className="btn-primary open-register-btn" onClick={onOpenRegister}>
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="btn-secondary btn-video-teaser open-video-btn" onClick={onOpenVideo}>
                <span className="video-play-pulse"></span>
                <span>WATCH TEASER</span>
              </button>
            </div>

            {/* Live Countdown Module */}
            <div className="countdown-wrapper">
              <div className="countdown-header">
                <div className="countdown-label">
                  <Clock className="w-4 h-4" />
                  <span>COUNTDOWN TO NIRVAN &apos;26</span>
                </div>
                <div className="countdown-status-live">
                  <span>REGISTRATIONS LIVE</span>
                </div>
              </div>

              <div className="countdown-grid">
                <div className="countdown-box">
                  <div className="countdown-num-wrap">
                    <div id="cd-days" className="countdown-value">{timeLeft.days}</div>
                  </div>
                  <div className="countdown-unit">DAYS</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num-wrap">
                    <div id="cd-hours" className="countdown-value">{timeLeft.hours}</div>
                  </div>
                  <div className="countdown-unit">HOURS</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num-wrap">
                    <div id="cd-minutes" className="countdown-value">{timeLeft.minutes}</div>
                  </div>
                  <div className="countdown-unit">MINUTES</div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-num-wrap">
                    <div id="cd-seconds" className="countdown-value">{timeLeft.seconds}</div>
                  </div>
                  <div className="countdown-unit">SECONDS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D HUD & Hologram Core */}
          <div className="hero-visual-card">
            <div className="holo-hud-panel">
              <div className="corner-bracket corner-tl"></div>
              <div className="corner-bracket corner-tr"></div>
              <div className="corner-bracket corner-bl"></div>
              <div className="corner-bracket corner-br"></div>

              <div className="hud-header">
                <div className="hud-title">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>QUANTUM CORE ENGINE</span>
                </div>
                <div className="hud-id">SYS: ONLINE // 60 FPS</div>
              </div>

              <div className="holo-3d-preview">
                <div className="holo-ring-animated ring-outer"></div>
                <div className="holo-ring-animated ring-mid"></div>
                <div className="holo-ring-animated ring-inner"></div>
                <div className="core-hologram-symbol">
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              <div className="hud-metrics-row">
                <div className="hud-metric-item">
                  <div className="metric-label">Total Prize Pool</div>
                  <div className="metric-val glow-amber">₹5,00,000+</div>
                </div>
                <div className="hud-metric-item">
                  <div className="metric-label">Hackathon Duration</div>
                  <div className="metric-val glow-cyan">48 Hours</div>
                </div>
                <div className="hud-metric-item">
                  <div className="metric-label">Expected Innovators</div>
                  <div className="metric-val">3,000+</div>
                </div>
                <div className="hud-metric-item">
                  <div className="metric-label">Campus Venue</div>
                  <div className="metric-val">GEHU CAMPUS</div>
                </div>
              </div>
            </div>

            {/* Campus Spotlight Trigger Card */}
            <div className="campus-spotlight-card open-video-btn" onClick={onOpenVideo}>
              <div className="campus-info-left">
                <div className="campus-icon-wrap">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="campus-name">Graphic Era Hill University</div>
                  <div className="campus-sub">Dehradun Campus • Innovation Center</div>
                </div>
              </div>
              <div className="campus-action-badge">
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
