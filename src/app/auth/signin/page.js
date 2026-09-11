'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, AlertCircle, Crown, User, CheckCircle2 } from 'lucide-react';
import { useBumblebee } from '../../../lib/store';
import { playClickSound, playRecoverySound } from '../../../lib/sound';

export default function SignInPage() {
  const router = useRouter();
  const { loginUser } = useBumblebee();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = loginUser({ email, password, isDomainAdmin: false });
      setSuccessMessage(`Authenticated as ${res.user.name} (${res.user.role})`);
      playRecoverySound();
      setTimeout(() => {
        setIsLoading(false);
        router.push('/app/overview');
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Login failed.');
    }
  };

  const handleDomainAdminLogin = () => {
    playClickSound();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = loginUser({ email: 'admin@bumblebee.io', isDomainAdmin: true });
      setSuccessMessage('Authenticated as Domain Master (Root Administrator)');
      playRecoverySound();
      setTimeout(() => {
        setIsLoading(false);
        router.push('/app/overview');
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Domain admin login error.');
    }
  };

  const handleQuickFill = (type) => {
    playClickSound();
    setErrorMessage('');
    if (type === 'admin') {
      setEmail('admin@bumblebee.io');
      setPassword('AdminRootPass2026!');
    } else {
      setEmail('user@enterprise.io');
      setPassword('UserSecurePass2026!');
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
          Sign In to Your Command Center
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] font-mono">
          "Know before your users do."
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl text-[var(--text-primary)]">
          
          {/* Quick Domain Admin Master Access Button */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-bee-500/10 to-transparent border border-bee-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-bee-500 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-bee-500" />
                <span>DOMAIN / ROOT ADMIN ACCESS</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bee-500/20 text-bee-400 font-bold">1-Click</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mb-3 leading-relaxed">
              Log in instantly with elevated Root Domain Administrator permissions.
            </p>
            <button
              type="button"
              onClick={handleDomainAdminLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-bee-500/20 hover:bg-bee-500/30 border border-bee-500/40 text-bee-400 font-bold text-xs py-2.5 rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-bee-400" />
              <span>Enter as Domain Administrator</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
            <span className="flex-shrink mx-3 text-xs font-mono text-[var(--text-muted)] uppercase">Or Personal Sign In</span>
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                Email Address
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-[var(--text-secondary)] font-mono uppercase">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-bee-500 hover:text-bee-400 font-mono transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[var(--bg-surface)] border-[var(--border-color)] text-bee-500 focus:ring-bee-500"
                />
                <span>Remember session</span>
              </label>
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> 2FA Ready
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Hive'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Autofill test badges */}
          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2 font-mono">
              <span>QUICK AUTO-FILL CREDENTIALS:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-bee-500/60 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-3 h-3 text-bee-400" /> Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('user')}
                className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-bee-500/60 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3 h-3 text-bee-400" /> Personal User
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Don't have an account yet?{' '}
            <Link href="/auth/signup" className="text-bee-500 hover:text-bee-400 font-bold ml-1">
              Create Personal Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
