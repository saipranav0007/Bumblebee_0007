'use client';

import React, { useState, useEffect } from 'react';
import { useBumblebee } from '../../lib/store';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Activity, 
  AlertTriangle, 
  PlusCircle, 
  Brain, 
  Shield, 
  Sliders, 
  Users, 
  Terminal, 
  Flame,
  Moon,
  Sun,
  HardHat,
  X
} from 'lucide-react';

export default function CommandPalette() {
  const router = useRouter();
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    monitors, 
    incidents, 
    triggerBuzzAlert,
    theme,
    setTheme
  } = useBumblebee();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickActions = [
    {
      id: 'act-add',
      title: 'Add New Monitor',
      category: 'Actions',
      icon: PlusCircle,
      action: () => router.push('/app/monitors?action=add')
    },
    {
      id: 'act-buzz',
      title: 'Test Signature 🐝 Buzz Alert',
      category: 'Actions',
      icon: Flame,
      action: () => triggerBuzzAlert()
    },
    {
      id: 'act-ai',
      title: 'Ask Bumblebee AI Analyst',
      category: 'Intelligence',
      icon: Brain,
      action: () => router.push('/app/intelligence')
    },
    {
      id: 'act-theme-worker',
      title: 'Switch to 🐝 Worker Mode (Bumblebee Mode)',
      category: 'Appearance',
      icon: HardHat,
      action: () => setTheme('worker')
    },
    {
      id: 'act-theme-dark',
      title: 'Switch to 🌙 Dark Mode',
      category: 'Appearance',
      icon: Moon,
      action: () => setTheme('dark')
    },
    {
      id: 'act-theme-light',
      title: 'Switch to ☀️ Light / Bright Mode',
      category: 'Appearance',
      icon: Sun,
      action: () => setTheme('light')
    },
    {
      id: 'act-team',
      title: 'Manage Team & RBAC Permissions',
      category: 'Management',
      icon: Users,
      action: () => router.push('/app/team')
    },
    {
      id: 'act-status',
      title: 'View Public Status Page',
      category: 'Observability',
      icon: Activity,
      action: () => router.push('/status/acme-cloud')
    }
  ];

  const filteredMonitors = monitors
    .filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.url.toLowerCase().includes(query.toLowerCase()))
    .map(m => ({
      id: m.id,
      title: m.name,
      category: 'Monitors',
      subtitle: `${m.type} • ${m.url}`,
      icon: Activity,
      action: () => router.push('/app/monitors')
    }));

  const filteredIncidents = incidents
    .filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase()))
    .map(i => ({
      id: i.id,
      title: `${i.id}: ${i.title}`,
      category: 'Incidents',
      subtitle: `${i.severity} • ${i.errorType}`,
      icon: AlertTriangle,
      action: () => router.push('/app/incidents')
    }));

  const filteredActions = quickActions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  const allItems = [...filteredActions, ...filteredMonitors, ...filteredIncidents];

  const handleSelect = (item) => {
    setIsCommandPaletteOpen(false);
    item.action();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-obsidian-900 border border-obsidian-700 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-obsidian-700/80 bg-obsidian-950/60">
          <Search className="w-5 h-5 text-bee-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command, search monitors, incidents, or ask AI... (ESC to close)"
            className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm font-sans"
            autoFocus
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-gray-500 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {allItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No matching commands or resources found for "{query}"
            </div>
          ) : (
            allItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    isSelected ? 'bg-bee-500/15 text-white border border-bee-500/30' : 'text-gray-300 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-bee-500/20 text-bee-400' : 'bg-obsidian-800 text-gray-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs text-gray-400 font-mono truncate max-w-md">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase px-2 py-0.5 rounded bg-obsidian-950">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-obsidian-950 border-t border-obsidian-800 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-obsidian-800 rounded text-gray-300">↑↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-obsidian-800 rounded text-gray-300">↵</kbd> to select</span>
            <span><kbd className="px-1.5 py-0.5 bg-obsidian-800 rounded text-gray-300">ESC</kbd> to exit</span>
          </div>
          <div className="flex items-center gap-1 text-bee-400 font-mono">
            <span>🐝 BUMBLEBEE PALETTE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
