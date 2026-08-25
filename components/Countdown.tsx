'use client';

import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Target Date: November 12, 2026 00:00:00
    const targetDate = new Date('2026-11-12T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <style>{`
        .countdown-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2%;
          margin-top: 3rem;
          color: white;
          font-family: inherit;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          background-color: transparent;
          border: none;
        }
        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        .countdown-number {
          font-size: clamp(2rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 2px;
        }
        .countdown-label {
          font-size: clamp(0.7rem, 2vw, 1.25rem);
          text-transform: capitalize;
          letter-spacing: 1px;
          opacity: 0.8;
          margin-top: 0.75rem;
          font-weight: 400;
        }
        .countdown-separator {
          font-size: clamp(2rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1;
          padding-bottom: clamp(1rem, 3vw, 2rem);
          opacity: 0.8;
        }
      `}</style>
      <div className="countdown-wrapper">
        <div className="countdown-item">
          <span className="countdown-number">{formatNumber(timeLeft.days)}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-item">
          <span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </>
  );
}
