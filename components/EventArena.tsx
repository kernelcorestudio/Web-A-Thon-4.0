'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Code, Gamepad2, Shield, Search, BookOpen, X, MapPin, Clock, Calendar, Users, IndianRupee, Trophy } from 'lucide-react';

const eventsData = [
  {
    id: 'workshop',
    title: 'Workshop',
    category: 'Learning',
    icon: <BookOpen className="w-8 h-8" />,
    shortDesc: 'An interactive learning experience bridging theory and practical skills.',
    description: 'An interactive learning experience designed to bridge the gap between theory and practical skills. Learn from experts, explore emerging technologies, and gain hands-on experience through engaging activities.',
    date: '12 October 2026',
    time: '10:00 AM',
    venue: 'Seminar Hall',
    team: '1',
    fee: '₹50',
    prize: 'Swags & Certs',
    poster: '/posters/Workshop.jpeg',
    rules: [
      'Bring your own laptop.',
      'Software installations will be communicated prior.',
      'Active participation is expected.'
    ]
  },
  {
    id: 'hackathon',
    title: 'Hackathon',
    category: 'Coding',
    icon: <Code className="w-8 h-8" />,
    shortDesc: 'A high-energy innovation challenge to turn ideas into impactful solutions.',
    description: 'A high-energy innovation challenge where participants turn ideas into impactful solutions. Build, code, collaborate, and compete against talented teams while solving real-world problems under time constraints.',
    date: '12 October 2026',
    time: '10:00 AM',
    venue: 'Computer Lab 1',
    team: '2-4',
    fee: '₹100',
    prize: '₹15,000',
    poster: '/posters/Hackathon.jpeg',
    rules: [
      'Problem statements will be revealed on the spot.',
      'Use of AI is allowed but must be disclosed.',
      'All code must be written during the event.'
    ]
  },
  {
    id: 'esports',
    title: 'E Sports',
    category: 'Gaming',
    icon: <Gamepad2 className="w-8 h-8" />,
    shortDesc: 'Experience the ultimate competitive gaming arena.',
    description: 'Experience the ultimate competitive gaming arena where strategy, teamwork, reflexes, and skill come together. Compete against fellow gamers, climb the leaderboard, and battle for victory.',
    date: '13 October 2026',
    time: '02:00 PM',
    venue: 'Open Ground',
    team: '4-5',
    fee: '₹200',
    prize: '₹10,000',
    poster: '/posters/Esports.jpeg',
    rules: [
      'Bring your own peripherals (optional).',
      'Use of cheats or macros will result in instant disqualification.',
      'Respect the referees decisions.'
    ]
  },
  {
    id: 'ctf',
    title: 'CTF',
    category: 'Cybersecurity',
    icon: <Shield className="w-8 h-8" />,
    shortDesc: 'Put your cybersecurity skills to the test.',
    description: 'Put your cybersecurity skills to the test through a series of challenges covering cryptography, web security, forensics, reverse engineering, and more. Find the flags, crack the challenges, and prove your skills.',
    date: '13 October 2026',
    time: '10:00 AM',
    venue: 'Lab 2',
    team: '1-3',
    fee: '₹100',
    prize: '₹5,000',
    poster: '/posters/CTF.jpeg',
    rules: [
      'Do not attack the scoring server.',
      'Flags are in the format NIRVAN{...}.',
      'Sharing flags with other teams is prohibited.'
    ]
  },
  {
    id: 'treasure-hunt',
    title: 'Treasure Hunt',
    category: 'Fun',
    icon: <Search className="w-8 h-8" />,
    shortDesc: 'A thrilling adventure combining logic and observation.',
    description: 'A thrilling adventure combining logic, teamwork, observation, and problem-solving. Follow clues, overcome challenges, and race against other teams to uncover the ultimate treasure.',
    date: '13 October 2026',
    time: '04:00 PM',
    venue: 'Campus Wide',
    team: '2-4',
    fee: '₹150',
    prize: '₹8,000',
    poster: '/posters/Treasure_hunt.jpeg',
    rules: [
      'Do not damage campus property.',
      'Stick to the designated event boundaries.',
      'The first team to find the final clue wins.'
    ]
  }
];

const categories = ['All', 'Coding', 'Gaming', 'Cybersecurity', 'Learning', 'Fun'];

interface EventArenaProps {
  onRegisterClick?: () => void;
}

export const EventArena = ({ onRegisterClick }: EventArenaProps) => {
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filteredEvents = filter === 'All' 
    ? eventsData 
    : eventsData.filter(e => e.category === filter);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedEvent]);

  return (
    <section id="events" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ color: '#00f0ff', fontSize: '0.875rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>EVENT ARENA</span>
          <h2 className="section-title" style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Explore Events</h2>
          <p className="section-subtitle" style={{ color: '#a0a0b0', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            Discover the challenges and experiences waiting for you.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: `1px solid ${filter === cat ? '#00f0ff' : 'rgba(255,255,255,0.2)'}`,
                backgroundColor: filter === cat ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                color: filter === cat ? '#00f0ff' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 600
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredEvents.map(ev => (
            <div 
              key={ev.id} 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, borderColor 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onClick={() => setSelectedEvent(ev)}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00f0ff'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <img src={ev.poster} alt={ev.title} style={{ width: '100%', height: '350px', objectFit: 'contain', marginBottom: '1.5rem', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '1rem' }} />
              <button style={{ color: '#00f0ff', backgroundColor: 'transparent', border: 'none', textAlign: 'center', fontWeight: 600, cursor: 'pointer', padding: 0 }}>View Details &rarr;</button>
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal — rendered via portal at body level */}
      {mounted && selectedEvent && createPortal(
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          overflowY: 'auto',
        }}
        onClick={() => setSelectedEvent(null)}
        >
          <div 
            style={{
              backgroundColor: '#050510',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '16px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '90vh',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,240,255,0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '50%', padding: '0.5rem', zIndex: 10 }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Poster Left Side */}
            <div style={{ flex: '1 1 350px', minHeight: '250px', position: 'relative', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <img 
                src={selectedEvent.poster} 
                alt={selectedEvent.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0, padding: '2rem' }} 
              />
            </div>

            {/* Content Right Side */}
            <div style={{ flex: '2 1 450px', padding: '3rem', maxHeight: '90vh', overflowY: 'auto' }} className="custom-scrollbar">
              <span style={{ color: '#b966ff', fontSize: '0.875rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{selectedEvent.category}</span>
              <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 800 }}>{selectedEvent.title}</h2>
              <p style={{ color: '#a0a0b0', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>{selectedEvent.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Calendar className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Date</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.date}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Clock className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Time</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.time}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <MapPin className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Venue</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.venue}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Users className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Team Size</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.team}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <IndianRupee className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Registration Fee</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.fee}</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Trophy className="w-6 h-6" style={{ color: '#00f0ff', marginTop: '0.2rem' }} />
                <div><div style={{ color: '#a0a0b0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Prize Pool</div><div style={{ color: '#fff', fontWeight: 600, fontSize: '1.125rem' }}>{selectedEvent.prize}</div></div>
              </div>
            </div>

            <div style={{ marginBottom: '3rem', backgroundColor: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>Rules</h4>
              <ul style={{ color: '#a0a0b0', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                {selectedEvent.rules.map((rule, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{rule}</li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', display: 'inline-block' }}
                onClick={() => {
                  setSelectedEvent(null);
                  if (onRegisterClick) onRegisterClick();
                }}
              >
                REGISTER
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
