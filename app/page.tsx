'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HighlightsMarquee from '@/components/HighlightsMarquee';
import Tracks from '@/components/Tracks';
import CampusSpotlight from '@/components/CampusSpotlight';
import Terminal from '@/components/Terminal';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';
import RegisterModal from '@/components/RegisterModal';
import CustomCursor from '@/components/CustomCursor';

// Dynamic import of Three.js background to ensure client-only execution
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false });

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* Background WebGL 3D Canvas & Ambient FX */}
      <ThreeScene />
      <div className="cyber-grid-overlay"></div>
      <div className="scanline"></div>
      <div className="ambient-nebula">
        <div className="nebula-blob nebula-1"></div>
        <div className="nebula-blob nebula-2"></div>
        <div className="nebula-blob nebula-3"></div>
      </div>

      {/* Main Content Layout */}
      <div className="app-wrapper">
        <Navbar onOpenRegister={() => setIsRegisterModalOpen(true)} />
        
        <main>
          <Hero
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenVideo={() => setIsVideoModalOpen(true)}
          />
          <HighlightsMarquee />
          <Tracks />
          <CampusSpotlight onOpenVideo={() => setIsVideoModalOpen(true)} />
          <Terminal
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenVideo={() => setIsVideoModalOpen(true)}
          />
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
