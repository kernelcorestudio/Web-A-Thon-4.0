'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, UserPlus, Users, User, Trash2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '@/lib/audio';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemberData {
  name: string;
  email: string;
  phone: string;
}

const emptyMember = (): MemberData => ({ name: '', email: '', phone: '' });

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [mode, setMode] = useState<'individual' | 'team'>('individual');
  const [submitted, setSubmitted] = useState(false);

  // Individual fields
  const [individual, setIndividual] = useState<MemberData & { college: string }>(
    { name: '', email: '', phone: '', college: '' }
  );

  // Team fields
  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState<MemberData & { college: string }>(
    { name: '', email: '', phone: '', college: '' }
  );
  const [members, setMembers] = useState<MemberData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) soundFX.playWarp();
    else { setSubmitted(false); setErrors({}); }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone.replace(/\s/g, ''));
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'individual') {
      if (!individual.name.trim()) newErrors['ind_name'] = 'Name is required';
      if (!individual.email.trim()) newErrors['ind_email'] = 'Email is required';
      else if (!validateEmail(individual.email)) newErrors['ind_email'] = 'Must contain @';
      if (!individual.phone.trim()) newErrors['ind_phone'] = 'Phone is required';
      else if (!validatePhone(individual.phone)) newErrors['ind_phone'] = 'Must be 10 digits';
      if (!individual.college.trim()) newErrors['ind_college'] = 'College is required';
    } else {
      if (!teamName.trim()) newErrors['team_name'] = 'Team name is required';
      if (!leader.name.trim()) newErrors['lead_name'] = 'Name is required';
      if (!leader.email.trim()) newErrors['lead_email'] = 'Email is required';
      else if (!validateEmail(leader.email)) newErrors['lead_email'] = 'Must contain @';
      if (!leader.phone.trim()) newErrors['lead_phone'] = 'Phone is required';
      else if (!validatePhone(leader.phone)) newErrors['lead_phone'] = 'Must be 10 digits';
      if (!leader.college.trim()) newErrors['lead_college'] = 'College is required';

      members.forEach((m, i) => {
        if (!m.name.trim()) newErrors[`m${i}_name`] = 'Name is required';
        if (!m.email.trim()) newErrors[`m${i}_email`] = 'Email is required';
        else if (!validateEmail(m.email)) newErrors[`m${i}_email`] = 'Must contain @';
        if (!m.phone.trim()) newErrors[`m${i}_phone`] = 'Phone is required';
        else if (!validatePhone(m.phone)) newErrors[`m${i}_phone`] = 'Must be 10 digits';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    soundFX.playSuccess();
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#00f0ff', '#8b5cf6', '#ffb800', '#10b981'] });
    } catch { /* ignore */ }
  };

  const addMember = () => {
    if (members.length < 3) setMembers([...members, emptyMember()]);
  };

  const removeMember = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const updateMember = (idx: number, field: keyof MemberData, value: string) => {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: value };
    setMembers(updated);
  };

  if (!isOpen) return null;

  const inputStyle = (errKey: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(10,15,30,0.45)',
    backdropFilter: 'blur(8px)',
    border: `1px solid ${errors[errKey] ? '#ff3366' : 'rgba(0,240,255,0.25)'}`,
    borderRadius: 8,
    padding: '10px 14px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  const fieldStyle: React.CSSProperties = { marginBottom: 14 };

  const errStyle: React.CSSProperties = {
    color: '#ff3366',
    fontSize: '0.72rem',
    marginTop: 3,
    display: 'block',
  };

  const MemberField = ({ idx }: { idx: number }) => (
    <div style={{
      background: 'rgba(139,92,246,0.06)',
      border: '1px solid rgba(139,92,246,0.2)',
      borderRadius: 12,
      padding: '16px',
      marginBottom: 12,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Member {idx + 1}
        </span>
        <button type="button" onClick={() => removeMember(idx)} style={{
          background: 'rgba(255,51,102,0.15)', border: '1px solid rgba(255,51,102,0.3)',
          borderRadius: 6, padding: '4px 8px', color: '#ff3366', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Trash2 className="w-3 h-3" /> Remove
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Full Name *</label>
          <input type="text" style={inputStyle(`m${idx}_name`)} placeholder="Full name"
            value={members[idx].name} required
            onChange={e => updateMember(idx, 'name', e.target.value.replace(/[0-9]/g, ''))} />
          {errors[`m${idx}_name`] && <span style={errStyle}>{errors[`m${idx}_name`]}</span>}
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Phone *</label>
          <input type="tel" style={inputStyle(`m${idx}_phone`)} placeholder="10-digit number"
            value={members[idx].phone} required maxLength={10}
            onChange={e => updateMember(idx, 'phone', e.target.value.replace(/\D/g, ''))} />
          {errors[`m${idx}_phone`] && <span style={errStyle}>{errors[`m${idx}_phone`]}</span>}
        </div>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Email *</label>
        <input type="email" style={inputStyle(`m${idx}_email`)} placeholder="member@email.com"
          value={members[idx].email} required
          onChange={e => updateMember(idx, 'email', e.target.value)} />
        {errors[`m${idx}_email`] && <span style={errStyle}>{errors[`m${idx}_email`]}</span>}
      </div>
    </div>
  );

  return (
    <div id="register-modal" onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}>
      <div style={{
        backgroundImage: 'linear-gradient(135deg, rgba(5,8,20,0.72) 0%, rgba(10,5,25,0.76) 100%), url(/form_bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'local',
        border: '1px solid rgba(0,240,255,0.25)',
        borderRadius: 20,
        width: '100%',
        maxWidth: 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 0 60px rgba(0,240,255,0.15), 0 30px 60px rgba(0,0,0,0.7)',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 2,
        }}><X className="w-4 h-4" /></button>

        {/* Content above overlay */}
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#00f0ff', letterSpacing: '0.15em', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' }}>
            NIRVAN &apos;26 — GEHU CAMPUS
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', fontWeight: 800 }}>
            REGISTER NOW
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>
            Secure your spot at the biggest tech fest of the year.
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
            }}>
              <CheckCircle style={{ width: 40, height: 40, color: '#10b981' }} />
            </div>
            <h4 style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Registration Successful!</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {mode === 'team'
                ? `Team "${teamName}" is registered. We'll reach out to ${leader.email}.`
                : `You're registered! We'll reach out at ${individual.email}.`}
            </p>
            <button onClick={onClose} className="btn-primary" style={{ margin: '0 auto' }}>CLOSE</button>
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4 }}>
              {(['individual', 'team'] as const).map(m => (
                <button key={m} type="button" onClick={() => { setMode(m); setErrors({}); }}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    background: mode === m ? 'linear-gradient(135deg, var(--cyan-core), #00a6ff)' : 'transparent',
                    color: mode === m ? '#030814' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                  {m === 'individual' ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                  {m === 'individual' ? 'Individual' : 'Team'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {mode === 'individual' ? (
                /* ── INDIVIDUAL ── */
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" style={inputStyle('ind_name')} placeholder="Your full name"
                        value={individual.name} required
                        onChange={e => setIndividual({ ...individual, name: e.target.value.replace(/[0-9]/g, '') })} />
                      {errors.ind_name && <span style={errStyle}>{errors.ind_name}</span>}
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Phone *</label>
                      <input type="tel" style={inputStyle('ind_phone')} placeholder="10-digit number"
                        value={individual.phone} maxLength={10} required
                        onChange={e => setIndividual({ ...individual, phone: e.target.value.replace(/\D/g, '') })} />
                      {errors.ind_phone && <span style={errStyle}>{errors.ind_phone}</span>}
                    </div>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" style={inputStyle('ind_email')} placeholder="you@email.com"
                      value={individual.email} required
                      onChange={e => setIndividual({ ...individual, email: e.target.value })} />
                    {errors.ind_email && <span style={errStyle}>{errors.ind_email}</span>}
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>College / Institution *</label>
                    <input type="text" style={inputStyle('ind_college')} placeholder="e.g. GEHU Campus, Dehradun"
                      value={individual.college} required
                      onChange={e => setIndividual({ ...individual, college: e.target.value })} />
                    {errors.ind_college && <span style={errStyle}>{errors.ind_college}</span>}
                  </div>
                </>
              ) : (
                /* ── TEAM ── */
                <>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Team Name *</label>
                    <input type="text" style={inputStyle('team_name')} placeholder="e.g. Team Nexus"
                      value={teamName} required
                      onChange={e => setTeamName(e.target.value)} />
                    {errors.team_name && <span style={errStyle}>{errors.team_name}</span>}
                  </div>

                  <div style={{
                    background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.15)',
                    borderRadius: 12, padding: 16, marginBottom: 14,
                  }}>
                    <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                      👑 Team Leader
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Full Name *</label>
                        <input type="text" style={inputStyle('lead_name')} placeholder="Leader's full name"
                          value={leader.name} required
                          onChange={e => setLeader({ ...leader, name: e.target.value.replace(/[0-9]/g, '') })} />
                        {errors.lead_name && <span style={errStyle}>{errors.lead_name}</span>}
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Phone *</label>
                        <input type="tel" style={inputStyle('lead_phone')} placeholder="10-digit number"
                          value={leader.phone} maxLength={10} required
                          onChange={e => setLeader({ ...leader, phone: e.target.value.replace(/\D/g, '') })} />
                        {errors.lead_phone && <span style={errStyle}>{errors.lead_phone}</span>}
                      </div>
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" style={inputStyle('lead_email')} placeholder="leader@email.com"
                        value={leader.email} required
                        onChange={e => setLeader({ ...leader, email: e.target.value })} />
                      {errors.lead_email && <span style={errStyle}>{errors.lead_email}</span>}
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>College / Institution *</label>
                      <input type="text" style={inputStyle('lead_college')} placeholder="e.g. GEHU Campus, Dehradun"
                        value={leader.college} required
                        onChange={e => setLeader({ ...leader, college: e.target.value })} />
                      {errors.lead_college && <span style={errStyle}>{errors.lead_college}</span>}
                    </div>
                  </div>

                  {/* Team Members */}
                  {members.map((_, idx) => <MemberField key={idx} idx={idx} />)}

                  {members.length < 3 && (
                    <button type="button" onClick={addMember}
                      style={{
                        width: '100%', padding: '10px', marginBottom: 14,
                        background: 'rgba(139,92,246,0.1)', border: '1px dashed rgba(139,92,246,0.4)',
                        borderRadius: 10, color: '#a78bfa', fontWeight: 600, fontSize: '0.85rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s ease',
                      }}>
                      <UserPlus className="w-4 h-4" />
                      Add Member ({members.length + 1}/3 added · max 4 total)
                    </button>
                  )}
                </>
              )}

              <button type="submit" className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                <Sparkles className="w-4 h-4" />
                <span>REGISTER FOR NIRVAN &apos;26</span>
              </button>
            </form>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
