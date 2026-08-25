'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundFX.playWarp();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="video-modal" className="modal-backdrop active" onClick={handleBackdropClick}>
      <div className="modal-dialog video-modal-dialog">
        <button id="video-modal-close" className="modal-close-btn" onClick={handleClose} aria-label="Close Video Modal">
          <X className="w-5 h-5" />
        </button>

        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff' }}>
            NIRVAN &apos;26 — Graphic Era Hill University Showcase
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Official Campus Drone Showcase • GEHU Innovation Hub
          </p>
        </div>

        <div className="video-container-modal">
          <video ref={videoRef} id="campus-fest-video" controls playsInline>
            <source src="/Drone.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </div>
  );
}
