'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '@/lib/audio';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    track: 'AI & Autonomous Agents',
    role: 'Developer',
  });

  const [generatedPass, setGeneratedPass] = useState<{
    name: string;
    college: string;
    track: string;
    role: string;
    passId: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      soundFX.playWarp();
    } else {
      setGeneratedPass(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackShort = formData.track.slice(0, 3).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const passId = `NIRVAN26-${randomCode}-${trackShort}`;

    setGeneratedPass({
      name: formData.name.trim() || 'Innovator',
      college: formData.college.trim() || 'GEHU Campus, Dehradun',
      track: formData.track,
      role: formData.role,
      passId: `#${passId}`,
    });

    soundFX.playSuccess();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#ffb800', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    soundFX.playSuccess();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div id="register-modal" className="modal-backdrop active" onClick={handleBackdropClick}>
      <div className="modal-dialog">
        <button id="register-modal-close" className="modal-close-btn" onClick={handleClose} aria-label="Close Register Modal">
          <X className="w-5 h-5" />
        </button>

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff' }}>
            NIRVAN &apos;26 HACKER PASS
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Generate your official digital attendee holographic pass for GEHU Campus.
          </p>
        </div>

        {!generatedPass ? (
          /* Form */
          <form id="hacker-pass-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input
                type="text"
                id="reg-name"
                className="form-input"
                placeholder="e.g. Alex Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email Address</label>
                <input
                  type="email"
                  id="reg-email"
                  className="form-input"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-college">College / Institution</label>
                <input
                  type="text"
                  id="reg-college"
                  className="form-input"
                  placeholder="e.g. GEHU Campus, Dehradun"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-track">Preferred Track</label>
                <select
                  id="reg-track"
                  className="form-select"
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                >
                  <option value="AI & Autonomous Agents">AI &amp; Autonomous Agents</option>
                  <option value="Cyber Security & CTF">Cyber Security &amp; CTF</option>
                  <option value="Web 3.0 & Decentralized">Web 3.0 &amp; Decentralized</option>
                  <option value="UI/UX & Creative Tech">UI/UX &amp; Creative Tech</option>
                  <option value="Robotics & Edge IoT">Robotics &amp; Edge IoT</option>
                  <option value="Open Moonshot">Open Moonshot</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-role">Role</label>
                <select
                  id="reg-role"
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Developer">Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Innovator / Founder">Innovator / Founder</option>
                  <option value="Student Attendee">Student Attendee</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
            >
              <span>GENERATE HOLOGRAPHIC PASS</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Generated Pass Preview */
          <div id="generated-pass-container" className="generated-pass-container" style={{ display: 'block' }}>
            <div className="holo-ticket-card">
              <div className="ticket-header">
                <div>
                  <div className="ticket-event-name">NIRVAN &apos;26</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-cyan)', fontFamily: 'var(--font-mono)' }}>
                    GEHU CAMPUS • DEHRADUN
                  </div>
                </div>
                <div id="pass-user-role" className="ticket-badge-tag">
                  {generatedPass.role.toUpperCase()}
                </div>
              </div>

              <div className="ticket-body-grid">
                <div>
                  <div id="pass-user-name" className="ticket-user-name">
                    {generatedPass.name}
                  </div>
                  <div id="pass-user-college" className="ticket-user-meta">
                    {generatedPass.college}
                  </div>
                  <div
                    id="pass-user-track"
                    className="ticket-user-meta"
                    style={{ color: 'var(--cyan-core)', marginTop: 4 }}
                  >
                    Track: {generatedPass.track}
                  </div>
                  <div
                    id="pass-serial-id"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginTop: 8,
                    }}
                  >
                    PASS ID: {generatedPass.passId}
                  </div>
                </div>

                <div className="ticket-qr-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="3" height="3"></rect>
                    <rect x="18" y="18" width="3" height="3"></rect>
                    <rect x="14" y="18" width="3" height="3"></rect>
                    <rect x="18" y="14" width="3" height="3"></rect>
                  </svg>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
              <button id="download-pass-btn" className="btn-primary" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                <span>PRINT / SAVE PASS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
