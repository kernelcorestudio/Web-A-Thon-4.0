'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Code, 
  Gamepad2, 
  Shield, 
  Search, 
  BookOpen, 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  IndianRupee, 
  Trophy,
  Sparkles,
  ArrowRight,
  Pause
} from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  badgeBg: string;
  icon: React.ReactNode;
  shortDesc: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  team: string;
  fee: string;
  prize: string;
  poster: string;
  rules: string[];
}

const eventsData: EventItem[] = [
  {
    id: 'hackathon',
    title: 'Hackathon',
    category: 'Coding',
    categoryColor: '#00f0ff',
    badgeBg: 'rgba(0, 240, 255, 0.15)',
    icon: <Code className="w-6 h-6" />,
    shortDesc: '36-hour continuous innovation sprint solving real-world challenges.',
    description: 'A high-energy innovation challenge where participants turn ideas into impactful solutions. Build, code, collaborate, and compete against talented teams while solving real-world problems under time constraints.',
    date: '12 October 2026',
    time: '10:00 AM',
    venue: 'Computer Lab 1 & Innovation Hub',
    team: '2-4 Members',
    fee: '₹100',
    prize: '₹15,000',
    poster: '/posters/Hackathon.jpeg',
    rules: [
      'Problem statements will be revealed on the spot.',
      'Use of AI is allowed but must be disclosed.',
      'All code must be written during the event.',
      'Judges decision will be final and binding.'
    ]
  },
  {
    id: 'ctf',
    title: 'CTF Challenge',
    category: 'Cybersecurity',
    categoryColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    icon: <Shield className="w-6 h-6" />,
    shortDesc: 'Offensive & defensive hacking, cryptography, forensics & web exploits.',
    description: 'Put your cybersecurity skills to the test through a series of challenges covering cryptography, web security, forensics, reverse engineering, and more. Find the flags, crack the challenges, and prove your cyber prowess.',
    date: '13 October 2026',
    time: '10:00 AM',
    venue: 'Cyber Lab 2',
    team: '1-3 Members',
    fee: '₹100',
    prize: '₹5,000',
    poster: '/posters/CTF.jpeg',
    rules: [
      'Do not attack the scoring server or infrastructure.',
      'Flags are in the format NIRVAN{...}.',
      'Sharing flags with other teams will lead to instant DQ.',
      'Bring your own pre-configured security tools/distros.'
    ]
  },
  {
    id: 'esports',
    title: 'E-Sports Arena',
    category: 'Gaming',
    categoryColor: '#f43f5e',
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    icon: <Gamepad2 className="w-6 h-6" />,
    shortDesc: 'High-octane competitive gaming tournament with live casting.',
    description: 'Experience the ultimate competitive gaming arena where strategy, teamwork, reflexes, and skill come together. Compete against fellow gamers, climb the leaderboard, and battle for collegiate championship glory.',
    date: '13 October 2026',
    time: '02:00 PM',
    venue: 'Open Ground Gaming Arena',
    team: '4-5 Members',
    fee: '₹200',
    prize: '₹10,000',
    poster: '/posters/Esports.jpeg',
    rules: [
      'Bring your own peripherals (keyboards/mice/headsets).',
      'Use of third-party cheats, macros, or exploits is prohibited.',
      'Respect referees, casters, and opponent teams.',
      'Tournament brackets will be single/double elimination.'
    ]
  },
  {
    id: 'treasure-hunt',
    title: 'Treasure Hunt',
    category: 'Adventure',
    categoryColor: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    icon: <Search className="w-6 h-6" />,
    shortDesc: 'Campus-wide cryptic quest with geo-clues and puzzle checkpoints.',
    description: 'A thrilling adventure combining logic, teamwork, observation, and puzzle-solving. Follow clues, overcome physical and mental checkpoints, and race against other teams to uncover the ultimate hidden treasure.',
    date: '13 October 2026',
    time: '04:00 PM',
    venue: 'GEHU Campus Wide',
    team: '2-4 Members',
    fee: '₹150',
    prize: '₹8,000',
    poster: '/posters/Treasure_hunt.jpeg',
    rules: [
      'Do not damage campus property or restricted facilities.',
      'Stick strictly to the designated event boundaries.',
      'All clues must be scanned/solved sequentially.',
      'The first team to submit the final talisman wins.'
    ]
  },
  {
    id: 'workshop',
    title: 'Tech Workshop',
    category: 'Learning',
    categoryColor: '#8b5cf6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    icon: <BookOpen className="w-6 h-6" />,
    shortDesc: 'Hands-on practical masterclass led by industry tech leaders.',
    description: 'An interactive learning experience designed to bridge the gap between theory and real-world tech stack skills. Learn from industry mentors, build live projects, and gain certified hands-on experience.',
    date: '12 October 2026',
    time: '10:00 AM',
    venue: 'Auditorium & Seminar Hall',
    team: 'Individual (1)',
    fee: '₹50',
    prize: 'Swags & Certs',
    poster: '/posters/Workshop.jpeg',
    rules: [
      'Bring your own fully charged laptop.',
      'Pre-requisite toolkits will be shared prior to session.',
      'Active participation and project submission required for certificates.'
    ]
  }
];

