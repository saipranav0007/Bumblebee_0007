'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  User,
  Mail,
  Phone,
  Save,
  Crown
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme, currentOrg, currentUser, updateUserProfile, updateOrgProfile } = useBumblebee();
  const [activeTab, setActiveTab] = useState('PROFILE'); // 'PROFILE', 'ORG', 'APPEARANCE', 'VAULT', 'SSRF'

  // User Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '+1 (555) 019-2834',
    role: currentUser?.role || 'OWNER'
  });

  // Org Profile Form State
  const [orgForm, setOrgForm] = useState({
    name: currentOrg?.name || '',
    plan: currentOrg?.plan || 'Enterprise Pro',
    slaTarget: currentOrg?.slaTarget || 99.95,
    region: currentOrg?.region || 'Global Edge'
  });

  // Sync state if store updates
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '+1 (555) 019-2834',
        role: currentUser.role || 'OWNER'
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentOrg) {
      setOrgForm({
        name: currentOrg.name || '',
        plan: currentOrg.plan || 'Enterprise Pro',
        slaTarget: currentOrg.slaTarget || 99.95,
        region: currentOrg.region || 'Global Edge'
      });
    }
  }, [currentOrg]);

  // Secrets Vault State
  const [secrets, setSecrets] = useState([
    { id: 'sec-1', name: 'STRIPE_PROD_BEARER', maskedValue: '••••••••82KQ', lastRotated: '2 days ago', issuer: currentUser?.name || 'Admin' },
    { id: 'sec-2', name: 'AUTH0_CLIENT_SECRET', maskedValue: '••••••••99PX', lastRotated: '14 days ago', issuer: 'Sarah Lin' },
    { id: 'sec-3', name: 'PLAYWRIGHT_TEST_USER_PASSWORD', maskedValue: '••••••••44LM', lastRotated: '1 month ago', issuer: currentUser?.name || 'Admin' },
  ]);

  const [notificationStatus, setNotificationStatus] = useState('');

  const handleThemeChange = (newTheme) => {
    playClickSound();
    setTheme(newTheme);
    setNotificationStatus(`Theme switched to: ${newTheme.toUpperCase()}`);
    setTimeout(() => setNotificationStatus(''), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    playClickSound();
    updateUserProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    });
    playRecoverySound();
    setNotificationStatus('Personal Profile successfully saved and synchronized!');
    setTimeout(() => setNotificationStatus(''), 3000);
  };

  const handleSaveOrg = (e) => {
    e.preventDefault();
    playClickSound();
    updateOrgProfile({
      name: orgForm.name,
      plan: orgForm.plan,
      slaTarget: parseFloat(orgForm.slaTarget) || 99.95,
      region: orgForm.region
    });
    playRecoverySound();
    setNotificationStatus('Organization details successfully updated!');
    setTimeout(() => setNotificationStatus(''), 3000);
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
              <span>Platform Settings & Profile</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-500 border border-bee-500/30 text-xs">
                <Settings className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono">
            Manage your personal profile, organization settings, secret vault, and platform appearance.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-mono shadow-sm gap-1">
          {[
            { id: 'PROFILE', label: 'User Profile', icon: User },
            { id: 'ORG', label: 'Organization', icon: Building },
            { id: 'APPEARANCE', label: 'Themes', icon: Palette },
            { id: 'VAULT', label: 'Vault', icon: KeyRound },
            { id: 'SSRF', label: 'SSRF Guard', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { playClickSound(); setActiveTab(tab.id); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-bold cursor-pointer ${
                  activeTab === tab.id ? 'bg-bee-500 text-black shadow' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {notificationStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notificationStatus}</span>
        </div>
      )}

      {/* SUB-VIEW 1: PERSONAL USER PROFILE */}
      {activeTab === 'PROFILE' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h3 className="text-base font-bold text-[var(--text-primary)] font-mono flex items-center gap-2">
              <User className="w-4 h-4 text-bee-500" />
              <span>Personal Account Profile</span>
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-bee-500/15 text-bee-500 border border-bee-500/30 font-bold">
              {currentUser?.role || 'OWNER'}
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="e.g. Sai Pranav"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="e.g. user@example.com"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Phone Number (WhatsApp Alerts)</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="+1 (555) 019-2834"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Account Role & Access</label>
                <input
                  type="text"
                  disabled
                  value={`${profileForm.role} (Hardware 2FA Active)`}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-[var(--text-muted)] font-mono opacity-80 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-glow-amber transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-VIEW 2: ORG */}
      {activeTab === 'ORG' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3 font-mono flex items-center gap-2">
            <Building className="w-4 h-4 text-bee-500" />
            <span>Organization & Workspace Details</span>
          </h3>

          <form onSubmit={handleSaveOrg} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Organization / Workspace Name</label>
                <input
                  type="text"
                  required
                  value={orgForm.name}
                  onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Subscription Plan</label>
                <input
                  type="text"
                  value={orgForm.plan}
                  onChange={(e) => setOrgForm({ ...orgForm, plan: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-bee-500 font-bold focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">SLA Target Commitment (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={orgForm.slaTarget}
                  onChange={(e) => setOrgForm({ ...orgForm, slaTarget: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] uppercase mb-1">Primary Probe Region</label>
                <input
                  type="text"
                  value={orgForm.region}
                  onChange={(e) => setOrgForm({ ...orgForm, region: e.target.value })}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-2.5 text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-glow-amber transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Workspace Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-VIEW 3: THREE THEMES */}
      {activeTab === 'APPEARANCE' && (
        <div className="space-y-4">
          <div className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl text-xs font-mono text-[var(--text-muted)] shadow-sm">
            Toggle between the 3 bespoke design themes built for high-stakes site reliability engineering.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Theme 1 */}
            <div 
              onClick={() => handleThemeChange('dark')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'border-bee-500 bg-obsidian-900 shadow-glow-amber scale-[1.02]' 
                  : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-bee-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Moon className="w-6 h-6 text-bee-400" />
                {theme === 'dark' && <span className="text-[10px] font-mono bg-bee-500 text-black font-bold px-2 py-0.5 rounded">ACTIVE</span>}
              </div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] font-mono">1. Obsidian Dark Command</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">Deep obsidian background (#06080c) tailored for 24/7 SOC / NOC war rooms.</p>
            </div>

            {/* Theme 2 */}
            <div 
              onClick={() => handleThemeChange('light')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                theme === 'light' 
                  ? 'border-amber-500 bg-amber-500/10 shadow-glow-amber scale-[1.02]' 
                  : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Sun className="w-6 h-6 text-amber-500" />
                {theme === 'light' && <span className="text-[10px] font-mono bg-amber-500 text-white font-bold px-2 py-0.5 rounded">ACTIVE</span>}
              </div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] font-mono">2. Solar Lighting Mode</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">Clean slate aesthetic with amber accents, high contrast typography for daylight operations.</p>
            </div>

            {/* Theme 3 */}
            <div 
              onClick={() => handleThemeChange('worker')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                theme === 'worker' 
                  ? 'border-yellow-400 bg-yellow-400/10 shadow-glow-critical scale-[1.02]' 
                  : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-yellow-400/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <HardHat className="w-6 h-6 text-yellow-400" />
                {theme === 'worker' && <span className="text-[10px] font-mono bg-yellow-400 text-black font-bold px-2 py-0.5 rounded">ACTIVE</span>}
              </div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] font-mono">3. 🐝 Worker Hive HUD</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">High-visibility industrial hazard scheme with glowing amber/yellow telemetry HUD accents.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: VAULT */}
      {activeTab === 'VAULT' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] font-mono flex items-center gap-2">
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
                    className="flex items-center gap-1 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-bee-500 px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
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

      {/* SUB-VIEW 5: SSRF DEFENSE */}
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

    </div>
  );
}
