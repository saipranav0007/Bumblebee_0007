'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Shield, Sparkles, Activity, Terminal } from 'lucide-react';
import { useBumblebee } from '../../lib/store';

export default function Footer() {
  const { setIsCommandPaletteOpen } = useBumblebee();

  return (
    <footer className="border-t border-obsidian-800 bg-obsidian-950 text-gray-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-black font-bold shadow-glow-amber">
                🐝
              </div>
              <span className="text-lg font-black text-white tracking-tight font-mono">
                BUMBLEBEE
              </span>
            </Link>
            <p className="text-xs text-gray-400 font-mono">
              "Know before your users do."
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Autonomous digital service monitoring & incident intelligence platform engineered for modern engineering teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/app/overview" className="hover:text-bee-400 transition-colors">Command Center</Link></li>
              <li><Link href="/app/monitors" className="hover:text-bee-400 transition-colors">Monitors & Probes</Link></li>
              <li><Link href="/app/synthetic" className="hover:text-bee-400 transition-colors">Synthetic Tests</Link></li>
              <li><Link href="/app/intelligence" className="hover:text-bee-400 transition-colors">AI Telemetry Analyst</Link></li>
              <li><Link href="/app/sla" className="hover:text-bee-400 transition-colors">SLA & Downtime Budget</Link></li>
              <li><Link href="/status/acme-cloud" className="hover:text-bee-400 transition-colors">Public Status Pages</Link></li>
            </ul>
          </div>

          {/* Security & Observability */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Reliability & Sec</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/app/observability" className="hover:text-bee-400 transition-colors">Observability Graphs</Link></li>
              <li><Link href="/app/incidents" className="hover:text-bee-400 transition-colors">Incident Triaging</Link></li>
              <li><Link href="/app/audit-logs" className="hover:text-bee-400 transition-colors">Tamper-Evident Audit</Link></li>
              <li><Link href="/app/settings" className="hover:text-bee-400 transition-colors">SSRF & Vault Settings</Link></li>
              <li><button onClick={() => setIsCommandPaletteOpen(true)} className="hover:text-bee-400 transition-colors text-left">Command Palette (⌘K)</button></li>
            </ul>
          </div>

          {/* Direct Support Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Direct Support</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Need help? Contact Bumblebee support directly:
            </p>
            <a 
              href="mailto:kandulamohansaipranav9@gmail.com"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian-900 border border-obsidian-800 text-bee-400 hover:border-bee-500/50 hover:text-bee-300 text-xs font-mono transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>kandulamohansaipranav9@gmail.com</span>
            </a>
            <div className="mt-3 text-[11px] text-gray-500 font-mono">
              SOC2 Type II • ISO 27001 • GDPR Ready
            </div>
          </div>

        </div>

        <div className="border-t border-obsidian-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div>
            © {new Date().getFullYear()} Bumblebee Monitoring Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
            <span>•</span>
            <span className="font-mono text-bee-400">Worker Engine v2.4.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
