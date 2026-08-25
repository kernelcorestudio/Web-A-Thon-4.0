'use client';

import React, { useState } from 'react';

const scheduleData = {
  day1: [
    { time: '09:00 AM', event: 'Opening Ceremony', venue: 'Main Auditorium', type: 'general' },
    { time: '10:00 AM', event: 'CTF (Capture The Flag)', venue: 'Lab 1', type: 'competition' },
    { time: '11:00 AM', event: 'Treasure Hunt', venue: 'Open Ground', type: 'competition' },
    { time: '01:00 PM', event: 'Lunch Break', venue: 'Food Court', type: 'break' },
    { time: '02:00 PM', event: 'HackSprint Begins (Hackathon)', venue: 'Innovation Lab', type: 'competition' },
    { time: '04:00 PM', event: 'E Sports Qualifiers', venue: 'Seminar Hall', type: 'competition' },
  ],
  day2: [
    { time: '09:00 AM', event: 'Hackathon Continuation', venue: 'Innovation Lab', type: 'competition' },
    { time: '10:00 AM', event: 'Tech Workshop', venue: 'Seminar Hall', type: 'workshop' },
    { time: '01:00 PM', event: 'Lunch Break', venue: 'Food Court', type: 'break' },
    { time: '02:00 PM', event: 'E Sports Finals', venue: 'Seminar Hall', type: 'competition' },
    { time: '05:00 PM', event: 'Hackathon Pitches', venue: 'Main Auditorium', type: 'competition' },
    { time: '07:00 PM', event: 'Closing Ceremony & Prize Distribution', venue: 'Main Auditorium', type: 'general' },
  ]
};

export const Schedule = () => {
  const [activeTab, setActiveTab] = useState<'day1' | 'day2'>('day1');

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'general': return '#b966ff'; // Purple
      case 'competition': return '#00f0ff'; // Cyan
      case 'workshop': return '#ff3366'; // Pink
      case 'break': return '#a0a0b0'; // Gray
      default: return '#fff';
    }
  };

  return (
    <section id="schedule" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ color: '#00f0ff', fontSize: '0.875rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>TIMELINE</span>
          <h2 className="section-title" style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Schedule</h2>
          <p className="section-subtitle" style={{ color: '#a0a0b0', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            Plan your days at NIRVAN &apos;26.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <button 
            onClick={() => setActiveTab('day1')}
            style={{
              padding: '1rem 3rem',
              backgroundColor: activeTab === 'day1' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              border: `1px solid ${activeTab === 'day1' ? '#00f0ff' : 'rgba(255,255,255,0.2)'}`,
              color: activeTab === 'day1' ? '#00f0ff' : '#fff',
              fontSize: '1.25rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '8px'
            }}
          >
            Day 1<br/><span style={{ fontSize: '0.875rem', fontWeight: 400, opacity: 0.8 }}>12 Oct 2026</span>
          </button>
          <button 
            onClick={() => setActiveTab('day2')}
            style={{
              padding: '1rem 3rem',
              backgroundColor: activeTab === 'day2' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              border: `1px solid ${activeTab === 'day2' ? '#00f0ff' : 'rgba(255,255,255,0.2)'}`,
              color: activeTab === 'day2' ? '#00f0ff' : '#fff',
              fontSize: '1.25rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '8px'
            }}
          >
            Day 2<br/><span style={{ fontSize: '0.875rem', fontWeight: 400, opacity: 0.8 }}>13 Oct 2026</span>
          </button>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '50px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {scheduleData[activeTab].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative' }}>
                {/* Time bubble */}
                <div style={{ 
                  width: '100px', 
                  flexShrink: 0, 
                  textAlign: 'right', 
                  color: getTypeColor(item.type),
                  fontWeight: 700,
                  fontSize: '1.125rem'
                }}>
                  {item.time}
                </div>

                {/* Dot */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getTypeColor(item.type),
                  position: 'absolute',
                  left: '45px', // 50px line - half dot width
                  boxShadow: `0 0 10px ${getTypeColor(item.type)}`
                }}></div>

                {/* Card */}
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem 2rem',
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backdropFilter: 'blur(5px)',
                  transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.event}</h3>
                    <div style={{ color: '#a0a0b0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.venue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
