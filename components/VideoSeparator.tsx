import React from 'react';

export const VideoSeparator = () => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '500px', // A good height for a visual break
      overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
      zIndex: 5,
      marginTop: '2rem',
      marginBottom: '2rem'
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.8 // slight opacity to blend nicely
        }}
      >
        <source src="/black_hole.mp4" type="video/mp4" />
      </video>
    </section>
  );
};
