'use client';

import React, { useRef } from 'react';
import {
  BrainCircuit,
  ShieldCheck,
  Blocks,
  Layout,
  Bot,
  Rocket,
} from 'lucide-react';

interface TrackItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

const tracksData: TrackItem[] = [
  {
    id: 1,
    icon: <BrainCircuit className="w-7 h-7 text-cyan-400" />,
    title: 'AI & Autonomous Agents',
    desc: 'Pioneer LLM workflows, generative models, autonomous agent networks, and predictive computer vision systems.',
    tags: ['LLMs', 'Deep Learning', 'Agents'],
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-7 h-7 text-purple-400" />,
    title: 'Cyber Security & CTF',
    desc: 'High-stakes offensive & defensive cryptography, vulnerability assessment, ethical hacking, and network forensics.',
    tags: ['CTF', 'Zero-Trust', 'Cryptanalysis'],
  },
  {
    id: 3,
    icon: <Blocks className="w-7 h-7 text-amber-400" />,
    title: 'Web 3.0 & Decentralized',
    desc: 'Architect scalable dApps, zero-knowledge verification, tokenomics, and next-gen blockchain infrastructure.',
    tags: ['Smart Contracts', 'ZK-Proofs', 'DeFi'],
  },
  {
    id: 4,
    icon: <Layout className="w-7 h-7 text-cyan-400" />,
    title: 'UI/UX & Creative Tech',
    desc: 'Craft immersive spatial interfaces, dynamic 3D web experiences, fluid micro-interactions, and design systems.',
    tags: ['Spatial UI', 'Design Systems', 'WebGL'],
  },
  {
    id: 5,
    icon: <Bot className="w-7 h-7 text-emerald-400" />,
    title: 'Robotics & Edge IoT',
    desc: 'Integrate intelligent microcontrollers, autonomous drones, smart edge sensor arrays, and embedded hardware.',
    tags: ['Edge AI', 'Drones', 'Embedded'],
  },
  {
    id: 6,
    icon: <Rocket className="w-7 h-7 text-purple-400" />,
    title: 'Open Moonshot Innovation',
    desc: 'Unconstrained wildcard track for revolutionary student concepts in fintech, climate tech, health, and social impact.',
    tags: ['Moonshot', 'Social Impact', 'Wildcard'],
  },
];

function TrackCard({ track }: { track: TrackItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className="track-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="track-icon-badge">{track.icon}</div>
      <h3 className="track-title">{track.title}</h3>
      <p className="track-desc">{track.desc}</p>
      <div className="track-tags">
        {track.tags.map((tag, idx) => (
          <span key={idx} className="track-tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="tracks-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">COMPETITION TRACKS</span>
          <h2 className="section-title">Where Ideas Become Innovations</h2>
          <p className="section-subtitle">
            Choose your battleground and build cutting-edge solutions across 6 future-ready domains.
          </p>
        </div>

        <div className="tracks-grid">
          {tracksData.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