interface EventArenaProps {
  onRegisterClick?: () => void;
}

export const EventArena = ({ onRegisterClick }: EventArenaProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedEvent]);

  const renderCard = (ev: EventItem, index: number, isDuplicate = false) => (
    <div
      key={`${ev.id}-${isDuplicate ? 'dup' : 'orig'}-${index}`}
      className="event-poster-card"
      onClick={() => setSelectedEvent(ev)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${ev.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedEvent(ev);
        }
      }}
    >
      {/* Poster Image Frame */}
      <div className="event-poster-img-container">
        {/* Category Badge */}
        <span
          className="event-poster-badge"
          style={{
            backgroundColor: ev.badgeBg,
            color: ev.categoryColor,
            border: `1px solid ${ev.categoryColor}`
          }}
        >
          {ev.category}
        </span>

        {/* Prize Pool Badge */}
        <div className="event-prize-badge">
          <Trophy className="w-3.5 h-3.5" style={{ color: '#ffb800' }} />
          <span>{ev.prize}</span>
        </div>

        {/* Poster Image */}
        <img
          src={ev.poster}
          alt={`${ev.title} Poster`}
          className="event-poster-img"
          loading="lazy"
        />
      </div>

      {/* Card Info Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{ev.title}</h3>
        <p className="event-card-desc">{ev.shortDesc}</p>

        <div className="event-card-footer">
          <div className="event-card-meta">
            <Calendar className="w-3.5 h-3.5" style={{ color: '#00f0ff' }} />
            <span>{ev.date.split(' ')[0]} Oct</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <Users className="w-3.5 h-3.5" style={{ color: '#00f0ff' }} />
            <span>{ev.team}</span>
          </div>

          <button className="event-cta-btn" type="button">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      className="event-arena-section"
      style={{
        padding: '6rem 0 4rem 0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Container Header */}
      <div
        className="container"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <span
            style={{
              color: '#00f0ff',
              fontSize: '0.875rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
              fontWeight: 700
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#00f0ff' }} />
            COMPETITION DIRECTORY
          </span>
          <h2
            className="event-arena-title"
            style={{
              fontSize: '3.5rem',
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              fontWeight: 900,
              letterSpacing: '1px'
            }}
          >
            Event Arena
          </h2>
          <p
            className="event-arena-subtitle"
            style={{
              color: '#94a3b8',
              maxWidth: '680px',
              margin: '0 auto',
              fontSize: '1.15rem',
              lineHeight: 1.6
            }}
          >
            Explore high-stakes hackathons, cyber CTFs, competitive esports, and tech masterclasses.
          </p>

          {/* Interactive Pause-on-Hover HUD Notice */}
          <div
            className="event-hud-notice"
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
            <span>Hover to pause • Click card to inspect rules & register</span>
          </div>
        </div>
      </div>

      {/* Pure CSS Infinite Scrolling Carousel */}
      <div className="event-carousel-wrapper">
        <div className="event-carousel-track">
          {/* Primary Group */}
          <div className="event-carousel-group">
            {eventsData.map((ev, index) => renderCard(ev, index, false))}
          </div>

          {/* Duplicate Group for Seamless Infinite Loop */}
          <div aria-hidden="true" className="event-carousel-group">
            {eventsData.map((ev, index) => renderCard(ev, index, true))}
          </div>
        </div>
      </div>

      {/* Event Details Modal — Rendered via React Portal */}
      {mounted && selectedEvent && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="event-modal-container"
            style={{
              backgroundColor: '#070d1e',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              borderRadius: '24px',
              maxWidth: '960px',
              width: '100%',
              maxHeight: '90vh',
              position: 'relative',
              boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 50px rgba(0,240,255,0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '50%',
                padding: '0.5rem',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Left Side */}
            <div
              className="event-modal-poster-side"
              style={{
                flex: '1 1 340px',
                minHeight: '300px',
                position: 'relative',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <img
                src={selectedEvent.poster}
                alt={selectedEvent.title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }}
              />
            </div>

            {/* Content Right Side */}
            <div
              className="event-modal-content-side custom-scrollbar"
              style={{
                flex: '2 1 420px',
                padding: '2.5rem',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              {/* Category & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    color: selectedEvent.categoryColor,
                    backgroundColor: selectedEvent.badgeBg,
                    border: `1px solid ${selectedEvent.categoryColor}`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                >
                  {selectedEvent.category}
                </span>
                <span style={{ color: '#ffb800', fontSize: '0.85rem', fontWeight: 800 }}>
                  Prize: {selectedEvent.prize}
                </span>
              </div>

              <h2
                style={{
                  fontSize: '2.5rem',
                  color: '#fff',
                  marginBottom: '1rem',
                  fontWeight: 900,
                  fontFamily: "var(--font-cyber, 'Orbitron', sans-serif)"
                }}
              >
                {selectedEvent.title}
              </h2>
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '1rem',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}
              >
                {selectedEvent.description}
              </p>

              {/* Event Metadata Grid */}
              <div
                className="event-modal-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#00f0ff', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Date</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock className="w-5 h-5" style={{ color: '#00f0ff', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Time</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.time}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#00f0ff', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Venue</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.venue}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Users className="w-5 h-5" style={{ color: '#00f0ff', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Team Size</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.team}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <IndianRupee className="w-5 h-5" style={{ color: '#00f0ff', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Entry Fee</div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{selectedEvent.fee}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Trophy className="w-5 h-5" style={{ color: '#ffb800', marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Prize Pool</div>
                    <div style={{ color: '#ffb800', fontWeight: 700, fontSize: '0.95rem' }}>{selectedEvent.prize}</div>
                  </div>
                </div>
              </div>

              {/* Rules List */}
              <div
                style={{
                  marginBottom: '2rem',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '1.5rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <h4 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '1.05rem', fontWeight: 700 }}>
                  Event Rules & Guidelines
                </h4>
                <ul style={{ color: '#94a3b8', paddingLeft: '1.25rem', lineHeight: '1.7', fontSize: '0.9rem' }}>
                  {selectedEvent.rules.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal CTA */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  style={{
                    flex: '1',
                    minWidth: '160px',
                    padding: '0.85rem 1.75rem',
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
                    color: '#000',
                    border: 'none',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                  }}
                  onClick={() => {
                    setSelectedEvent(null);
                    if (onRegisterClick) onRegisterClick();
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  REGISTER NOW
                </button>

                <button
                  style={{
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
