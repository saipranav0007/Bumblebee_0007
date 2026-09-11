'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle2, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { playClickSound, playRecoverySound } from '../../../lib/sound';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'alex.mercer@enterprise.io';

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const handleSimulateTokenClick = () => {
    playClickSound();
    setIsVerifying(true);
    setTimeout(() => {
      playRecoverySound();
      setIsVerifying(false);
      router.push('/auth/security-consent');
    }, 1000);
  };

  const handleResend = () => {
    playClickSound();
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendStatus('Verification link re-sent! Check your inbox.');
    }, 800);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
      <div className="w-12 h-12 rounded-2xl bg-bee-500/20 border border-bee-500/40 mx-auto flex items-center justify-center text-bee-400 mb-4 shadow-glow-amber">
        <Mail className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        Verify Your Bumblebee Account
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
        We sent a secure verification token to:
      </p>
      <p className="mt-1 text-sm font-mono font-bold text-bee-400 bg-obsidian-900 border border-obsidian-800 py-1.5 px-3 rounded-lg inline-block">
        {email}
      </p>

      <div className="mt-8 bg-obsidian-900 border border-obsidian-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl text-center space-y-6">
        <div className="p-4 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs text-gray-300 space-y-2 text-left">
          <div className="flex items-center gap-2 text-bee-400 font-bold font-mono">
            <ShieldCheck className="w-4 h-4" /> Secure Token Verification
          </div>
          <p className="text-gray-400 leading-relaxed">
            To prevent unauthorized probes and protect tenant security, monitoring features activate once your organization email is confirmed.
          </p>
        </div>

        <button
          onClick={handleSimulateTokenClick}
          disabled={isVerifying}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3.5 rounded-xl shadow-glow-amber transition-all"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
              <span>Confirming Token...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Confirm Email & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="pt-3 border-t border-obsidian-800 flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>Didn't receive email?</span>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-bee-400 hover:text-bee-300 font-bold"
          >
            {isResending ? 'Sending...' : 'Resend Link'}
          </button>
        </div>

        {resendStatus && (
          <p className="text-xs text-emerald-400 font-mono animate-in fade-in">
            {resendStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative text-white">
      <Suspense fallback={<div className="text-center text-bee-400 font-mono text-sm">Loading verification...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
