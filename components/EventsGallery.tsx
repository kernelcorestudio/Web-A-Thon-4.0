"use client";

import { useRef, useEffect, useState, type FC } from 'react';
import { X } from 'lucide-react';

const images = [
  { src: '/events/DSC_0100.JPG.jpeg', alt: 'Event highlights 1' },
  { src: '/events/DSC_0119.JPG.jpeg', alt: 'Event highlights 2' },
  { src: '/events/DSC_0135.JPG.jpeg', alt: 'Event highlights 3' },
  { src: '/events/DSC_9762.JPG.jpeg', alt: 'Event highlights 4' },
  { src: '/events/DSC_9766.JPG.jpeg', alt: 'Event highlights 5' },
  { src: '/events/DSC_9778.JPG.jpeg', alt: 'Event highlights 6' },
  { src: '/events/DSC_9791.JPG.jpeg', alt: 'Event highlights 7' },
  { src: '/events/DSC_9802.JPG.jpeg', alt: 'Event highlights 8' },
  { src: '/events/DSC_9819.JPG.jpeg', alt: 'Event highlights 9' },
  { src: '/events/DSC08158.JPG.jpeg', alt: 'Event highlights 10' },
  { src: '/events/20260418_101029.jpg.jpeg', alt: 'Event highlights 11' },
  { src: '/events/20260418_111730.jpg.jpeg', alt: 'Event highlights 12' },
  { src: '/events/IMG_7419.JPG.jpeg', alt: 'Event highlights 13' },
];

export const EventsGallery: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [lightboxImage]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If scrolling vertically, hijack it and scroll horizontally instead
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Only prevent default if we actually have room to scroll horizontally
        // This allows the page to scroll down if they reach the end of the gallery
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
        if (
          (e.deltaY > 0 && container.scrollLeft < maxScrollLeft) || 
          (e.deltaY < 0 && container.scrollLeft > 0)
        ) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section id="gallery" className="events-gallery-section">
      <div className="gallery-header-fixed">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">Highlights and memories from past editions.</p>
      </div>

      <div 
        ref={scrollContainerRef}
        className={isMobile ? "gallery-mobile-grid-wrapper" : "gallery-track-wrapper custom-scrollbar"}
        style={isMobile ? { padding: '0 1rem', overflow: 'hidden' } : undefined}
      >
        <div 
          className={isMobile ? "mobile-grid" : "gallery-track"} 
          style={isMobile ? { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' } : undefined}
        >
          {(isMobile && !showAllMobile ? images.slice(0, 4) : images).map((image, i) => (
            <div 
              key={i} 
              className={isMobile ? "mobile-gallery-item" : "gallery-item"} 
              onClick={() => setLightboxImage(image.src)} 
              style={{ cursor: 'zoom-in' }}
            >
              <div className="gallery-item-inner">
                {isMobile ? (
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    style={{ width: '100%', display: 'block', borderRadius: '8px' }}
                  />
                ) : (
                  <div 
                    className="gallery-img-inner"
                    style={{ backgroundImage: `url('${image.src}')`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {isMobile && !showAllMobile && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.85rem' }} onClick={() => setShowAllMobile(true)}>Show More</button>
          </div>
        )}
        
        {isMobile && showAllMobile && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.85rem' }} onClick={() => setShowAllMobile(false)}>Show Less</button>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
          onClick={() => setLightboxImage(null)}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '2rem', right: '2rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              padding: '0.75rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10001
            }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={lightboxImage} 
            alt="Fullscreen view" 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
