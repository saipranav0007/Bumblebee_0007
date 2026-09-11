'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { 
  Radio, 
  Search, 
  PlusCircle, 
  Play, 
  Pause, 
  RefreshCw, 
  Clock, 
  Globe, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Layers, 
  ExternalLink,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import AddMonitorModal from '../../../components/monitors/AddMonitorModal';

export default function MonitorsPage() {
  const { 
    monitors, 
    runManualCheck, 
    toggleMonitorPause, 
    metrics 
  } = useBumblebee();

  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('status'); // 'status', 'name', 'responseTime', 'uptime'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);

  const filteredMonitors = monitors
    .filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.url.toLowerCase().includes(search.toLowerCase()) ||
                          m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      if (filter === 'ALL') return matchSearch;
      if (filter === 'HEALTHY') return matchSearch && m.status === 'OPERATIONAL';
      return matchSearch && m.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'responseTime') return b.responseTime - a.responseTime;
      if (sortBy === 'uptime') return a.uptime - b.uptime;
      // Default status priority: DOWN > DEGRADED > OPERATIONAL > MAINTENANCE > PAUSED
      const statusOrder = { DOWN: 1, DEGRADED: 2, OPERATIONAL: 3, MAINTENANCE: 4, PAUSED: 5 };
      return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Monitors & Health Watchdogs
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-bee-500/10 text-bee-400 border border-bee-500/30 text-xs font-mono font-bold">
              {metrics.totalMonitored} Configured
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Autonomous multi-region probe workers running continuous 30-second verification loops.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Monitor</span>
        </button>
      </div>

      {/* Control Toolbar */}
      <div className="bg-obsidian-900 border border-obsidian-800 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service name, URL, or tag..."
            className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-obsidian-950 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
            {['ALL', 'HEALTHY', 'DEGRADED', 'DOWN', 'MAINTENANCE'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filter === f ? 'bg-bee-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-obsidian-950 px-3 py-1.5 rounded-xl border border-obsidian-800 text-xs font-mono text-gray-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-bee-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="status" className="bg-obsidian-900">Sort: Severity Status</option>
              <option value="responseTime" className="bg-obsidian-900">Sort: Response Time</option>
              <option value="uptime" className="bg-obsidian-900">Sort: Uptime %</option>
              <option value="name" className="bg-obsidian-900">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Monitors Cards / Table */}
      <div className="space-y-3">
        {filteredMonitors.length === 0 ? (
          monitors.length === 0 ? (
            <div className="p-12 text-center bg-obsidian-900/90 border border-obsidian-800 rounded-2xl shadow-xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-bee-500/10 border border-bee-500/30 text-bee-400 mx-auto flex items-center justify-center shadow-glow-amber">
                <Radio className="w-8 h-8 animate-pulse" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-white">No Monitors Configured Yet</h3>
                <p className="text-xs text-gray-400 font-mono">
                  Get started by adding your first service, API endpoint, or website watchdog to monitor uptime and latency from 4 global regions.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-glow-amber transition-all hover:scale-105"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Your First Monitor</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-obsidian-900/60 border border-obsidian-800 rounded-2xl text-gray-400 font-mono text-sm">
              No monitors matched filter "{filter}" with search query "{search}".
            </div>
          )
        ) : (
          filteredMonitors.map((m) => (
            <div
              key={m.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                m.status === 'DOWN'
                  ? 'bg-red-950/25 border-red-500/60 shadow-glow-critical'
                  : m.status === 'DEGRADED'
                  ? 'bg-amber-950/20 border-amber-500/50'
                  : 'bg-obsidian-900/90 border-obsidian-800 hover:border-obsidian-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                
                {/* Left: Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <span className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                    m.status === 'DOWN' ? 'bg-red-500 animate-ping' :
                    m.status === 'DEGRADED' ? 'bg-amber-400 animate-pulse' :
                    m.status === 'MAINTENANCE' ? 'bg-blue-400' :
                    m.status === 'PAUSED' ? 'bg-gray-500' :
                    'bg-emerald-400'
                  }`} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white truncate">
                        {m.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 border border-obsidian-800 text-gray-400">
                        {m.type}
                      </span>
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        m.status === 'DOWN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        m.status === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        m.status === 'MAINTENANCE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        m.status === 'PAUSED' ? 'bg-gray-800 text-gray-400' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 font-mono mt-1 truncate">
                      {m.url}
                    </p>

                    {m.error && (
                      <p className="text-xs text-red-300 font-mono mt-1 flex items-center gap-1.5">
                        <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                        <span>{m.error}</span>
                      </p>
                    )}

                    {/* Tags & Meta */}
                    <div className="mt-2.5 flex items-center gap-2 flex-wrap text-[11px] font-mono text-gray-400">
                      <span>Probe: <strong className="text-gray-300">{m.location}</strong></span>
                      <span>•</span>
                      <span>Interval: <strong className="text-gray-300">{m.interval}</strong></span>
                      <span>•</span>
                      <span>SSL: <strong className="text-emerald-400">{m.sslExpiryDays}d valid ({m.tlsVersion})</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & Sparkline & Quick Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-obsidian-800">
                  
                  {/* Uptime and Response */}
                  <div className="text-right font-mono">
                    <div className="text-base font-bold text-white">
                      {m.status === 'DOWN' ? '0 ms' : `${m.responseTime} ms`}
                    </div>
                    <div className="text-xs text-emerald-400">
                      {m.uptime}% uptime
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => runManualCheck(m.id)}
                      className="p-2 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-bee-500 text-gray-400 hover:text-bee-400 transition-colors"
                      title="Run manual probe now"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleMonitorPause(m.id)}
                      className="p-2 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-white text-gray-400 hover:text-white transition-colors"
                      title={m.status === 'PAUSED' ? 'Resume Monitor' : 'Pause Monitor'}
                    >
                      {m.status === 'PAUSED' ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))
        )}
      </div>

      <AddMonitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
