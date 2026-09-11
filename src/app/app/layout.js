'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBumblebee } from '../../lib/store';
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
  Clock
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
    <div className="min-h-screen bg-obsidian-950 text-white flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-obsidian-800 bg-obsidian-900/90 backdrop-blur-xl sticky top-0 z-30">
        <Link href="/app/overview" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-bee-500 flex items-center justify-center text-black font-bold">
            🐝
          </div>
          <span className="font-bold text-white font-mono text-sm tracking-tight">BUMBLEBEE</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerBuzzAlert()}
            className="p-1.5 rounded-lg bg-red-950 border border-red-500/40 text-red-400 text-xs"
            title="Buzz Alert"
          >
            <Flame className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg bg-obsidian-800 text-gray-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-obsidian-900/95 border-r border-obsidian-800 flex flex-col justify-between shrink-0 transition-transform md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Workspace Brand Selector */}
        <div>
          <div className="p-4 border-b border-obsidian-800/80">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
                🐝
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white font-mono flex items-center gap-1.5">
                  BUMBLEBEE
                </span>
                <span className="block text-[10px] text-gray-400 font-mono -mt-0.5">
                  SaaS Observability
                </span>
              </div>
            </Link>

            {/* Org Switcher Box */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-obsidian-950 border border-obsidian-800 flex items-center justify-between">
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{currentOrg.name}</div>
                <div className="text-[10px] text-bee-400 font-mono">{currentOrg.plan} • 99.95% SLA</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-210px)] text-xs">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="px-2.5 mb-1.5 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
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
                            ? 'bg-bee-500/15 text-bee-400 border border-bee-500/30 font-semibold shadow-sm'
                            : 'text-gray-300 hover:bg-obsidian-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-bee-400' : 'text-gray-400'}`} />
                          <span>{item.name}</span>
                        </div>

                        {item.count !== undefined && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                            item.countColor || 'bg-obsidian-800 text-gray-400'
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
        <div className="p-3 border-t border-obsidian-800 bg-obsidian-950/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-obsidian-900 border border-obsidian-800 rounded-lg p-0.5">
              <button
                onClick={() => setTheme('dark')}
                className={`p-1 rounded text-xs ${theme === 'dark' ? 'bg-obsidian-750 text-bee-400' : 'text-gray-400 hover:text-white'}`}
                title="Dark Command Center"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('worker')}
                className={`p-1 rounded text-xs ${theme === 'worker' ? 'bg-bee-500 text-black font-bold' : 'text-gray-400 hover:text-bee-400'}`}
                title="🐝 Worker Mode (Bumblebee Mode)"
              >
                <HardHat className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-1 rounded text-xs ${theme === 'light' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-lg bg-bee-500/20 text-bee-400 font-bold text-xs flex items-center justify-center border border-bee-500/30">
                AM
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-gray-400 font-mono truncate">{currentUser.role}</div>
              </div>
            </div>
            
            <Link href="/auth/signin" className="text-gray-500 hover:text-red-400 text-xs p-1" title="Sign Out">
              <X className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-obsidian-950">
        
        {/* Top Command Bar */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b border-obsidian-800 bg-obsidian-900/60 backdrop-blur-xl sticky top-0 z-20">
          
          {/* Quick Search Shortcut */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3.5 py-1.5 text-xs text-gray-400 bg-obsidian-950 border border-obsidian-800 rounded-xl hover:text-white hover:border-obsidian-700 transition-all w-80 font-mono text-left"
          >
            <Search className="w-3.5 h-3.5 text-bee-400 shrink-0" />
            <span>Search monitors, incidents, AI...</span>
            <kbd className="ml-auto px-1.5 py-0.5 bg-obsidian-900 border border-obsidian-800 rounded text-[10px] text-gray-400">⌘K</kbd>
          </button>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Live Watchdog Status */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-gray-300">Watchdog:</span>
              <span className="text-emerald-400 font-bold">30s Interval</span>
            </div>

            {/* Signature Buzz Alert Trigger */}
            <button
              onClick={() => triggerBuzzAlert()}
              className="flex items-center gap-1.5 bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-glow-critical"
              title="Test the Signature Buzz Alert"
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Buzz Alert 🐝</span>
            </button>

            {/* AI Assistant Quick Link */}
            <Link
              href="/app/intelligence"
              className="flex items-center gap-1.5 bg-bee-500/10 hover:bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Analyst</span>
            </Link>

            {/* Status page public link */}
            <Link
              href="/status/acme-cloud"
              target="_blank"
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-obsidian-800 transition-colors"
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
