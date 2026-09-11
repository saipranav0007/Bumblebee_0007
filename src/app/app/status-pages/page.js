'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBumblebee } from '../../../lib/store';
import { 
  Layers, 
  ExternalLink, 
  Globe, 
  CheckCircle2, 
  Settings, 
  Eye, 
  PlusCircle, 
  ShieldCheck, 
  ArrowRight,
  Sliders
} from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function StatusPagesConfigPage() {
  const { monitors, currentOrg } = useBumblebee();
  const [statusPageTitle, setStatusPageTitle] = useState('Acme Cloud Official Status');
  const [subdomainSlug, setSubdomainSlug] = useState('acme-cloud');
  const [customDomain, setCustomDomain] = useState('status.acmecloud.io');
  const [showUptimeDays, setShowUptimeDays] = useState(90);
  const [selectedServices, setSelectedServices] = useState(monitors.map(m => m.id));

  const toggleService = (id) => {
    playClickSound();
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Public Status Pages</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
                <Layers className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Publish transparent availability telemetry to your customers with zero-knowledge secret isolation.
          </p>
        </div>

        <Link
          href={`/status/${subdomainSlug}`}
          target="_blank"
          className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-glow-amber transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Live Public Page</span>
        </Link>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Settings Form (7 cols) */}
        <div className="lg:col-span-7 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3">
            Branding & Domain Configuration
          </h3>

          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Status Page Title</label>
            <input
              type="text"
              value={statusPageTitle}
              onChange={(e) => setStatusPageTitle(e.target.value)}
              className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Bumblebee URL</label>
              <input
                type="text"
                value={`https://bumblebee.io/status/${subdomainSlug}`}
                disabled
                className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-gray-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Custom CNAME Domain</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
              />
            </div>
          </div>

          {/* Service Visibility Selector */}
          <div className="pt-2">
            <label className="block text-xs font-mono text-gray-300 uppercase mb-2">
              Publicly Exposed Services ({selectedServices.length} Selected)
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {monitors.map((m) => {
                const isSelected = selectedServices.includes(m.id);
                return (
                  <label
                    key={m.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-obsidian-700 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        m.status === 'DOWN' ? 'bg-red-500' :
                        m.status === 'DEGRADED' ? 'bg-amber-400' :
                        'bg-emerald-400'
                      }`} />
                      <span className="font-bold text-white">{m.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">({m.type})</span>
                    </div>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleService(m.id)}
                      className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Security & Live Embed Preview (5 cols) */}
        <div className="lg:col-span-5 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3">
              Zero-Telemetry Leakage Security
            </h3>

            <div className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-300 space-y-1.5">
              <span className="text-emerald-400 font-bold block">PRIVACY ASSURANCE:</span>
              Public status pages only display high-level status pills and 90-day uptime bars. Private internal IP addresses, API request payloads, and credentials are NEVER exposed to the public.
            </div>

            <div className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-400 space-y-1">
              <div>Public Subscribers: <strong className="text-white">1,420 email & webhook subscribers</strong></div>
              <div>SSL Certificate: <strong className="text-emerald-400">Auto-provisioned Let's Encrypt TLS 1.3</strong></div>
            </div>
          </div>

          <Link
            href={`/status/${subdomainSlug}`}
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 text-black font-bold text-xs py-3 rounded-xl shadow-glow-amber transition-all hover:scale-105"
          >
            <span>Preview Customer-Facing Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
