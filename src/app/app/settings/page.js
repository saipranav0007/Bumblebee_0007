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
  Globe,
  Palette,
  Sparkles
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

  const handleThemeChange = (newTheme) => {
    playClickSound();
    setTheme(newTheme);
    setNotificationStatus(`Theme switched to: ${newTheme.toUpperCase()}`);
    setTimeout(() => setNotificationStatus(''), 2500);
  };

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
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2 font-mono">
              <span>Platform Settings & Vault</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-500 border border-bee-500/30 text-xs">
                <Settings className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono">
            Customize theme modes, rotate zero-knowledge secret references, and configure SSRF security guards.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-mono shadow-sm">
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
                activeTab === tab.id ? 'bg-bee-500 text-black shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
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
          <div className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl text-xs font-mono text-[var(--text-muted)] shadow-sm">
            <span className="text-bee-500 font-bold block mb-1">THEME ARCHITECTURE:</span>
            Bumblebee supports three distinct UX modes. Switch below to instantly preview the Obsidian Dark tactical command cockpit, Solar Titanium studio lighting, or the Hive Matrix Worker mode.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Mode 1: Dark Theme */}
            <div
              onClick={() => handleThemeChange('dark')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                theme === 'dark'
                  ? 'bg-[var(--bg-card)] border-bee-500 shadow-glow-amber scale-105 ring-2 ring-bee-500/20'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-bee-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-obsidian-900 border border-obsidian-700 text-bee-400 shadow">
                  <Moon className="w-6 h-6" />
                </div>
                {theme === 'dark' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bee-500 text-black">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mt-4">Obsidian Dark</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Cyber tactical command center with deep obsidian midnight surfaces and amber glow telemetry.
              </p>
            </div>

            {/* Mode 2: Light / Solar Theme */}
            <div
              onClick={() => handleThemeChange('light')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                theme === 'light'
                  ? 'bg-[var(--bg-card)] border-amber-500 shadow-xl scale-105 ring-2 ring-amber-500/30'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shadow">
                  <Sun className="w-6 h-6" />
                </div>
                {theme === 'light' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-white shadow-sm">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mt-4">Solar Lighting</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Crisp alabaster executive studio lighting with warm champagne accents for daytime operations.
              </p>
            </div>

            {/* Mode 3: Worker Mode (Hive Matrix) */}
            <div
              onClick={() => handleThemeChange('worker')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                theme === 'worker'
                  ? 'bg-[var(--bg-card)] border-yellow-400 shadow-glow-worker scale-105 ring-2 ring-yellow-400/40'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-yellow-400/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow">
                  <HardHat className="w-6 h-6" />
                </div>
                {theme === 'worker' && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-400 text-black animate-pulse">
                    🐝 WORKER ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mt-4 flex items-center gap-1.5">
                <span>Hive Matrix</span>
                <span className="text-[10px] text-yellow-400 font-mono">(Worker Mode)</span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                High-voltage industrial carbon HUD with active worker telemetry, scanlines, and honeycomb mesh.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SUB-VIEW 2: SECRET VAULT */}
      {activeTab === 'VAULT' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-bee-500" />
                <span>Zero-Exposition Credential Vault</span>
              </h3>
              <span className="text-xs text-[var(--text-muted)] font-mono">Encrypted with AES-256-GCM. Unencrypted secrets are never exposed in UI or logs.</span>
            </div>
          </div>

          <div className="space-y-3">
            {secrets.map((sec) => (
              <div key={sec.id} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-[var(--text-primary)]">{sec.name}</strong>
                    <span className="text-bee-500 bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                      {sec.maskedValue}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Last Rotated: {sec.lastRotated} by {sec.issuer}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRotateSecret(sec.id)}
                    className="flex items-center gap-1 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-bee-500 px-3 py-1.5 rounded-lg transition-all shadow-sm"
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
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Hardened SSRF & Network Security Parameters</span>
          </h3>

          <div className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono text-[var(--text-secondary)] space-y-1">
            <span className="text-emerald-500 font-bold block">ACTIVE BLOCKLIST POLICY:</span>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)] text-[11px]">
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
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3 font-mono">
            Organization Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[var(--text-muted)] uppercase mb-1">Organization Name</label>
              <input
                type="text"
                value={currentOrg.name}
                disabled
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] uppercase mb-1">Plan Tier</label>
              <input
                type="text"
                value={currentOrg.plan}
                disabled
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-bee-500 font-bold"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
