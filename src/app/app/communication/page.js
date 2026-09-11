'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { playBuzzAlert, playClickSound } from '../../../lib/sound';
import { 
  Bell, 
  Flame, 
  Mail, 
  Smartphone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  PlusCircle, 
  Sliders, 
  Volume2, 
  Send,
  Clock,
  Layers
} from 'lucide-react';

export default function CommunicationPage() {
  const { notificationsHistory, triggerBuzzAlert } = useBumblebee();
  const [activeTab, setActiveTab] = useState('CHANNELS'); // 'CHANNELS', 'RULES', 'HISTORY'

  const [channels, setChannels] = useState([
    { id: 'ch-1', type: 'BUZZ', name: '🐝 Signature Buzz Alert', target: 'Synthesized Audio Siren + Screen Beacon', active: true, badge: 'Signature' },
    { id: 'ch-2', type: 'PUSH', name: 'Browser Web Push (W3C)', target: 'All Registered Admin & Engineer Devices (8 nodes)', active: true, badge: 'PWA / Web' },
    { id: 'ch-3', type: 'WHATSAPP', name: 'WhatsApp Business API', target: '+1 (555) 019-2831 (On-Call SRE Line)', active: true, badge: 'Verified API' },
    { id: 'ch-4', type: 'EMAIL', name: 'SRE Production Incident List', target: 'sre-alerts@bumblebee.io, devops@acme.io', active: true, badge: 'SMTP / SES' },
  ]);

  const alertRules = [
    { severity: 'CRITICAL (P0)', routing: 'Buzz Alert + Web Push + Mobile PWA + WhatsApp + Email', threshold: '3 consecutive multi-region failures' },
    { severity: 'MAJOR (P1)', routing: 'Web Push + Mobile PWA + Email', threshold: '2 failed checks or +300% latency spike' },
    { severity: 'WARNING (P2)', routing: 'Dashboard Feed + Email Summary', threshold: '1 transient failure or SSL expiring in 14 days' },
    { severity: 'RECOVERY (P0/P1)', routing: 'Push Notification + Email + Recovery Chime', threshold: 'Multi-region quorum passes 2 consecutive checks' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Alert Router & Buzz Notification Hub</span>
              <span className="p-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs">
                <Bell className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Manage multi-channel notification dispatchers, routing escalation rules, and delivery receipts.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex items-center bg-obsidian-900 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
          {[
            { id: 'CHANNELS', label: 'Channels' },
            { id: 'RULES', label: 'Alert Rules' },
            { id: 'HISTORY', label: 'Delivery Receipts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClickSound(); setActiveTab(tab.id); }}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                activeTab === tab.id ? 'bg-bee-500 text-black shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Signature Buzz Showcase Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-obsidian-900 to-red-950/80 border border-red-500/60 rounded-2xl p-6 shadow-glow-critical flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-3xl shrink-0">
            🐝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded uppercase">
                SIGNATURE FEATURE
              </span>
              <h3 className="text-lg font-bold text-white">Bumblebee Buzz Alert</h3>
            </div>
            <p className="text-xs text-red-200/90 mt-1 font-mono max-w-xl leading-relaxed">
              When a Critical outage strikes, Bumblebee triggers an urgent synthesized harmonic alarm tone, flashes the UI emergency strobe, and dispatches multi-channel push & WhatsApp payloads with zero latency.
            </p>
          </div>
        </div>

        <button
          onClick={() => triggerBuzzAlert()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-600/40 transition-all hover:scale-105 shrink-0"
        >
          <Volume2 className="w-4 h-4" />
          <span>Simulate Buzz Alarm 🐝</span>
        </button>
      </div>

      {/* SUB-VIEW 1: CHANNELS */}
      {activeTab === 'CHANNELS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((ch) => (
              <div key={ch.id} className="bg-obsidian-900 border border-obsidian-700/80 p-5 rounded-2xl shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-bee-400 bg-bee-500/10 px-2.5 py-0.5 rounded border border-bee-500/30">
                    {ch.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{ch.name}</h3>

                <p className="text-xs text-gray-400 font-mono bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 truncate">
                  Target: <strong className="text-gray-200">{ch.target}</strong>
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>AES-256 Auth Vault Token</span>
                  <button 
                    onClick={() => playBuzzAlert()}
                    className="text-bee-400 hover:text-bee-300 font-bold"
                  >
                    Send Test Signal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: ALERT RULES */}
      {activeTab === 'RULES' && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3 font-mono">
            Configured Notification Escalation Rules
          </h3>

          <div className="space-y-3">
            {alertRules.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{rule.severity}</span>
                  <span className="text-gray-400">Trigger: {rule.threshold}</span>
                </div>
                <div className="text-bee-400">
                  Dispatched Channels: <strong className="text-gray-300">{rule.routing}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: DELIVERY RECEIPTS */}
      {activeTab === 'HISTORY' && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3 font-mono">
            Notification Dispatch Receipts Log
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notificationsHistory.map((notif) => (
              <div key={notif.id} className="p-3.5 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs font-mono flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${notif.isBuzz ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                  <div>
                    <span className="text-white font-bold">{notif.service}</span> • <span className="text-gray-400">{notif.channel}</span>
                    <div className="text-[11px] text-gray-500 mt-0.5">Recipient: {notif.recipient} ({notif.incident})</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                    {notif.status}
                  </span>
                  <div className="text-[10px] text-gray-500 mt-0.5">{notif.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
