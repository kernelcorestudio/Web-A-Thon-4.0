'use client';

import React, { useEffect, useRef } from 'react';
import { soundFX } from '@/lib/audio';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animationFrameId = requestAnimationFrame(renderCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    renderCursor();

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'button, a, input, select, .track-card, .campus-spotlight-card, .video-player-preview, .stat-card, .countdown-box'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('active');
          soundFX.playHover();
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('active');
        });
        el.addEventListener('click', () => {
          soundFX.playClick();
        });
      });
    };

    addHoverListeners();

    // Re-bind on dynamic mutations if necessary
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
