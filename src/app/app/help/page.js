'use client';

import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Radio, 
  Bell, 
  ShieldCheck, 
  Code, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export default function HelpPage() {
  const sections = [
    {
      icon: BookOpen,
      title: "Getting Started Guide",
      desc: "How to deploy your first watchdog probe in 2 minutes, set quorum confirmation policies, and connect notification channels."
    },
    {
      icon: Radio,
      title: "Monitoring & Probe Engine",
      desc: "Understanding multi-region probe retries, Playwright headless synthetic flows, and SSL/TLS certificate chains."
    },
    {
      icon: Bell,
      title: "Buzz Alert & Escalation Rules",
      desc: "Configuring the signature Bumblebee Buzz Alert, browser push workers, WhatsApp Business integration, and alert suppression."
    },
    {
      icon: ShieldCheck,
      title: "Security & SSRF Defense Specification",
      desc: "Comprehensive documentation on loopback blocking, private IP subnet protection, and zero-knowledge AES-256 secret vaulting."
    },
    {
      icon: Code,
      title: "Bumblebee REST API & SDK",
      desc: "Programmatically create monitors, query telemetry series, acknowledge incidents, and export SLA compliance reports."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Help Center & Engineering Specs</span>
            <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
              <HelpCircle className="w-4 h-4" />
            </span>
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
          Architecture guides, troubleshooting documentation, and 24/7 SRE support.
        </p>
      </div>

      {/* Direct Support Card */}
      <div className="bg-gradient-to-r from-bee-500/10 via-obsidian-900 to-obsidian-900 border border-bee-500/40 rounded-2xl p-6 shadow-glow-amber flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-bee-500/20 text-bee-400 border border-bee-500/40 flex items-center justify-center text-2xl shrink-0">
            🐝
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Need direct help? Contact Bumblebee Support.</h3>
            <p className="text-xs text-gray-300 font-mono mt-1">
              Our engineering team responds to SRE and incident telemetry inquiries within 15 minutes.
            </p>
          </div>
        </div>

        <a
          href="mailto:kandulamohansaipranav9@gmail.com"
          className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-glow-amber transition-all shrink-0 font-mono"
        >
          <Mail className="w-4 h-4" />
          <span>kandulamohansaipranav9@gmail.com</span>
        </a>
      </div>

      {/* Docs Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.title} className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800 hover:border-bee-500/40 transition-all hover:bg-obsidian-850">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-bee-500/10 text-bee-400 border border-bee-500/30">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">{sec.title}</h4>
              </div>
              <p className="text-xs text-gray-400 mt-2.5 leading-relaxed font-mono">
                {sec.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Troubleshooting FAQ */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white font-mono uppercase border-b border-obsidian-800 pb-3">
          Frequently Answered Reliability Questions
        </h3>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 bg-obsidian-950 rounded-xl border border-obsidian-800 space-y-1">
            <strong className="text-white block">Q: Why didn't Bumblebee alert on a single transient timeout?</strong>
            <p className="text-gray-400">
              A: To protect engineers from alarm fatigue, Bumblebee requires 3 consecutive multi-region failed retries before confirming an incident.
            </p>
          </div>

          <div className="p-3.5 bg-obsidian-950 rounded-xl border border-obsidian-800 space-y-1">
            <strong className="text-white block">Q: Does the Buzz Alert work if my browser tab is closed?</strong>
            <p className="text-gray-400">
              A: Yes! When configured, the background Web Push worker, Mobile PWA, and WhatsApp Business API deliver real-time alarms regardless of browser state.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
