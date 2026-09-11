'use client';

import React from 'react';
import { Bell, Smartphone, MessageSquare, Mail, Flame, Check, ShieldAlert, Volume2 } from 'lucide-react';
import { useBumblebee } from '../../lib/store';

export default function AlertChannelsSection() {
  const { triggerBuzzAlert } = useBumblebee();

  const channels = [
    {
      icon: Flame,
      name: "🐝 Signature Buzz Alert",
      desc: "Instant synthesized auditory buzzer and screen strobe when critical outages breach quorum.",
      badge: "Signature Feature",
      highlight: true
    },
    {
      icon: Bell,
      name: "Browser Web Push",
      desc: "W3C Push API delivers real-time notifications even when the Bumblebee tab is completely closed.",
      badge: "Background Worker",
      highlight: false
    },
    {
      icon: Smartphone,
      name: "Mobile Push & PWA",
      desc: "Native-grade PWA with background push, emergency haptic vibration, and on-call notification badges.",
      badge: "iOS & Android",
      highlight: false
    },
    {
      icon: MessageSquare,
      name: "WhatsApp Business API",
      desc: "Direct verified WhatsApp messages with rich buttons to triage or acknowledge incidents on the go.",
      badge: "Official API",
      highlight: false
    },
    {
      icon: Mail,
      name: "Transactional Email",
      desc: "Rich incident summaries, timeline attachments, and morning Daily Reliability Briefs.",
      badge: "Multi-Recipient",
      highlight: false
    }
  ];

  return (
    <div className="py-20 border-b border-obsidian-800 bg-obsidian-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-bee-400 font-bold tracking-widest px-3 py-1 rounded-full bg-bee-500/10 border border-bee-500/30">
            Real-Time Alert Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Never Miss a Critical Outage.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Bumblebee ensures on-call engineers receive urgent alerts across every device and channel with zero delay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.name}
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  ch.highlight
                    ? 'bg-gradient-to-br from-red-950/40 via-obsidian-900 to-obsidian-900 border-red-500/50 shadow-glow-critical hover:scale-[1.02]'
                    : 'bg-obsidian-900/80 border-obsidian-800 hover:border-bee-500/40 hover:bg-obsidian-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${
                    ch.highlight ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-bee-500/10 border-bee-500/30 text-bee-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                    ch.highlight ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-obsidian-800 text-gray-400 border-obsidian-700'
                  }`}>
                    {ch.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4">
                  {ch.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {ch.desc}
                </p>

                {ch.highlight && (
                  <button
                    onClick={() => triggerBuzzAlert()}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-lg shadow-red-600/30"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Trigger Buzz Demo
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
