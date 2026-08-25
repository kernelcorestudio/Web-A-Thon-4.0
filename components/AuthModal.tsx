'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { soundFX } from '@/lib/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

type Tab = 'signin' | 'signup';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });

  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      soundFX.playWarp();
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [tab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for auth state change
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
        soundFX.playSuccess();
        onAuthSuccess();
        onClose();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // ── Google Sign‑In ─────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    soundFX.playClick();
    setGoogleLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        setError('Google sign-in failed: ' + error.message);
        setGoogleLoading(false);
      }
    } catch {
      setError('Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  // ── Email Sign‑In ───────────────────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    soundFX.playClick();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login')) {
          setError('Incorrect email or password. Please try again.');
        } else {
          setError(error.message);
        }
      }
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Email Sign‑Up ───────────────────────────────────────────────────────────
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    soundFX.playClick();

    try {
      const { error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: { full_name: signUpData.name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists. Please sign in.');
        } else {
          setError(error.message);
        }
      } else {
        setSuccess('Account created! Sign in or verify your email if required.');
        setTab('signin');
        setSignInData({ email: signUpData.email, password: '' });
      }
    } catch {
      setError('Sign-up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="auth-modal"
      className="modal-backdrop active"
      onClick={handleBackdropClick}
      style={{ zIndex: 10000 }}
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: 440,
          padding: '0',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'rgba(14, 12, 18, 0.98)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.05)',
        }}
      >
        {/* Top subtle bar */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.4), #ffffff)',
        }} />

        {/* Header */}
        <div style={{ padding: '28px 28px 0', position: 'relative' }}>
          <button
            id="auth-modal-close"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close Auth Modal"
            style={{ position: 'absolute', top: 16, right: 16 }}
          >
            <X className="w-5 h-5" />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className="font-dancing text-3xl text-white mb-1">
              NIRVAN &apos;26
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}>
              {tab === 'signin'
                ? 'Welcome back — Sign in to access your profile'
                : 'Create your luxury wellness profile'}
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            borderRadius: 999, padding: 3, marginBottom: 20,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {(['signin', 'signup'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 999,
                  border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  fontFamily: 'var(--font-inter)', letterSpacing: '0.04em',
                  transition: 'all 0.2s ease',
                  background: tab === t ? '#ffffff' : 'transparent',
                  color: tab === t ? '#0a0608' : 'rgba(255,255,255,0.5)',
                  boxShadow: tab === t ? '0 0 15px rgba(255,255,255,0.2)' : 'none',
                }}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '0 28px 28px' }}>
          {/* Banners */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 12, padding: '10px 14px', marginBottom: 14,
              fontSize: '0.8rem', color: '#f87171', lineHeight: 1.5,
            }}>
              <AlertCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }} />
              {error}
            </div>
          )}
          {success && (
            <div style={{
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 12, padding: '10px 14px', marginBottom: 14,
              fontSize: '0.8rem', color: '#34d399',
            }}>
              ✓ {success}
            </div>
          )}

          {/* Google Button */}
          <button
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || isLoading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10, padding: '12px 16px',
              borderRadius: 999, border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)', color: '#fff',
              fontSize: '0.85rem', fontWeight: 600, cursor: googleLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease', fontFamily: 'var(--font-inter)',
              opacity: googleLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.09)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.14)';
            }}
          >
            {googleLoading
              ? <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
              : <GoogleIcon />}
            {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', fontFamily: 'var(--font-inter)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* ── SIGN IN ── */}
          {tab === 'signin' && (
            <form id="signin-form" onSubmit={handleSignIn}>
              <div className="form-group">
                <label className="form-label" htmlFor="signin-email">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input type="email" id="signin-email" className="form-input" placeholder="you@domain.com" required
                    value={signInData.email} onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="signin-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input type={showPassword ? 'text' : 'password'} id="signin-password" className="form-input"
                    placeholder="••••••••" required value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    style={{ paddingLeft: 36, paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                  </button>
                </div>
              </div>
              <button type="submit" id="signin-submit-btn" className="btn-primary" disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', opacity: isLoading ? 0.75 : 1 }}>
                {isLoading
                  ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Signing In...</>
                  : <span>SIGN IN</span>}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 14 }}>
                No account?{' '}
                <button type="button" onClick={() => setTab('signup')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'underline' }}>
                  Sign Up
                </button>
              </p>
            </form>
          )}

          {/* ── SIGN UP ── */}
          {tab === 'signup' && (
            <form id="signup-form" onSubmit={handleSignUp}>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-name">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input type="text" id="signup-name" className="form-input" placeholder="Eleanor Vance" required
                    value={signUpData.name} onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-email">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input type="email" id="signup-email" className="form-input" placeholder="you@domain.com" required
                    value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="signup-password">
                  Password <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(min. 6 characters)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input type={showPassword ? 'text' : 'password'} id="signup-password" className="form-input"
                    placeholder="••••••••" required minLength={6} value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    style={{ paddingLeft: 36, paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                  </button>
                </div>
              </div>
              <button type="submit" id="signup-submit-btn" className="btn-primary" disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', opacity: isLoading ? 0.75 : 1 }}>
                {isLoading
                  ? <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Creating Account...</>
                  : <span>CREATE ACCOUNT</span>}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: 14 }}>
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('signin')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'underline' }}>
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
