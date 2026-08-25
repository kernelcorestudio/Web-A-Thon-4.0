'use client';

import React, { FC } from 'react';
import { Crown, Gem, Rocket, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundFX } from '@/lib/audio';

export const Sponsors: FC = () => {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag" style={{ color: '#00f0ff', fontSize: '0.875rem', letterSpacing: '3px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            <Sparkles className="w-4 h-4" />
            STRATEGIC ALLIANCES
          </span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', color: '#ffffff', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '1px', marginBottom: '1rem' }}>
            Sponsor Wall
          </h2>
          <p className="section-subtitle" style={{ color: '#94a3b8', maxWidth: '720px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
            Powering the future of innovation with our industry-leading technology partners and community backers.
          </p>
        </div>

        {/* TIER 1: TITLE SPONSORS */}
        <div className="sponsors-tier-wrapper">
          <div className="tier-badge-divider">
            <div className="tier-pill-badge title-tier">
              <Crown className="w-4 h-4" />
              <span>TITLE SPONSORS</span>
            </div>
          </div>

          <div className="title-sponsors-grid">
            {/* TechCorp */}
            <div className="sponsor-detail-card title-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h3 className="sponsor-brand-title title-techcorp">TechCorp</h3>
                <span className="sponsor-tier-tag title-tag">LEAD PARTNER</span>
              </div>
              <p className="sponsor-desc">
                Global pioneer in enterprise cloud, AI infrastructure, and next-generation cognitive computing solutions.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text">₹50K Hackathon Grant + Direct Interview Tracks</span>
                <a href="https://techcorp.com" target="_blank" rel="noopener noreferrer" className="sponsor-visit-link" onClick={() => soundFX.playClick()}>
                  <span>Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Zeopto */}
            <div className="sponsor-detail-card title-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h3 className="sponsor-brand-title title-zeopto">Zeopto</h3>
                <span className="sponsor-tier-tag title-tag">LEAD PARTNER</span>
              </div>
              <p className="sponsor-desc">
                Next-generation quantum-resistant cryptography and high-frequency network engineering.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text">Lead Hardware Sponsor & Cloud Compute Partner</span>
                <a href="https://zeopto.com" target="_blank" rel="noopener noreferrer" className="sponsor-visit-link" onClick={() => soundFX.playClick()}>
                  <span>Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TIER 2: GOLD SPONSORS */}
        <div className="sponsors-tier-wrapper" style={{ marginTop: '4rem' }}>
          <div className="tier-badge-divider">
            <div className="tier-pill-badge gold-tier">
              <Gem className="w-4 h-4" />
              <span>GOLD SPONSORS</span>
            </div>
          </div>

          <div className="gold-sponsors-grid">
            {/* DevLabs */}
            <div className="sponsor-detail-card gold-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h4 className="gold-brand-title">DevLabs</h4>
                <span className="sponsor-tier-tag gold-tag">GOLD</span>
              </div>
              <p className="sponsor-desc-small">
                Empowering software engineering teams with intelligent developer toolchains and CI/CD automation.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text-small">Developer Swags + API Credit Vouchers</span>
                <a href="https://devlabs.io" target="_blank" rel="noopener noreferrer" className="gold-arrow-link" onClick={() => soundFX.playClick()}>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CloudNova */}
            <div className="sponsor-detail-card gold-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h4 className="gold-brand-title">CloudNova</h4>
                <span className="sponsor-tier-tag gold-tag">GOLD</span>
              </div>
              <p className="sponsor-desc-small">
                Serverless cloud hosting platform engineered for ultra-fast edge deployments and real-time state sync.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text-small">$5,000 Edge Compute Credits for All Teams</span>
                <a href="https://cloudnova.io" target="_blank" rel="noopener noreferrer" className="gold-arrow-link" onClick={() => soundFX.playClick()}>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* lovable.Ai */}
            <div className="sponsor-detail-card gold-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h4 className="gold-brand-title">lovable.Ai</h4>
                <span className="sponsor-tier-tag gold-tag">GOLD</span>
              </div>
              <p className="sponsor-desc-small">
                Fullstack AI building engine that turns ideas and designs into production-ready software in seconds.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text-small">AI Pro Subscriptions & Fast Prototype Grants</span>
                <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="gold-arrow-link" onClick={() => soundFX.playClick()}>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* HackNest */}
            <div className="sponsor-detail-card gold-card" onMouseEnter={() => soundFX.playHover()}>
              <div className="sponsor-card-top">
                <h4 className="gold-brand-title">HackNest</h4>
                <span className="sponsor-tier-tag gold-tag">GOLD</span>
              </div>
              <p className="sponsor-desc-small">
                Premier hackathon incubator and community platform connecting elite student builders with angel investors.
              </p>
              <div className="sponsor-card-bottom">
                <span className="sponsor-perk-text-small">Incubation Grant & Demo Day Showcase</span>
                <a href="https://hacknest.com" target="_blank" rel="noopener noreferrer" className="gold-arrow-link" onClick={() => soundFX.playClick()}>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TIER 3: COMMUNITY PARTNERS */}
        <div className="sponsors-tier-wrapper" style={{ marginTop: '4rem' }}>
          <div className="tier-badge-divider">
            <div className="tier-pill-badge community-tier">
              <Rocket className="w-4 h-4" />
              <span>COMMUNITY PARTNERS</span>
            </div>
          </div>

          <div className="community-sponsors-grid">
            {/* GitHub Community */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="community-partner-card" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>
              <div className="community-info">
                <h4 className="community-title">GitHub Community</h4>
                <p className="community-subtext">GitHub Pro Packs + Octocat Swag Packs</p>
              </div>
              <div className="community-icon-box">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>

            {/* Google Developer Groups (GDG) */}
            <a href="https://developers.google.com/community/gdg" target="_blank" rel="noopener noreferrer" className="community-partner-card" onMouseEnter={() => soundFX.playHover()} onClick={() => soundFX.playClick()}>
              <div className="community-info">
                <h4 className="community-title">Google Developer Groups (GDG)</h4>
                <p className="community-subtext">Workshop Mentorship & Community Badges</p>
              </div>
              <div className="community-icon-box">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
