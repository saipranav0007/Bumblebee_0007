'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBumblebee } from '../../lib/store';
import { playClickSound } from '../../lib/sound';
import { 
  Activity, 
  Layers, 
  AlertTriangle, 
  Brain, 
  Workflow, 
  Code, 
  Bell, 
  Users, 
  FileText, 
  Shield, 
  Settings, 
  HelpCircle, 
  Search, 
  Flame, 
  Moon, 
  Sun, 
  HardHat, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink,
  Sparkles,
  Gauge,
  Radio,
  Clock,
  Cpu,
  Zap,
  Globe2
} from 'lucide-react';

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { 
    currentOrg, 
    currentUser, 
    metrics, 
    triggerBuzzAlert, 
    theme, 
    setTheme, 
    setIsCommandPaletteOpen,
    isLiveChecking 
  } = useBumblebee();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleThemeChange = (newTheme) => {
    playClickSound();
    setTheme(newTheme);
  };

  const navGroups = [
    {
      title: "OPERATIONS",
      items: [
        { name: "Overview", href: "/app/overview", icon: Activity },
        { name: "Monitors", href: "/app/monitors", icon: Radio, count: metrics.totalMonitored },
        { name: "APIs & Services", href: "/app/apis", icon: Code },
        { name: "Incident Center", href: "/app/incidents", icon: AlertTriangle, count: metrics.activeIncidentsCount, countColor: "bg-red-500 text-white animate-pulse" },
      ]
    },
    {
      title: "INTELLIGENCE",
      items: [
        { name: "AI Analyst", href: "/app/intelligence", icon: Brain, badge: "AI", badgeColor: "text-bee-400 bg-bee-500/10 border-bee-500/30" },
        { name: "Synthetic Tests", href: "/app/synthetic", icon: Workflow },
        { name: "Observability", href: "/app/observability", icon: Gauge },
        { name: "SLA & Downtime", href: "/app/sla", icon: Clock },
      ]
    },
    {
      title: "COMMUNICATION & OPS",
      items: [
        { name: "Buzz & Alerts", href: "/app/communication", icon: Bell },
        { name: "Public Status Page", href: "/app/status-pages", icon: Layers },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { name: "Team & RBAC", href: "/app/team", icon: Users },
        { name: "Audit Trail", href: "/app/audit-logs", icon: Shield },
        { name: "Settings & Vault", href: "/app/settings", icon: Settings },
        { name: "Help & Specs", href: "/app/help", icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col md:flex-row font-sans transition-colors duration-200">
      
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--bg-surface)] backdrop-blur-xl sticky top-0 z-30">
        <Link href="/app/overview" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-bee-500 flex items-center justify-center text-black font-bold shadow-glow-amber">
            🐝
          </div>
          <span className="font-bold text-[var(--text-primary)] font-mono text-sm tracking-tight">BUMBLEBEE</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Switcher */}
          <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-0.5">
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-1 rounded text-xs transition-all ${theme === 'dark' ? 'bg-bee-500 text-black font-bold' : 'text-[var(--text-muted)]'}`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-1 rounded text-xs transition-all ${theme === 'light' ? 'bg-amber-500 text-white font-bold' : 'text-[var(--text-muted)]'}`}
              title="Lighting Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('worker')}
              className={`p-1 rounded text-xs transition-all ${theme === 'worker' ? 'bg-yellow-400 text-black font-bold' : 'text-[var(--text-muted)]'}`}
              title="Worker Mode"
            >
              <HardHat className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => triggerBuzzAlert()}
            className="p-1.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-400 text-xs shadow-glow-critical"
            title="Buzz Alert"
          >
            <Flame className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[var(--bg-surface)] border-r border-[var(--border-color)] flex flex-col justify-between shrink-0 transition-all md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Workspace Brand Selector */}
        <div>
          <div className="p-4 border-b border-[var(--border-color)]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
                🐝
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-[var(--text-primary)] font-mono flex items-center gap-1.5">
                  BUMBLEBEE
                </span>
                <span className="block text-[10px] text-[var(--text-muted)] font-mono -mt-0.5">
                  SaaS Observability
                </span>
              </div>
            </Link>

            {/* Org Switcher Box */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-between shadow-sm">
              <div className="truncate">
                <div className="text-xs font-bold text-[var(--text-primary)] truncate">{currentOrg.name}</div>
                <div className="text-[10px] text-bee-500 font-mono font-semibold">{currentOrg.plan} • 99.95% SLA</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)] text-xs">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="px-2.5 mb-1.5 text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-bee-500/15 text-bee-500 border border-bee-500/40 font-bold shadow-sm'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-bee-500' : 'text-[var(--text-muted)]'}`} />
                          <span>{item.name}</span>
                        </div>

                        {item.count !== undefined && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                            item.countColor || 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)]'
                          }`}>
                            {item.count}
                          </span>
                        )}

                        {item.badge && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User Footer & Theme Controls */}
        <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-0.5">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-1.5 rounded text-xs transition-all flex items-center gap-1 ${
                  theme === 'dark' ? 'bg-bee-500 text-black font-bold shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Obsidian Dark Command Center"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-1.5 rounded text-xs transition-all flex items-center gap-1 ${
                  theme === 'light' ? 'bg-amber-500 text-white font-bold shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Solar Lighting Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleThemeChange('worker')}
                className={`p-1.5 rounded text-xs transition-all flex items-center gap-1 ${
                  theme === 'worker' ? 'bg-yellow-400 text-black font-bold shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="🐝 Worker Hive HUD Mode"
              >
                <HardHat className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {theme.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-lg bg-bee-500/20 text-bee-500 font-bold text-xs flex items-center justify-center border border-bee-500/30">
                AM
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[var(--text-primary)] truncate">{currentUser.name}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono truncate">{currentUser.role}</div>
              </div>
            </div>
            
            <Link href="/auth/signin" className="text-[var(--text-muted)] hover:text-red-400 text-xs p-1" title="Sign Out">
              <X className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-primary)]">
        
        {/* Live Multi-Region Worker Telemetry Ribbon */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              QUORUM WORKER ACTIVE
            </span>
            <span className="text-[var(--border-color)]">|</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Globe2 className="w-3 h-3 text-bee-500" /> US-East: <strong className="text-[var(--text-primary)]">24ms</strong>
              </span>
              <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Globe2 className="w-3 h-3 text-blue-400" /> EU-Central: <strong className="text-[var(--text-primary)]">38ms</strong>
              </span>
              <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Globe2 className="w-3 h-3 text-emerald-400" /> AP-South: <strong className="text-[var(--text-primary)]">12ms</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[var(--text-secondary)]">
              <Cpu className="w-3 h-3 text-bee-500" /> 8 Workers Running
            </span>
            <span className="text-[var(--border-color)]">|</span>
            <span className="text-bee-500 font-bold">
              {metrics.checksCountToday.toLocaleString()} Probes Verified
            </span>
          </div>
        </div>

        {/* Top Command Bar */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/80 backdrop-blur-xl sticky top-0 z-20">
          
          {/* Quick Search Shortcut */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3.5 py-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:text-[var(--text-primary)] hover:border-bee-500/50 transition-all w-80 font-mono text-left shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-bee-500 shrink-0" />
            <span>Search monitors, incidents, AI...</span>
            <kbd className="ml-auto px-1.5 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded text-[10px] text-[var(--text-muted)]">⌘K</kbd>
          </button>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* 3-Mode Segmented Theme Switcher */}
            <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1 gap-1 shadow-sm">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  theme === 'dark'
                    ? 'bg-bee-500 text-black font-bold shadow-glow-amber'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Obsidian Dark"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>

              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  theme === 'light'
                    ? 'bg-amber-500 text-white font-bold shadow-md'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Solar Lighting"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Lighting</span>
              </button>

              <button
                onClick={() => handleThemeChange('worker')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  theme === 'worker'
                    ? 'bg-yellow-400 text-black font-bold shadow-glow-worker'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Worker Hive HUD"
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>Worker</span>
              </button>
            </div>

            {/* Signature Buzz Alert Trigger */}
            <button
              onClick={() => triggerBuzzAlert()}
              className="flex items-center gap-1.5 bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-500/50 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-glow-critical"
              title="Test the Signature Buzz Alert"
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Buzz Alert 🐝</span>
            </button>

            {/* AI Assistant Quick Link */}
            <Link
              href="/app/intelligence"
              className="flex items-center gap-1.5 bg-bee-500/10 hover:bg-bee-500/20 text-bee-500 border border-bee-500/30 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Analyst</span>
            </Link>

            {/* Status page public link */}
            <Link
              href="/status/acme-cloud"
              target="_blank"
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-card)] transition-colors"
              title="Open Public Status Page"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

        </header>

        {/* Page Inner Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
