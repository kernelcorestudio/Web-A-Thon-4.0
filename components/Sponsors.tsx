import { FC } from 'react';

export const Sponsors: FC = () => {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">OUR BACKERS</span>
          <h2 className="section-title">Sponsor Wall</h2>
          <p className="section-subtitle">Powering the future of innovation with our amazing partners.</p>
        </div>

        <div className="sponsors-tier">
          <h3 className="tier-title title-sponsor-glow">TITLE SPONSOR</h3>
          <div className="sponsors-grid tier-1">
            <div className="sponsor-card"><span>TechCorp</span></div>
            <div className="sponsor-card"><span>Zeopto</span></div>
          </div>
        </div>

        <div className="sponsors-tier">
          <h3 className="tier-title gold-sponsor-glow">GOLD SPONSORS</h3>
          <div className="sponsors-grid tier-2">
            <div className="sponsor-card"><span>DevLabs</span></div>
            <div className="sponsor-card"><span>CloudNova</span></div>
            <div className="sponsor-card"><span>.xyz</span></div>
            <div className="sponsor-card"><span>lovable.Ai</span></div>
            <div className="sponsor-card"><span>HackNest</span></div>
          </div>
        </div>

        <div className="sponsors-tier">
          <h3 className="tier-title">COMMUNITY PARTNERS</h3>
          <div className="sponsors-grid tier-3">
            <div className="sponsor-card"><span>GitHub Community</span></div>
            <div className="sponsor-card"><span>GDG</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
