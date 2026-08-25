import React from 'react';
import { Target, Users, Zap, Trophy } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about-fest" className="about-fest-section" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag" style={{ color: '#00f0ff', fontSize: '0.875rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>ABOUT THE FEST</span>
          <h2 className="section-title" style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>What is NIRVAN?</h2>
          <p className="section-subtitle" style={{ color: '#a0a0b0', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.6' }}>
            NIRVAN &apos;26 brings together developers, innovators, designers, and technology enthusiasts for two days of challenges, competitions, workshops, and collaboration.
          </p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="about-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem 2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease, borderColor 0.3s ease' }}>
            <Target className="w-10 h-10 mb-4" style={{ color: '#00f0ff', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Our Mission</h3>
            <p style={{ color: '#a0a0b0', lineHeight: '1.6' }}>To foster a culture of technical excellence and provide a platform where ideas become impactful innovations.</p>
          </div>
          <div className="about-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem 2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease, borderColor 0.3s ease' }}>
            <Users className="w-10 h-10 mb-4" style={{ color: '#b966ff', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>For Everyone</h3>
            <p style={{ color: '#a0a0b0', lineHeight: '1.6' }}>Whether you're a seasoned developer, a creative designer, or a curious beginner, there's a place for you here.</p>
          </div>
          <div className="about-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem 2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease, borderColor 0.3s ease' }}>
            <Zap className="w-10 h-10 mb-4" style={{ color: '#ff3366', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>What to Expect</h3>
            <p style={{ color: '#a0a0b0', lineHeight: '1.6' }}>Experience high-energy hackathons, expert-led workshops, competitive esports, and cutting-edge tech panels.</p>
          </div>
          <div className="about-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem 2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease, borderColor 0.3s ease' }}>
            <Trophy className="w-10 h-10 mb-4" style={{ color: '#ffd700', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Legacy</h3>
            <p style={{ color: '#a0a0b0', lineHeight: '1.6' }}>Building on past successes with thousands of participants, incredible prizes, and a growing community of innovators.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
