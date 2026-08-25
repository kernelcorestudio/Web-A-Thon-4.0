'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Disc3 } from 'lucide-react';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Default to false to handle browser autoplay policies
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt to autoplay on mount if possible, or wait for user interaction
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Reduced volume
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented by browser, waiting for user interaction.');
        }
      }
    };
    
    // Add a small delay or click listener on document for first interaction
    const handleFirstInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/audio.mpeg" />
      <button 
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999999,
          backgroundColor: 'rgba(5, 5, 16, 0.8)',
          border: `1px solid ${isPlaying ? '#00f0ff' : 'rgba(255,255,255,0.2)'}`,
          borderRadius: '50%',
          padding: '1rem',
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 0 20px rgba(0, 240, 255, 0.3)' : '0 10px 30px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          outline: 'none'
        }}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div style={{
          animation: isPlaying ? 'spin 3s linear infinite' : 'none',
          display: 'flex'
        }}>
          <Disc3 
            className="w-8 h-8" 
            style={{
              color: isPlaying ? '#00f0ff' : '#a0a0b0',
              transition: 'color 0.3s ease'
            }} 
          />
        </div>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </>
  );
};
