'use client';

import React from 'react';
import Link from 'next/link';
import { useBumblebee } from '../../lib/store';
import { playClickSound } from '../../lib/sound';
import { Shield, Sparkles, Activity, ArrowRight, Sun, Moon, HardHat, Terminal } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme, setIsCommandPaletteOpen } = useBumblebee();

  const handleThemeChange = (newTheme) => {
    playClickSound();
    setTheme(newTheme);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center shadow-glow-amber group-hover:scale-105 transition-transform">
            <span className="text-xl">🐝</span>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-[var(--text-primary)] font-mono flex items-center gap-1.5">
              BUMBLEBEE
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-bee-500/20 text-bee-500 border border-bee-500/30">
                PROD
              </span>
            </span>
            <span className="block text-[10px] text-[var(--text-muted)] font-medium -mt-1 tracking-wider">
              INCIDENT INTELLIGENCE
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)] font-medium">
          <Link href="#capabilities" className="hover:text-bee-500 transition-colors">
            Capabilities
          </Link>
          <Link href="#pipeline" className="hover:text-bee-500 transition-colors">
            How It Works
          </Link>
          <Link href="#intelligence" className="hover:text-bee-500 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-bee-500" />
            AI Analyst
          </Link>
          <Link href="#security" className="hover:text-bee-500 transition-colors">
            Security & SSRF
          </Link>
          <Link href="/status/acme-cloud" className="hover:text-bee-500 transition-colors flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            Live Status
          </Link>
        </div>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-3">
          {/* Quick Command Palette trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:text-[var(--text-primary)] transition-all font-mono"
            title="Open Command Palette"
          >
            <Terminal className="w-3.5 h-3.5 text-bee-500" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-muted)]">⌘K</kbd>
          </button>

          {/* Theme Quick Toggle */}
          <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-0.5">
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-1.5 rounded-md text-xs transition-colors ${theme === 'dark' ? 'bg-bee-500 text-black font-bold shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-1.5 rounded-md text-xs transition-colors ${theme === 'light' ? 'bg-amber-500 text-white font-bold shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              title="Lighting Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('worker')}
              className={`p-1.5 rounded-md text-xs transition-colors ${theme === 'worker' ? 'bg-yellow-400 text-black font-bold shadow' : 'text-[var(--text-muted)] hover:text-yellow-400'}`}
              title="🐝 Worker Hive Mode"
            >
              <HardHat className="w-3.5 h-3.5" />
            </button>
          </div>

          <Link
            href="/auth/signin"
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-3.5 py-2 rounded-lg shadow-glow-amber transition-all hover:scale-105"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </nav>
  );
}
