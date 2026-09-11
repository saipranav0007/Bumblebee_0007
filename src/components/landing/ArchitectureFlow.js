'use client';

import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Server, AlertTriangle, Brain, Bell, RefreshCw, Cpu, Layers } from 'lucide-react';

export default function ArchitectureFlow() {
  const steps = [
    {
      num: "01",
      title: "Continuous Probe",
      desc: "Independent Python workers execute HTTP, TCP, SSL, and Playwright synthetic checks every 30s.",
      icon: Clock,
      color: "border-blue-500/40 text-blue-400 bg-blue-500/10"
    },
    {
      num: "02",
      title: "Multi-Region Quorum",
      desc: "Initial failure triggers instant retries across US, EU, and AP nodes before declaring an outage.",
      icon: Layers,
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10"
    },
    {
      num: "03",
      title: "Incident Deduplication",
      desc: "100 consecutive failures attach to 1 deduplicated incident without generating alert storms.",
      icon: ShieldCheck,
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10"
    },
    {
      num: "04",
      title: "🧠 AI Fact vs Inference",
      desc: "Categorizes telemetry into [CONFIRMED], [OBSERVED], [LIKELY], and [UNKNOWN] root causes.",
      icon: Brain,
      color: "border-bee-500/40 text-bee-400 bg-bee-500/10"
    },
    {
      num: "05",
      title: "🐝 Signature Buzz Alert",
      desc: "Emergency auditory alarms, Web Push, Mobile PWA, WhatsApp Business, and Email dispatch.",
      icon: Bell,
      color: "border-red-500/40 text-red-400 bg-red-500/10"
    },
    {
      num: "06",
      title: "Autonomous Recovery",
      desc: "Watches healing cycles, verifies multi-region health restored, and sends recovery notifications.",
      icon: RefreshCw,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    }
  ];

  return (
    <div id="pipeline" className="py-20 border-b border-obsidian-800 bg-obsidian-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-bee-400 font-bold tracking-widest px-3 py-1 rounded-full bg-bee-500/10 border border-bee-500/30">
            System Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            How Bumblebee Protects The Hive
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            A resilient watchdog engine built on background workers, multi-region quorum consensus, and intelligent telemetry analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.num}
                className="relative bg-obsidian-900/90 border border-obsidian-700/80 rounded-2xl p-6 hover:border-bee-500/50 transition-all hover:shadow-glow-amber"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-gray-500">
                    STAGE {s.num}
                  </span>
                  <div className={`p-2 rounded-xl border ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mt-4">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
