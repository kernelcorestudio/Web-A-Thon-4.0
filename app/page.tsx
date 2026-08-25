'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import StyleNovaHero from '@/components/StyleNovaHero';
import CustomCursor from '@/components/CustomCursor';

// Dynamic import of Three.js background to ensure client-only execution
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false });

export default function Home() {
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
          {/* Home Section */}
          <Hero
            onOpenRegister={() => setIsRegisterModalOpen(true)}
            onOpenVideo={() => {}}
          />

          {/* Events Section — Style.nova Interactive Hero & Spinning Card Carousel */}
          <StyleNovaHero onOpenRegister={() => setIsRegisterModalOpen(true)} />

          {/* Gallery Section */}
          <section id="gallery" className="placeholder-section">
            <div className="container">
              <div className="section-header">
                <span className="section-tag">COMING SOON</span>
                <h2 className="section-title">Gallery</h2>
                <p className="section-subtitle">Highlights and memories from past editions.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="placeholder-section">
            <div className="container">
              <div className="section-header">
                <span className="section-tag">GET IN TOUCH</span>
                <h2 className="section-title">Contact Us</h2>
                <p className="section-subtitle">Have questions? Reach out to the NIRVAN '26 team.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
