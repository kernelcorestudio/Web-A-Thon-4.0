import React from 'react';

const speakersData = [
  {
    name: 'Alex Chen',
    designation: 'Senior AI Engineer',
    organization: 'Zeopto',
    bio: 'Leading research in generative models and scalable AI architectures. Passionate about ethical AI.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', // Demo Image
    objectPosition: 'top'
  },
  {
    name: 'Sarah Jenkins',
    designation: 'UX Director',
    organization: 'TechCorp',
    bio: 'Creating human-centered digital experiences for over 15 years. Expert in accessibility and interaction design.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', // Demo Image
    objectPosition: 'top'
  },
  {
    name: 'David Park',
    designation: 'Lead Security Analyst',
    organization: 'CloudNova',
    bio: 'Specializes in cloud infrastructure security and threat intelligence. Regular CTF champion.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', // Demo Image
    objectPosition: 'top'
  },
  {
    name: 'Maya Lin',
    designation: 'Game Developer',
    organization: 'HackNest',
    bio: 'Building immersive 3D worlds and scalable multiplayer architectures. Advocate for diversity in tech.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', // Demo Image
    objectPosition: 'center 40%'
  }
];

export const Speakers = () => {
  return (
    <section id="speakers" style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag" style={{ color: '#00f0ff', fontSize: '0.875rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', fontWeight: 600 }}>GUEST PROFILES</span>
          <h2 className="section-title" style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 800 }}>Featured Speakers</h2>
          <p className="section-subtitle" style={{ color: '#a0a0b0', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            Learn from industry leaders and innovators shaping the future of technology.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {speakersData.map((speaker, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, borderColor 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = '#00f0ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Image Container */}
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src={speaker.photo} 
                  alt={speaker.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: speaker.objectPosition, filter: 'grayscale(30%)', transition: 'filter 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(30%)'}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{speaker.name}</h3>
                <div style={{ color: '#00f0ff', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{speaker.designation}</div>
                <div style={{ color: '#b966ff', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>@ {speaker.organization}</div>
                <p style={{ color: '#a0a0b0', fontSize: '0.875rem', lineHeight: '1.6' }}>{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
