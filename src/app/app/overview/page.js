'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBumblebee } from '../../../lib/store';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  Search, 
  Filter, 
  PlusCircle, 
  Play, 
  Pause, 
  RefreshCw, 
  Brain, 
  Radio, 
  Flame, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';
import AddMonitorModal from '../../../components/monitors/AddMonitorModal';

export default function OverviewPage() {
  const { 
    monitors, 
    incidents, 
    activityFeed, 
    metrics, 
    runManualCheck, 
    toggleMonitorPause, 
    triggerBuzzAlert 
  } = useBumblebee();

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredMonitors = monitors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.url.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && m.status === filterStatus;
  });

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Overview Command Center Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Command Center Overview
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WATCHDOG ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Bumblebee is continuously observing 4 global regions every 30 seconds.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => triggerBuzzAlert()}
            className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-glow-critical"
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Test Buzz 🐝</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Monitor</span>
          </button>
        </div>
      </div>

      {/* Active Incident Warning Alert Bar */}
      {activeIncidents.length > 0 && (
        <div className="bg-gradient-to-r from-red-950/80 via-obsidian-900 to-red-950/80 border border-red-500/60 rounded-2xl p-4 sm:p-5 shadow-glow-critical flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-red-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                  {activeIncidents.length} ACTIVE INCIDENT{activeIncidents.length > 1 ? 'S' : ''}
                </span>
                <span className="text-xs text-red-200 font-bold">
                  {activeIncidents[0].title}
                </span>
              </div>
              <p className="text-xs text-red-300/80 mt-1 font-mono">
                {activeIncidents[0].errorMessage} • Quorum Confirmed (3/3 Regions Failed)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Link
              href="/app/intelligence"
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-bee-500/10 hover:bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs px-3.5 py-2 rounded-xl transition-colors font-semibold"
            >
              <Brain className="w-3.5 h-3.5" /> AI Root Cause
            </Link>
            <Link
              href="/app/incidents"
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-red-600/40"
            >
              Triage Incident <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TOP METRICS KPI GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Monitored Services */}
        <div className="bg-obsidian-900/90 border border-obsidian-800 p-4 sm:p-5 rounded-2xl hover:border-obsidian-700 transition-colors">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono uppercase">
            <span>Services Monitored</span>
            <Radio className="w-4 h-4 text-bee-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-baseline gap-2">
            <span>{metrics.totalMonitored}</span>
            <span className="text-xs text-emerald-400 font-mono font-normal">
              {metrics.operationalCount} Healthy
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <span className="text-emerald-400 font-bold">{metrics.operationalCount} up</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{metrics.degradedCount} degraded</span>
            <span>•</span>
            <span className="text-red-400 font-bold">{metrics.downCount} down</span>
          </div>
        </div>

        {/* Metric 2: Overall Uptime */}
        <div className="bg-obsidian-900/90 border border-obsidian-800 p-4 sm:p-5 rounded-2xl hover:border-obsidian-700 transition-colors">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono uppercase">
            <span>Overall Uptime</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2 flex items-baseline gap-2">
            <span>{metrics.overallUptime}%</span>
            <span className="text-xs text-gray-400 font-mono font-normal">
              30d Target: 99.95%
            </span>
          </div>
          <div className="mt-3 text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SLA Burn Budget: <strong>4.2% consumed</strong></span>
          </div>
        </div>

        {/* Metric 3: Avg Response Time */}
        <div className="bg-obsidian-900/90 border border-obsidian-800 p-4 sm:p-5 rounded-2xl hover:border-obsidian-700 transition-colors">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono uppercase">
            <span>Avg Response Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-baseline gap-2">
            <span>{metrics.avgResponseTime}</span>
            <span className="text-xs text-gray-400 font-mono">ms</span>
          </div>
          <div className="mt-3 text-[11px] text-gray-400 font-mono">
            <span>TTFB: 182ms • TLS: 24ms • DNS: 12ms</span>
          </div>
        </div>

        {/* Metric 4: Checks Today */}
        <div className="bg-obsidian-900/90 border border-obsidian-800 p-4 sm:p-5 rounded-2xl hover:border-obsidian-700 transition-colors">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono uppercase">
            <span>Checks Today</span>
            <Zap className="w-4 h-4 text-bee-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-bee-400 mt-2 font-mono">
            {metrics.checksCountToday.toLocaleString()}
          </div>
          <div className="mt-3 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>+4 checks/sec across 4 probe regions</span>
          </div>
        </div>

      </div>

      {/* MAIN TWO-COLUMN SECTION: LIVE MONITORS & LIVE ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: "Bumblebee is watching" Monitors Grid */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-obsidian-900/80 p-4 rounded-2xl border border-obsidian-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🐝 Bumblebee is watching</span>
                <span className="text-xs font-mono text-gray-400">({filteredMonitors.length})</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
              {['ALL', 'OPERATIONAL', 'DEGRADED', 'DOWN'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    filterStatus === st ? 'bg-bee-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {st === 'OPERATIONAL' ? 'HEALTHY' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside monitors */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name, URL, or tag..."
              className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>

          {/* Monitors Cards List */}
          <div className="space-y-3">
            {filteredMonitors.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  m.status === 'DOWN'
                    ? 'bg-red-950/20 border-red-500/50 shadow-glow-critical'
                    : m.status === 'DEGRADED'
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-obsidian-900/90 border-obsidian-800 hover:border-obsidian-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                      m.status === 'DOWN' ? 'bg-red-500 animate-ping' :
                      m.status === 'DEGRADED' ? 'bg-amber-400 animate-pulse' :
                      m.status === 'MAINTENANCE' ? 'bg-blue-400' :
                      m.status === 'PAUSED' ? 'bg-gray-500' :
                      'bg-emerald-400'
                    }`} />

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {m.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 border border-obsidian-800 text-gray-400">
                          {m.type}
                        </span>
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                          m.status === 'DOWN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          m.status === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          m.status === 'MAINTENANCE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {m.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 font-mono mt-1 truncate max-w-sm sm:max-w-md">
                        {m.url}
                      </p>

                      {m.error && (
                        <p className="text-xs text-red-300 font-mono mt-1.5 flex items-center gap-1.5">
                          <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                          <span>{m.error}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Spark */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-mono font-bold text-white">
                      {m.status === 'DOWN' ? '0 ms' : `${m.responseTime} ms`}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      {m.uptime}% uptime
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="mt-3 pt-3 border-t border-obsidian-800 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <div className="flex items-center gap-3">
                    <span>Probe: {m.location}</span>
                    <span>•</span>
                    <span>Checked: {m.lastCheck}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => runManualCheck(m.id)}
                      className="text-gray-400 hover:text-bee-400 p-1 rounded hover:bg-obsidian-950 transition-colors"
                      title="Run manual probe now"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleMonitorPause(m.id)}
                      className="text-gray-400 hover:text-white p-1 rounded hover:bg-obsidian-950 transition-colors"
                      title={m.status === 'PAUSED' ? 'Resume Monitor' : 'Pause Monitor'}
                    >
                      {m.status === 'PAUSED' ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Col: Real-time Live Activity Feed */}
        <div className="space-y-4">
          <div className="bg-obsidian-900/90 border border-obsidian-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-obsidian-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <h3 className="text-sm font-bold text-white">Live Activity Stream</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">REALTIME TICKER</span>
            </div>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {activityFeed.map((act) => (
                <div 
                  key={act.id} 
                  className="p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs space-y-1 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">{act.time}</span>
                    <span className="text-gray-400">{act.location}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 pt-0.5">
                    <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                      act.type === 'error' ? 'bg-red-500' :
                      act.type === 'warning' ? 'bg-amber-400' :
                      act.type === 'info' ? 'bg-blue-400' :
                      'bg-emerald-400'
                    }`} />
                    <p className={`text-xs font-mono leading-tight ${
                      act.type === 'error' ? 'text-red-300' :
                      act.type === 'warning' ? 'text-amber-300' :
                      'text-gray-300'
                    }`}>
                      {act.text}
                    </p>
                  </div>

                  {act.ms !== undefined && (
                    <div className="text-[10px] font-mono text-gray-500 text-right">
                      {act.ms} ms
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Quick Insight Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-bee-500/10 via-obsidian-900 to-obsidian-900 border border-bee-500/30">
            <div className="flex items-center gap-2 text-bee-400 font-bold text-xs font-mono">
              <Sparkles className="w-4 h-4" /> BUMBLEBEE AI BRIEF
            </div>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed font-mono">
              "Payment API outage matches database pool saturation pattern from last Tuesday. Rolling pod restart recommended."
            </p>
            <Link
              href="/app/intelligence"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-bee-400 hover:text-bee-300"
            >
              Ask AI Analyst <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* Add Monitor Modal (8-step wizard) */}
      <AddMonitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
