'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import CustomCursor from '@/components/CustomCursor';
import { EventsGallery } from '@/components/EventsGallery';
import { Sponsors } from '@/components/Sponsors';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { AboutSection } from '@/components/AboutSection';
import { EventArena } from '@/components/EventArena';
import { Schedule } from '@/components/Schedule';
import { Speakers } from '@/components/Speakers';
import { AudioPlayer } from '@/components/AudioPlayer';
import { VideoSeparator } from '@/components/VideoSeparator';
import { ScrollReveal } from '@/components/ScrollReveal';

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
            onOpenVideo={() => { }}
          />

          {/* About Section */}
          <ScrollReveal direction="left" delay={150}>
            <AboutSection />
          </ScrollReveal>

          {/* Black Hole Video Separator */}
          <ScrollReveal direction="up" delay={200}>
            <VideoSeparator />
          </ScrollReveal>

          {/* Event Arena */}
          <ScrollReveal direction="right" delay={150}>
            <EventArena onRegisterClick={() => setIsRegisterModalOpen(true)} />
          </ScrollReveal>

          {/* Schedule */}
          <ScrollReveal direction="left" delay={150}>
            <Schedule />
          </ScrollReveal>

          {/* Speakers */}
          <ScrollReveal direction="right" delay={150}>
            <Speakers />
          </ScrollReveal>

          {/* Gallery Section */}
          <ScrollReveal direction="left" delay={150}>
            <EventsGallery />
          </ScrollReveal>

          {/* Sponsors Section */}
          <ScrollReveal direction="right" delay={150}>
            <Sponsors />
          </ScrollReveal>

          {/* FAQ Section */}
          <ScrollReveal direction="up" delay={150}>
            <FAQSection />
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="bottom" delay={150}>
            <ContactSection />
          </ScrollReveal>

          {/* Background Audio Player */}
          <AudioPlayer />
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
