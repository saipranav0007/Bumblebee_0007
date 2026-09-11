'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { playClickSound, playRecoverySound } from '../../../lib/sound';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Reset token sent, 3: Set new password, 4: Done
  const [email, setEmail] = useState('alex.mercer@enterprise.io');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetEmail = (e) => {
    e.preventDefault();
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleSimulateOpenResetLink = () => {
    playClickSound();
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      playRecoverySound();
      setIsLoading(false);
      setStep(4);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
            🐝
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-mono">
            BUMBLEBEE
          </span>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Reset Password
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
          Zero-knowledge credential recovery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-obsidian-900 border border-obsidian-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl">
          
          {step === 1 && (
            <form onSubmit={handleSendResetEmail} className="space-y-5">
              <p className="text-xs text-gray-300 leading-relaxed">
                Enter your work email address. If an account exists, Bumblebee will dispatch an encrypted, time-limited reset link.
              </p>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  Work Email Address
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Mail className="h-4 w-4 text-bee-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all"
              >
                {isLoading ? 'Dispatching Token...' : 'Send Secure Reset Link'} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="text-center space-y-5 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-bee-500/20 border border-bee-500/40 mx-auto flex items-center justify-center text-bee-400 shadow-glow-amber">
                <Mail className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white">
                Reset Email Dispatched
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                A single-use reset token has been transmitted to <strong className="text-bee-400 font-mono">{email}</strong>. Token expires in 15 minutes.
              </p>

              <div className="p-3 bg-obsidian-950 border border-obsidian-800 rounded-xl text-left text-xs font-mono text-gray-400">
                <span className="text-emerald-400 block font-bold mb-1">SECURITY ASSURANCE:</span>
                Passwords are never transmitted via email. Only a cryptographic one-time token is dispatched.
              </div>

              <button
                onClick={handleSimulateOpenResetLink}
                className="w-full flex items-center justify-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs py-2.5 rounded-xl shadow-glow-amber"
              >
                Simulate: Open Encrypted Reset Link <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-bold text-white">
                Create New Password
              </h3>
              <p className="text-xs text-gray-400">
                Reset token validated: <span className="text-bee-400 font-mono">TOKEN-9A82-VALID</span>
              </p>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  New Password
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Lock className="h-4 w-4 text-bee-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  Confirm New Password
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Lock className="h-4 w-4 text-bee-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !newPassword || newPassword !== confirmPassword}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all"
              >
                {isLoading ? 'Updating Password...' : 'Save New Password & Invalidate Token'}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-5 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-glow-operational">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white">
                Password Successfully Reset
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                Your credentials have been securely updated. The reset token has been invalidated across all nodes.
              </p>

              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-sm py-3 rounded-xl shadow-glow-amber"
              >
                Sign In With New Password <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
