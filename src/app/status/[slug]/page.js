'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBumblebee } from '../../../lib/store';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Globe, 
  Bell, 
  ShieldCheck, 
  ArrowLeft,
  Activity,
  Layers
} from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function PublicStatusPage({ params }) {
  const { monitors, incidents } = useBumblebee();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const isOverallDegraded = activeIncidents.length > 0;

  const handleSubscribe = (e) => {
    e.preventDefault();
    playClickSound();
    setIsSubscribed(true);
    setTimeout(() => {
      setShowSubscribeModal(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white selection:bg-bee-500 selection:text-black font-sans bg-honeycomb-pattern">
      
      {/* Top Header */}
      <header className="border-b border-obsidian-800 bg-obsidian-900/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-black font-bold shadow-glow-amber">
              🐝
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white font-mono">
                Acme Cloud Status
              </h1>
              <span className="text-[10px] text-gray-400 font-mono">
                Powered by Bumblebee Observability
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubscribeModal(true)}
              className="flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-glow-amber transition-all"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Subscribe to Updates</span>
            </button>

            <Link
              href="/app/overview"
              className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-obsidian-800 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Status Hero Banner */}
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          isOverallDegraded
            ? 'bg-red-950/40 border-red-500/60 text-red-200 shadow-glow-critical'
            : 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 shadow-glow-operational'
        }`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isOverallDegraded ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            {isOverallDegraded ? <AlertTriangle className="w-6 h-6 animate-bounce" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {isOverallDegraded
                ? "Some systems are currently experiencing degraded performance."
                : "All Digital Services Operating Normally"}
            </h2>
            <p className="text-xs text-gray-300 font-mono mt-1">
              {isOverallDegraded
                ? "Engineering team is actively investigating identified anomalies."
                : "Continuous verification across 4 global regions."}
            </p>
          </div>
        </div>

        {/* Public Services List with 90-Day Uptime Bars */}
        <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              System Services Availability
            </h3>
            <span className="text-xs text-gray-400 font-mono">90-Day Historical Record</span>
          </div>

          <div className="space-y-4">
            {monitors.length === 0 ? (
              <div className="p-8 text-center bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-400">
                All systems initialized. No public services currently exposed.
              </div>
            ) : (
              monitors.slice(0, 6).map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        m.status === 'DOWN' ? 'bg-red-500' :
                        m.status === 'DEGRADED' ? 'bg-amber-400' :
                        'bg-emerald-400'
                      }`} />
                      <span className="text-sm font-bold text-white">{m.name}</span>
                    </div>

                    <span className={`text-xs font-mono font-bold ${
                      m.status === 'DOWN' ? 'text-red-400' :
                      m.status === 'DEGRADED' ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}>
                      {m.status === 'OPERATIONAL' ? 'Operational' : m.status}
                    </span>
                  </div>

                  {/* 90-Day Visual Bar Simulation (30 segments) */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const isFaulty = m.status === 'DOWN' && idx >= 28;
                        const isDegraded = m.status === 'DEGRADED' && idx >= 27;
                        return (
                          <div
                            key={idx}
                            className={`flex-1 h-6 rounded-sm transition-all hover:scale-y-125 ${
                              isFaulty ? 'bg-red-500' :
                              isDegraded ? 'bg-amber-400' :
                              'bg-emerald-500/80 hover:bg-emerald-400'
                            }`}
                            title={`Day ${90 - idx * 3}: ${isFaulty ? 'Outage' : '100% Operational'}`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                      <span>90 days ago</span>
                      <span>{m.uptime}% uptime</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Public Incident History */}
        <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-obsidian-800 pb-3">
            Recent Incident Updates
          </h3>

          <div className="space-y-3">
            {incidents.length === 0 ? (
              <div className="p-6 text-center bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No incidents reported in the past 90 days. All systems operational.</span>
              </div>
            ) : (
              incidents.map((inc) => (
                <div key={inc.id} className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="font-bold text-white">{inc.title}</span>
                    <span className="text-[11px] text-bee-400">{inc.startedAt}</span>
                  </div>
                  <p className="text-gray-300">
                    {inc.errorMessage}
                  </p>
                  <div className="pt-1 text-[11px] text-gray-500">
                    Status: <strong className={inc.status === 'RESOLVED' ? 'text-emerald-400' : 'text-amber-400'}>{inc.status}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-obsidian-900 border border-obsidian-700 p-6 rounded-2xl max-w-md w-full text-white shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">
              Subscribe to Status Updates
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Get notified immediately via email whenever an incident is created, updated, or resolved.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
                ✓ You are subscribed! Confirmation dispatched.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubscribeModal(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
