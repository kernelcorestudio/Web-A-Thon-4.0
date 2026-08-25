'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Download, User, Mail, Building2, MapPin, Users, Plus, Trash2, IdCard, CalendarDays, GraduationCap, ChevronDown, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '@/lib/audio';
import { motion, AnimatePresence } from 'framer-motion';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomSelect = ({ value, onChange, options, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((o: any) => o.value === value)?.label || 'Select Campus';

  return (
    <div className="input-icon-wrapper" style={{ position: 'relative' }} tabIndex={0} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
    }}>
      {Icon && <Icon className="input-icon" />}
      <div 
        className="form-input with-icon" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingRight: '12px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ color: value ? 'var(--text-primary)' : 'var(--text-muted)' }}>{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 text-muted" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="custom-select-dropdown"
          >
            {options.map((opt: any) => (
              <div 
                key={opt.value}
                className="custom-select-option"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type RegType = 'individual' | 'team';

interface MemberData {
  name: string;
  course: string;
  campus: string;
  studentId: string;
  yearSem: string;
}

const initialMember: MemberData = {
  name: '',
  course: '',
  campus: 'Bhimtal',
  studentId: '',
  yearSem: '',
};

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [regType, setRegType] = useState<RegType>('individual');

  const [indData, setIndData] = useState({
    ...initialMember,
    email: '',
  });

  const [teamData, setTeamData] = useState({
    teamName: '',
    email: '',
    contact: '',
    members: [{ ...initialMember }],
  });

  const [generatedPass, setGeneratedPass] = useState<{
    passId: string;
    isTeam: boolean;
    primaryName: string;
    campus: string;
    teamSize?: number;
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

  const membersEndRef = React.useRef<HTMLDivElement>(null);

  const handleAddMember = () => {
    if (teamData.members.length < 4) {
      setTeamData({
        ...teamData,
        members: [...teamData.members, { ...initialMember }],
      });
      setTimeout(() => {
        membersEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleRemoveMember = (index: number) => {
    if (teamData.members.length > 1) {
      const newMembers = [...teamData.members];
      newMembers.splice(index, 1);
      setTeamData({ ...teamData, members: newMembers });
    }
  };

  const handleMemberChange = (index: number, field: keyof MemberData, value: string) => {
    const newMembers = [...teamData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTeamData({ ...teamData, members: newMembers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const passId = `NIRVAN26-${randomCode}`;

    if (regType === 'individual') {
      setGeneratedPass({
        passId: `#${passId}`,
        isTeam: false,
        primaryName: indData.name.trim() || 'Innovator',
        campus: indData.campus,
      });
    } else {
      setGeneratedPass({
        passId: `#${passId}`,
        isTeam: true,
        primaryName: teamData.teamName.trim() || 'Awesome Team',
        campus: teamData.members[0].campus,
        teamSize: teamData.members.length,
      });
    }

    soundFX.playSuccess();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div 
            className="modal-dialog premium-modal"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="modal-close-btn" onClick={handleClose} aria-label="Close Register Modal">
              <X className="w-5 h-5" />
            </button>

            <div className="modal-header">
              <h3 className="modal-title">
                NIRVAN &apos;26 HACKER PASS
              </h3>
              <p className="modal-subtitle">
                Generate your official digital attendee holographic pass for GEHU Campus.
              </p>
            </div>

            {!generatedPass ? (
              <>
                <div className="reg-type-toggle">
                  <button 
                    className={`toggle-btn ${regType === 'individual' ? 'active' : ''}`}
                    onClick={() => setRegType('individual')}
                  >
                    <User className="w-4 h-4 mr-2" /> Individual
                  </button>
                  <button 
                    className={`toggle-btn ${regType === 'team' ? 'active' : ''}`}
                    onClick={() => setRegType('team')}
                  >
                    <Users className="w-4 h-4 mr-2" /> Team
                  </button>
                </div>

                <form id="hacker-pass-form" onSubmit={handleSubmit}>
                  
                  {regType === 'individual' ? (
                    /* INDIVIDUAL FORM */
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <div className="form-group premium-input-group">
                        <label className="form-label" htmlFor="ind-name">Full Name</label>
                        <div className="input-icon-wrapper">
                          <User className="input-icon" />
                          <input type="text" id="ind-name" className="form-input with-icon" placeholder="e.g. Alex Sharma" value={indData.name} onChange={(e) => setIndData({ ...indData, name: e.target.value.replace(/[^A-Za-z\s]/g, '') })} required />
                        </div>
                      </div>

                      <div className="form-group premium-input-group">
                        <label className="form-label" htmlFor="ind-email">Email Address</label>
                        <div className="input-icon-wrapper">
                          <Mail className="input-icon" />
                          <input type="email" id="ind-email" className="form-input with-icon" placeholder="alex@domain.com" value={indData.email} onChange={(e) => setIndData({ ...indData, email: e.target.value })} required />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="ind-course">Course</label>
                          <div className="input-icon-wrapper">
                            <GraduationCap className="input-icon" />
                            <input type="text" id="ind-course" className="form-input with-icon" placeholder="e.g. B.Tech CSE" value={indData.course} onChange={(e) => setIndData({ ...indData, course: e.target.value })} required />
                          </div>
                        </div>
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="ind-campus">Campus</label>
                          <CustomSelect 
                            value={indData.campus} 
                            onChange={(val: string) => setIndData({ ...indData, campus: val })}
                            options={[
                              { value: 'Bhimtal', label: 'GEHU, Bhimtal' },
                              { value: 'Haldwani', label: 'GEU, Haldwani' }
                            ]}
                            icon={Building2}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="ind-studentid">Student ID</label>
                          <div className="input-icon-wrapper">
                            <IdCard className="input-icon" />
                            <input type="text" id="ind-studentid" className="form-input with-icon" placeholder="e.g. 20011XXX" value={indData.studentId} onChange={(e) => setIndData({ ...indData, studentId: e.target.value })} required />
                          </div>
                        </div>
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="ind-year">Year / Sem</label>
                          <div className="input-icon-wrapper">
                            <CalendarDays className="input-icon" />
                            <input type="text" id="ind-year" className="form-input with-icon" placeholder="e.g. 3rd Year / 5th Sem" value={indData.yearSem} onChange={(e) => setIndData({ ...indData, yearSem: e.target.value })} required />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* TEAM FORM */
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="form-grid-2">
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="team-name">Team Name</label>
                          <div className="input-icon-wrapper">
                            <Users className="input-icon" />
                            <input type="text" id="team-name" className="form-input with-icon" placeholder="e.g. Cyber Squad" value={teamData.teamName} onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })} required />
                          </div>
                        </div>
                        <div className="form-group premium-input-group">
                          <label className="form-label" htmlFor="team-email">Team Email (Leader)</label>
                          <div className="input-icon-wrapper">
                            <Mail className="input-icon" />
                            <input type="email" id="team-email" className="form-input with-icon" placeholder="team@domain.com" value={teamData.email} onChange={(e) => setTeamData({ ...teamData, email: e.target.value })} required />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-group premium-input-group">
                        <label className="form-label" htmlFor="team-contact">Team Contact No (Leader)</label>
                        <div className="input-icon-wrapper">
                          <Phone className="input-icon" />
                          <input type="tel" id="team-contact" className="form-input with-icon" placeholder="+91 XXXXX XXXXX" value={teamData.contact} onChange={(e) => setTeamData({ ...teamData, contact: e.target.value.replace(/[^0-9+\s-]/g, '') })} required />
                        </div>
                      </div>


                      <div className="team-members-container">
                        <h4 className="team-members-title">Team Members ({teamData.members.length}/4)</h4>
                        {teamData.members.map((member, index) => (
                          <div key={index} className="member-card">
                            <div className="member-card-header">
                              <h5>{index === 0 ? 'Team Leader' : `Member ${index + 1}`}</h5>
                              {index > 0 && (
                                <button type="button" onClick={() => handleRemoveMember(index)} className="btn-icon-danger" title="Remove Member">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="form-group premium-input-group">
                              <input type="text" className="form-input" placeholder="Full Name" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))} required />
                            </div>
                            <div className="form-grid-2">
                              <div className="form-group premium-input-group">
                                <input type="text" className="form-input" placeholder="Course" value={member.course} onChange={(e) => handleMemberChange(index, 'course', e.target.value)} required />
                              </div>
                              <div className="form-group premium-input-group">
                              <CustomSelect 
                                value={member.campus} 
                                onChange={(val: string) => handleMemberChange(index, 'campus', val)}
                                options={[
                                  { value: 'Bhimtal', label: 'GEHU, Bhimtal' },
                                  { value: 'Haldwani', label: 'GEU, Haldwani' }
                                ]}
                                icon={Building2}
                              />
                              </div>
                            </div>
                            <div className="form-grid-2">
                              <div className="form-group premium-input-group">
                                <input type="text" className="form-input" placeholder="Student ID" value={member.studentId} onChange={(e) => handleMemberChange(index, 'studentId', e.target.value)} required />
                              </div>
                              <div className="form-group premium-input-group">
                                <input type="text" className="form-input" placeholder="Year / Sem" value={member.yearSem} onChange={(e) => handleMemberChange(index, 'yearSem', e.target.value)} required />
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={membersEndRef} />
                        {teamData.members.length < 4 && (
                          <button type="button" className="btn-secondary w-full justify-center mt-2" onClick={handleAddMember}>
                            <Plus className="w-4 h-4 mr-2" /> Add Member
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary shimmer-btn mt-4 w-full justify-center"
                  >
                    <span className="shimmer-text">GENERATE HOLOGRAPHIC PASS</span>
                    <Sparkles className="w-4 h-4 ml-2" />
                  </motion.button>
                </form>
              </>
            ) : (
              /* Generated Pass Preview */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="generated-pass-container"
              >
                <div className="holo-ticket-card premium-holo-card">
                  <div className="ticket-header">
                    <div>
                      <div className="ticket-event-name">NIRVAN &apos;26</div>
                      <div className="ticket-location">
                        {generatedPass.campus.toUpperCase()} CAMPUS
                      </div>
                    </div>
                    <div className="ticket-badge-tag premium-badge">
                      {generatedPass.isTeam ? 'TEAM PASS' : 'HACKER PASS'}
                    </div>
                  </div>

                  <div className="ticket-body-grid">
                    <div>
                      <div className="ticket-user-name">
                        {generatedPass.primaryName}
                      </div>
                      <div className="ticket-user-meta">
                        {generatedPass.isTeam ? `${generatedPass.teamSize} Members Registered` : 'Official Attendee'}
                      </div>

                      <div className="ticket-serial-id">
                        PASS ID: {generatedPass.passId}
                      </div>
                    </div>

                    <div className="ticket-qr-box premium-qr">
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

                <div className="download-actions">
                  <button className="btn-secondary" onClick={handleClose}>
                    <span>CLOSE</span>
                  </button>
                  <button className="btn-primary shimmer-btn" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    <span className="shimmer-text">PRINT / SAVE PASS</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
