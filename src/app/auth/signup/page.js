'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Building, Phone, ArrowRight, CheckCircle2, XCircle, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { useBumblebee } from '../../../lib/store';
import { playClickSound, playRecoverySound } from '../../../lib/sound';

export default function SignUpPage() {
  const router = useRouter();
  const { signupUser } = useBumblebee();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password checks
  const password = formData.password;
  const hasMinLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === formData.confirmPassword;

  const handleQuickFill = () => {
    playClickSound();
    setFormData({
      name: 'Sai Pranav',
      email: 'pranav@bumblebee.io',
      organization: 'Bumblebee Cloud Ops',
      phone: '+1 (555) 019-2834',
      password: 'BumblebeeSecurePass2026!',
      confirmPassword: 'BumblebeeSecurePass2026!'
    });
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid work or personal email.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      return;
    }

    setIsLoading(true);
    try {
      signupUser({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        password: formData.password,
        phone: formData.phone
      });

      setTimeout(() => {
        playRecoverySound();
        setIsLoading(false);
        router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
      }, 400);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative transition-colors">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-bee-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
            🐝
          </div>
          <span className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-mono">
            BUMBLEBEE
          </span>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Create Your Personal Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] font-mono">
          "Know before your users do."
        </p>

        {/* Quick Demo Autofill Pill */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleQuickFill}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bee-500/15 text-bee-500 border border-bee-500/30 text-xs font-mono font-bold hover:bg-bee-500/25 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Click to Auto-Fill Sample Info</span>
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl text-[var(--text-primary)]">
          
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="e.g. John Doe / Sai Pranav"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                  Workspace Name
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Building className="h-3.5 w-3.5 text-bee-500" />
                  </div>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-9 pr-2 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                    placeholder="My Cloud Team"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                  Phone (WhatsApp)
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Phone className="h-3.5 w-3.5 text-bee-500" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-9 pr-2 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                    placeholder="+1 555 0192"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            {/* Quick Password Checklist */}
            <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] text-[11px] font-mono space-y-1">
              <div className="grid grid-cols-2 gap-1">
                <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}`}>
                  {hasMinLength ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3" />} 6+ Chars
                </span>
                <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}`}>
                  {hasUpper ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3" />} Uppercase
                </span>
                <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}`}>
                  {hasNumber ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3" />} Number
                </span>
                <span className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-emerald-500 font-bold' : 'text-[var(--text-muted)]'}`}>
                  {passwordsMatch ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3" />} Match
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3.5 rounded-xl shadow-glow-amber transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? 'Creating Workspace...' : 'Create Account & Verify'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-bee-500 hover:text-bee-400 font-bold ml-1">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
