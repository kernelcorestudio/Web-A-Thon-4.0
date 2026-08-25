'use client';

import React, { useEffect, useRef } from 'react';

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rainbowRef = useRef<HTMLImageElement>(null);
  const leftCloudRef = useRef<HTMLImageElement>(null);
  const rightCloudRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let animFrameId: number;

    // Current animated values (for smooth lerping)
    let currentRainbowY = 120;
    let currentLeftCloudX = -200;
    let currentRightCloudX = 200;
    let currentCloudY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateParallax = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress value: 0 when top enters bottom of viewport, 1 when bottom leaves top of viewport
      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(Math.max(0, currentPos / totalDist), 1);

      // ── Target calculations ───────────────────────────────────────────────
      // Rainbow moves from +120px to -160px
      const targetRainbowY = 120 + progress * (-160 - 120);

      // Cloud trigger threshold (in view between 0.12 and 0.92)
      const isInView = progress >= 0.12 && progress <= 0.92;
      const targetLeftCloudX = isInView ? 0 : -200;
      const targetRightCloudX = isInView ? 0 : 200;
      const targetCloudY = progress * -50;

      // ── Lerping ───────────────────────────────────────────────────────────
      currentRainbowY = lerp(currentRainbowY, targetRainbowY, 0.06);
      currentLeftCloudX = lerp(currentLeftCloudX, targetLeftCloudX, 0.04);
      currentRightCloudX = lerp(currentRightCloudX, targetRightCloudX, 0.04);
      currentCloudY = lerp(currentCloudY, targetCloudY, 0.04);

      // ── Apply transforms to DOM (GPU accelerated translate3d) ─────────────
      if (rainbowRef.current) {
        rainbowRef.current.style.transform = `translate3d(0, ${currentRainbowY.toFixed(2)}px, 0)`;
      }

      if (leftCloudRef.current) {
        const leftOpacity = Math.max(0, 1 - Math.abs(currentLeftCloudX) / 200);
        leftCloudRef.current.style.transform = `translate3d(${currentLeftCloudX.toFixed(2)}px, ${currentCloudY.toFixed(2)}px, 0)`;
        leftCloudRef.current.style.opacity = leftOpacity.toFixed(3);
      }

      if (rightCloudRef.current) {
        const rightOpacity = Math.max(0, 1 - Math.abs(currentRightCloudX) / 200);
        rightCloudRef.current.style.transform = `translate3d(${currentRightCloudX.toFixed(2)}px, ${currentCloudY.toFixed(2)}px, 0) scaleX(-1)`;
        rightCloudRef.current.style.opacity = rightOpacity.toFixed(3);
      }

      animFrameId = requestAnimationFrame(updateParallax);
    };

    animFrameId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
    >
      {/* Rainbow Parallax Layer */}
      <img
        ref={rainbowRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png"
        alt="Atmospheric Rainbow"
        className="absolute inset-x-0 top-0 z-30 w-full object-cover pointer-events-none will-change-transform opacity-80"
        style={{ transform: 'translate3d(0, 120px, 0)' }}
      />

      {/* Left Cloud Layer */}
      <img
        ref={leftCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Left Cloud"
        className="absolute left-0 bottom-[10%] z-10 hidden sm:block w-[500px] md:w-[650px] pointer-events-none will-change-transform"
        style={{
          marginLeft: '-50%',
          opacity: 0,
          transform: 'translate3d(-200px, 0, 0)',
        }}
      />

      {/* Right Cloud Layer (Flipped horizontally with scale-x-[-1]) */}
      <img
        ref={rightCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Right Cloud"
        className="absolute right-0 bottom-[15%] z-10 pointer-events-none will-change-transform w-[500px] md:w-[650px]"
        style={{
          marginRight: '-75%',
          opacity: 0,
          transform: 'translate3d(200px, 0, 0) scaleX(-1)',
        }}
      />

      {/* Center Quote Content */}
      <div className="relative z-20 max-w-4xl px-6 md:px-12 text-center select-none">
        <blockquote className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5] drop-shadow-lg italic font-normal tracking-wide">
          &ldquo;NIRVAN &apos;26 was founded on a belief in beauty that honors your nature.
          We pursue refined outcomes, considered approaches, and lasting vitality. We spend
          time learning what matters to you before deciding what serves you best. No
          rushing, no excess — just support that lets you feel radiant.&rdquo;
        </blockquote>

        <div className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-widest font-inter uppercase font-medium">
          Dr. Mia Callahan &mdash; Founder
        </div>
      </div>
    </section>
  );
}
