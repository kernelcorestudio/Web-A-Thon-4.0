'use client';

import React from 'react';
import { Trophy, Timer, Users, Flame } from 'lucide-react';

export default function HighlightsMarquee() {
  const stats = [
    {
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      value: '₹5 Lakh+',
      label: 'Prizes & Grants',
    },
    {
      icon: <Timer className="w-6 h-6 text-cyan-400" />,
      value: '48 Hours',
      label: 'Intense Hackathon',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      value: '3,000+',
      label: 'Developers & Designers',
    },
    {
      icon: <Flame className="w-6 h-6 text-emerald-400" />,
      value: '25+ Events',
      label: 'Tech & Coding Tracks',
    },
  ];

  return (
    <section id="highlights" className="metrics-marquee-section">
      <div className="container">
        <div className="marquee-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
