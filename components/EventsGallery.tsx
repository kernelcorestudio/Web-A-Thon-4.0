"use client";

import { useEffect, useState, type FC } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, Pause, ZoomIn, Camera } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  tag: string;
}

const imagesRow1: GalleryImage[] = [
  { src: '/events/DSC_0100.JPG.jpeg', title: 'Opening Hack Ceremony', tag: 'Ceremony' },
  { src: '/events/DSC_0119.JPG.jpeg', title: 'Main Stage Keynote', tag: 'Keynote' },
  { src: '/events/DSC_0135.JPG.jpeg', title: 'Hackathon War Room', tag: 'Hackathon' },
  { src: '/events/DSC_9762.JPG.jpeg', title: 'CTF Flag Hunters', tag: 'Cybersecurity' },
  { src: '/events/DSC_9766.JPG.jpeg', title: 'Team Collaboration Hub', tag: 'Community' },
  { src: '/events/DSC_9778.JPG.jpeg', title: 'Robotics & Hardware Demo', tag: 'Tech Demo' },
  { src: '/events/DSC_9791.JPG.jpeg', title: 'Mentor Guidance Session', tag: 'Mentorship' },
];

const imagesRow2: GalleryImage[] = [
  { src: '/events/DSC_9802.JPG.jpeg', title: 'Esports Championship Final', tag: 'Gaming' },
  { src: '/events/DSC_9819.JPG.jpeg', title: 'Midnight Brainstorming', tag: 'Hackathon' },
  { src: '/events/DSC08158.JPG.jpeg', title: 'Project Pitch Showcase', tag: 'Judging' },
  { src: '/events/20260418_101029.jpg.jpeg', title: 'Campus Innovation Center', tag: 'Campus' },
  { src: '/events/20260418_111730.jpg.jpeg', title: 'Live Coding Battle', tag: 'Competition' },
  { src: '/events/IMG_7419.JPG.jpeg', title: 'Victory & Trophy Celebration', tag: 'Awards' },
];

export const EventsGallery: FC = () => {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxImage]);

  const renderPhotoCard = (item: GalleryImage, index: number, prefix: string) => (
    <div
      key={`${prefix}-${index}`}
      className="gallery-photo-card"
      onClick={() => setLightboxImage(item)}
      role="button"
      tabIndex={0}
      aria-label={`View photo ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setLightboxImage(item);
        }
      }}
    >
      <img
        src={item.src}
        alt={item.title}
        className="gallery-photo-img"
        loading="lazy"
      />
      <div className="gallery-photo-overlay">
        <span className="gallery-photo-tag">
          <Camera className="w-3.5 h-3.5" style={{ color: '#00f0ff' }} />
          {item.tag}
        </span>
        <p className="gallery-photo-desc">{item.title}</p>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="gallery-carousel-section">
      {/* Section Header */}
      <div
        className="container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <span
          style={{
            color: '#00f0ff',
            fontSize: '0.875rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: '#00f0ff' }} />
          VISUAL MEMORIES
        </span>
        <h2
          style={{
            fontSize: '3.5rem',
            color: '#ffffff',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            fontWeight: 900,
            letterSpacing: '1px'
          }}
        >
          Fest Gallery
        </h2>
        <p
          style={{
            color: '#94a3b8',
            maxWidth: '680px',
            margin: '0 auto',
            fontSize: '1.15rem',
            lineHeight: 1.6
          }}
        >
          Relive the energy, intense hackathon sprints, esports triumphs, and unforgettable moments.
        </p>

        {/* HUD Indicator */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.25rem',
            background: 'rgba(0, 240, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '50px',
            color: '#38bdf8',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}
        >
          <Pause className="w-3.5 h-3.5" style={{ color: '#00f0ff' }} />
          <span>Hover to pause • Click photo for fullscreen view</span>
        </div>
      </div>

      {/* Row 1: Infinite Scroll (Leftward) */}
      <div className="gallery-carousel-wrapper" style={{ paddingBottom: '1rem' }}>
        <div className="gallery-carousel-track">
          <div className="gallery-carousel-group">
            {imagesRow1.map((item, idx) => renderPhotoCard(item, idx, 'r1-orig'))}
          </div>
          <div aria-hidden="true" className="gallery-carousel-group">
            {imagesRow1.map((item, idx) => renderPhotoCard(item, idx, 'r1-dup'))}
          </div>
        </div>
      </div>

      {/* Row 2: Infinite Scroll (Reverse / Rightward) */}
      <div className="gallery-carousel-wrapper" style={{ paddingTop: '0.5rem' }}>
        <div className="gallery-carousel-track">
          <div className="gallery-carousel-group reverse">
            {imagesRow2.map((item, idx) => renderPhotoCard(item, idx, 'r2-orig'))}
          </div>
          <div aria-hidden="true" className="gallery-carousel-group reverse">
            {imagesRow2.map((item, idx) => renderPhotoCard(item, idx, 'r2-dup'))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal Portal */}
      {mounted && lightboxImage && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: '0.75rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 100001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Content Card */}
          <div
            style={{
              maxWidth: '1100px',
              maxHeight: '90vh',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '16px',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 40px rgba(0, 240, 255, 0.2)'
              }}
            />
            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'rgba(10, 16, 32, 0.8)',
                padding: '0.6rem 1.5rem',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <span
                style={{
                  color: '#00f0ff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {lightboxImage.tag}
              </span>
              <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
                {lightboxImage.title}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
