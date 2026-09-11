'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex.mercer@enterprise.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/app/overview');
    }, 600);
  };

  const handleDemoQuickFill = (role = 'owner') => {
    playClickSound();
    if (role === 'owner') {
      setEmail('alex.mercer@enterprise.io');
    } else {
      setEmail('sarah.lin@enterprise.io');
    }
    setPassword('BumblebeeSecurePass2026!');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-bee-500/10 rounded-full blur-[120px] pointer-events-none" />

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
          Sign In to Your Command Center
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
          "Know before your users do."
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-obsidian-900 border border-obsidian-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl text-white">
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-bee-400 hover:text-bee-300 font-mono transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-obsidian-950 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                />
                <span>Remember me for 30 days</span>
              </label>
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> 2FA Ready
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Hive'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-obsidian-800">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
              <span>DEMO ONE-CLICK LOGIN:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoQuickFill('owner')}
                className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-obsidian-700 hover:border-bee-500/60 text-xs font-mono text-gray-300 hover:text-white transition-all text-left flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-bee-400" /> Alex (Owner)
              </button>
              <button
                type="button"
                onClick={() => handleDemoQuickFill('admin')}
                className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-obsidian-700 hover:border-bee-500/60 text-xs font-mono text-gray-300 hover:text-white transition-all text-left flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-bee-400" /> Sarah (Admin)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Don't have a workspace yet?{' '}
            <Link href="/auth/signup" className="text-bee-400 hover:text-bee-300 font-bold ml-1">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
