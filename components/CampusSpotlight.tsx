'use client';

import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

interface CampusSpotlightProps {
  onOpenVideo: () => void;
}

export default function CampusSpotlight({ onOpenVideo }: CampusSpotlightProps) {
  return (
    <section id="campus-video" className="campus-video-section">
      <div className="container">
        <div className="video-banner-box">
          <div className="video-info-side">
            <span className="section-tag">GEHU CAMPUS SPOTLIGHT</span>
            <h3>Experience The Energy of NIRVAN &apos;26</h3>
            <p>
              Watch the official aerial showcase and campus energy from{' '}
              <a 
                href="https://maps.app.goo.gl/eotZBsqwYr7ZW8Kr7" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'underline', fontWeight: 'bold' }}
              >
                Graphic Era Hill University <ArrowUpRight className="w-4 h-4" />
              </a>
              .
              Get ready for an electrifying weekend of hackathons, workshops, keynote panels, esports, and tech innovation.
            </p>
            <button className="btn-primary open-video-btn" onClick={onOpenVideo}>
              <Play className="w-4 h-4 fill-current" />
              <span>LAUNCH CINEMA PREVIEW</span>
            </button>
          </div>

          <div className="video-player-preview" onClick={onOpenVideo}>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/Drone.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay-play">
              <div className="big-play-btn">
                <Play className="w-7 h-7 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
