'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Activity, ArrowRight, Play, CheckCircle2, Server, Flame, Sparkles } from 'lucide-react';
import { useBumblebee } from '../../lib/store';
import { playBuzzAlert } from '../../lib/sound';

export default function Hero() {
  const { metrics, triggerBuzzAlert } = useBumblebee();

  return (
    <div className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-obsidian-800">
      {/* Dynamic Background Grid & Ambient Honeycomb Glows */}
      <div className="absolute inset-0 bg-honeycomb-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-bee-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Intelligence Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-bee-500/30 text-xs font-mono text-bee-400 shadow-glow-amber mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>🐝 AUTONOMOUS SERVICE WATCHDOG ACTIVE</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300">30s High-Precision Cycle</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Know before your <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bee-400 via-amber-300 to-yellow-500">
            users do.
          </span>
        </h1>

        {/* Supporting Tagline */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Bumblebee continuously monitors your websites, applications, APIs and digital services, detects problems before your users report them, and alerts your team instantly.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="flex items-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm px-7 py-3.5 rounded-xl shadow-glow-amber transition-all hover:scale-105 active:scale-95"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/app/overview"
            className="flex items-center gap-2 bg-obsidian-800/90 hover:bg-obsidian-700/90 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-obsidian-700 hover:border-bee-500/50 transition-all backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-bee-400 fill-bee-400" /> Explore Demo
          </Link>

          <button
            onClick={() => triggerBuzzAlert()}
            className="flex items-center gap-2 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-sm px-5 py-3.5 rounded-xl border border-red-500/40 transition-all shadow-glow-critical"
            title="Listen to the Bumblebee signature Buzz Alert sound"
          >
            <Flame className="w-4 h-4 text-red-400" /> Test Buzz Alert 🐝
          </button>
        </div>

        {/* Live Operational Metrics Showcase */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="bg-obsidian-900/80 border border-obsidian-800 p-4 rounded-xl backdrop-blur-md">
            <span className="text-xs text-gray-400 font-mono block">MONITORED SERVICES</span>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1 flex items-baseline gap-1.5">
              <span>{metrics.totalMonitored}</span>
              <span className="text-xs text-emerald-400 font-mono font-normal">Active</span>
            </div>
          </div>

          <div className="bg-obsidian-900/80 border border-obsidian-800 p-4 rounded-xl backdrop-blur-md">
            <span className="text-xs text-gray-400 font-mono block">OVERALL UPTIME</span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 flex items-baseline gap-1.5">
              <span>{metrics.overallUptime}%</span>
              <span className="text-[10px] text-gray-400 font-mono font-normal">30d SLA</span>
            </div>
          </div>

          <div className="bg-obsidian-900/80 border border-obsidian-800 p-4 rounded-xl backdrop-blur-md">
            <span className="text-xs text-gray-400 font-mono block">CHECKS TODAY</span>
            <div className="text-2xl sm:text-3xl font-bold text-bee-400 mt-1 font-mono">
              {metrics.checksCountToday.toLocaleString()}
            </div>
          </div>

          <div className="bg-obsidian-900/80 border border-obsidian-800 p-4 rounded-xl backdrop-blur-md">
            <span className="text-xs text-gray-400 font-mono block">DETECTION LATENCY</span>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1 flex items-baseline gap-1.5">
              <span>&lt; 30s</span>
              <span className="text-xs text-gray-400 font-mono font-normal">Multi-Region</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
