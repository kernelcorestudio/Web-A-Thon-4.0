'use client';

import React, { useEffect } from 'react';
import { soundFX } from '@/lib/audio';

export default function CustomCursor() {
  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'button, a, input, select, .track-card, .campus-spotlight-card, .video-player-preview, .stat-card, .countdown-box'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          soundFX.playHover();
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
      observer.disconnect();
    };
  }, []);

  return null;
}
