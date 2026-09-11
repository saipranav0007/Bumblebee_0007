'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { playClickSound, playRecoverySound } from '../../../lib/sound';
import { 
  Settings, 
  Moon, 
  Sun, 
  HardHat, 
  KeyRound, 
  ShieldCheck, 
  EyeOff, 
  RotateCw, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  Building, 
  Sliders, 
  Lock,
  Flame,
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme, currentOrg } = useBumblebee();
  const [activeTab, setActiveTab] = useState('APPEARANCE'); // 'APPEARANCE', 'VAULT', 'SSRF', 'ORG'

  // Secrets Vault State
  const [secrets, setSecrets] = useState([
    { id: 'sec-1', name: 'STRIPE_PROD_BEARER', maskedValue: '••••••••82KQ', lastRotated: '2 days ago', issuer: 'Alex Mercer' },
    { id: 'sec-2', name: 'AUTH0_CLIENT_SECRET', maskedValue: '••••••••99PX', lastRotated: '14 days ago', issuer: 'Sarah Lin' },
    { id: 'sec-3', name: 'PLAYWRIGHT_TEST_USER_PASSWORD', maskedValue: '••••••••44LM', lastRotated: '1 month ago', issuer: 'Alex Mercer' },
  ]);

  const [notificationStatus, setNotificationStatus] = useState('');

  const handleRotateSecret = (secId) => {
    playClickSound();
    setSecrets(secrets.map(s => s.id === secId ? { ...s, maskedValue: `••••••••${Math.random().toString(36).substring(2, 6).toUpperCase()}`, lastRotated: 'just now' } : s));
    playRecoverySound();
    setNotificationStatus('Secret token rotated & re-encrypted with AES-256-GCM.');
    setTimeout(() => setNotificationStatus(''), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Platform Settings & Vault</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
                <Settings className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Customize theme modes, rotate zero-knowledge secret references, and configure SSRF security guards.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-obsidian-900 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
          {[
            { id: 'APPEARANCE', label: 'Three Themes' },
            { id: 'VAULT', label: 'Secret Vault' },
            { id: 'SSRF', label: 'SSRF Defense' },
            { id: 'ORG', label: 'Organization' },
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

      {notificationStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notificationStatus}</span>
        </div>
      )}

      {/* SUB-VIEW 1: THREE THEMES */}
      {activeTab === 'APPEARANCE' && (
        <div className="space-y-4">
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 rounded-2xl text-xs font-mono text-gray-400">
            <span className="text-bee-400 font-bold block mb-1">THEME ARCHITECTURE:</span>
            Bumblebee supports three full-stack themes. Preference is stored locally and applied across the command center, alerts, and graphs.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Dark Theme */}
            <div
              onClick={() => { playClickSound(); setTheme('dark'); }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                theme === 'dark'
                  ? 'bg-obsidian-900 border-bee-500 shadow-glow-amber scale-105'
                  : 'bg-obsidian-900/60 border-obsidian-800 hover:border-obsidian-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-obsidian-800 text-bee-400">
                  <Moon className="w-5 h-5" />
                </div>
                {theme === 'dark' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bee-500 text-black">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white mt-4">Dark Command Center</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Obsidian black surfaces with subtle amber glows and high-contrast telemetry.
              </p>
            </div>

            {/* Worker Mode (Bumblebee Mode) */}
            <div
              onClick={() => { playClickSound(); setTheme('worker'); }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                theme === 'worker'
                  ? 'bg-worker-card border-worker-accent shadow-glow-worker scale-105'
                  : 'bg-obsidian-900/60 border-obsidian-800 hover:border-obsidian-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
                  <HardHat className="w-5 h-5" />
                </div>
                {theme === 'worker' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-400 text-black animate-pulse">
                    🐝 WORKER ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white mt-4 flex items-center gap-1.5">
                <span>Worker Mode</span>
                <span className="text-[10px] text-yellow-400 font-mono">(Bumblebee Mode)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Tactical high-visibility carbon with active worker indicators and energetic honeycomb grid.
              </p>
            </div>

            {/* Light / Bright Theme */}
            <div
              onClick={() => { playClickSound(); setTheme('light'); }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                theme === 'light'
                  ? 'bg-slate-800 border-white shadow-xl scale-105'
                  : 'bg-obsidian-900/60 border-obsidian-800 hover:border-obsidian-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white/10 text-white">
                  <Sun className="w-5 h-5" />
                </div>
                {theme === 'light' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-black">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white mt-4">Light / Bright</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Clean alabaster background with crisp warm gold accents for daytime incident management.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SUB-VIEW 2: SECRET VAULT */}
      {activeTab === 'VAULT' && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-obsidian-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-bee-400" />
                <span>Zero-Exposition Credential Vault</span>
              </h3>
              <span className="text-xs text-gray-400 font-mono">Encrypted with AES-256-GCM. Unencrypted secrets are never exposed in UI or logs.</span>
            </div>
          </div>

          <div className="space-y-3">
            {secrets.map((sec) => (
              <div key={sec.id} className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white">{sec.name}</strong>
                    <span className="text-bee-400 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-800">
                      {sec.maskedValue}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Last Rotated: {sec.lastRotated} by {sec.issuer}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRotateSecret(sec.id)}
                    className="flex items-center gap-1 bg-obsidian-900 hover:bg-obsidian-800 border border-obsidian-700 text-bee-400 hover:text-bee-300 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate Secret</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: SSRF DEFENSE */}
      {activeTab === 'SSRF' && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Hardened SSRF & Network Security Parameters</span>
          </h3>

          <div className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-300 space-y-1">
            <span className="text-emerald-400 font-bold block">ACTIVE BLOCKLIST POLICY:</span>
            <ul className="list-disc pl-5 space-y-1 text-gray-400 text-[11px]">
              <li>Loopback addresses: <code>127.0.0.0/8</code>, <code>::1</code>, <code>localhost</code></li>
              <li>Private RFC1918 subnets: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code></li>
              <li>Cloud metadata endpoints: <code>169.254.169.254</code> (AWS/GCP/Azure IMDS), <code>metadata.google.internal</code></li>
              <li>DNS Rebinding Protection: Multi-round A/AAAA record resolution before socket dispatch.</li>
            </ul>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: ORG */}
      {activeTab === 'ORG' && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-obsidian-800 pb-3 font-mono">
            Organization Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-gray-400 uppercase mb-1">Organization Name</label>
              <input
                type="text"
                value={currentOrg.name}
                disabled
                className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 uppercase mb-1">Plan Tier</label>
              <input
                type="text"
                value={currentOrg.plan}
                disabled
                className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-2.5 text-bee-400 font-bold"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
