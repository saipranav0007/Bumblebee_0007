'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { playBuzzAlert, playRecoverySound, playClickSound } from '../../../lib/sound';
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Clock, 
  Brain, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink,
  Layers,
  Activity,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function IncidentCenterPage() {
  const { incidents, resolveIncident, triggerBuzzAlert } = useBumblebee();
  const [activeTab, setActiveTab] = useState('ACTIVE'); // 'ACTIVE', 'RESOLVED'
  const [selectedIncidentId, setSelectedIncidentId] = useState(incidents[0]?.id || 'INC-8F42A1');

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const resolvedIncidents = incidents.filter(i => i.status === 'RESOLVED');
  const currentList = activeTab === 'ACTIVE' ? activeIncidents : resolvedIncidents;

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Incident Intelligence Center
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
              {activeIncidents.length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Multi-region confirmed outages, telemetry evidence trails, and AI root-cause analysis.
          </p>
        </div>

        <button
          onClick={() => triggerBuzzAlert()}
          className="flex items-center gap-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-300 px-3.5 py-2 rounded-xl text-xs font-bold shadow-glow-critical transition-all"
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>Test Buzz Alert 🐝</span>
        </button>
      </div>

      {/* Main Layout: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Incidents List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Tabs */}
          <div className="flex items-center bg-obsidian-900 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
            <button
              onClick={() => { setActiveTab('ACTIVE'); }}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'ACTIVE' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Active ({activeIncidents.length})
            </button>
            <button
              onClick={() => { setActiveTab('RESOLVED'); }}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'RESOLVED' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Resolved ({resolvedIncidents.length})
            </button>
          </div>

          {/* Incident Cards */}
          <div className="space-y-2.5">
            {currentList.length === 0 ? (
              <div className="p-8 text-center bg-obsidian-900/60 border border-obsidian-800 rounded-2xl text-gray-400 text-xs font-mono">
                No {activeTab.toLowerCase()} incidents found. All services operating normally.
              </div>
            ) : (
              currentList.map((inc) => {
                const isSelected = inc.id === selectedIncident?.id;
                return (
                  <button
                    key={inc.id}
                    onClick={() => { playClickSound(); setSelectedIncidentId(inc.id); }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-obsidian-850 border-bee-500 shadow-glow-amber'
                        : 'bg-obsidian-900/80 border-obsidian-800 hover:border-obsidian-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400 font-bold">
                        {inc.id}
                      </span>
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        inc.severity === 'MAJOR' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {inc.severity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">
                      {inc.title}
                    </h3>

                    <p className="text-xs text-gray-400 font-mono mt-1 line-clamp-1">
                      {inc.errorType}
                    </p>

                    <div className="mt-3 pt-2 border-t border-obsidian-800 flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span>Detected: {inc.startedAt}</span>
                      <span className={inc.status === 'RESOLVED' ? 'text-emerald-400' : 'text-amber-400'}>
                        {inc.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Detailed Incident Investigation View (7 cols) */}
        {selectedIncident && (
          <div className="lg:col-span-7 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-6">
            
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-obsidian-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-bee-400">{selectedIncident.id}</span>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    selectedIncident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {selectedIncident.severity}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-obsidian-950 border border-obsidian-800 text-gray-400">
                    Status: {selectedIncident.status}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {selectedIncident.title}
                </h2>
              </div>

              {selectedIncident.status !== 'RESOLVED' && (
                <button
                  onClick={() => resolveIncident(selectedIncident.id)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-glow-operational transition-all shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Service Recovery</span>
                </button>
              )}
            </div>

            {/* Incident Summary Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
              <div>
                <span className="text-gray-500 block">Affected Service</span>
                <span className="text-white font-bold">{selectedIncident.monitorName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Error Classification</span>
                <span className="text-red-400 font-bold">{selectedIncident.errorType}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Initial Detection</span>
                <span className="text-white font-bold">{selectedIncident.startedAt}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Confirmation Trail</span>
                <span className="text-emerald-400 font-bold">3/3 Quorum Failed</span>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="p-3.5 bg-red-950/20 border border-red-500/30 rounded-xl text-xs font-mono text-red-200">
              <strong className="text-red-400 block mb-0.5">ESTIMATED IMPACT:</strong>
              {selectedIncident.affectedImpact || 'Payment checkout operations degraded for end customers.'}
            </div>

            {/* AI Fact vs Inference Analysis Box */}
            {selectedIncident.aiFactSummary && (
              <div className="p-4 rounded-xl bg-obsidian-950 border border-bee-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-bee-400 font-bold text-xs font-mono">
                    <Sparkles className="w-4 h-4" /> BUMBLEBEE AI TELEMETRY ANALYSIS
                  </div>
                  <Link
                    href="/app/intelligence"
                    className="text-[11px] font-mono text-bee-400 hover:text-bee-300 flex items-center gap-1"
                  >
                    Full Analysis <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                    <strong className="text-emerald-400">[CONFIRMED]:</strong> {selectedIncident.aiFactSummary.confirmed[0]}
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/30 text-blue-200">
                    <strong className="text-blue-400">[OBSERVED]:</strong> {selectedIncident.aiFactSummary.observed[0]}
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200">
                    <strong className="text-amber-400">[LIKELY]:</strong> {selectedIncident.aiFactSummary.likely[0]}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline of events */}
            <div>
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
                Incident Timeline & Evidence Trail
              </h3>
              <div className="space-y-3 border-l-2 border-obsidian-800 ml-2 pl-4">
                {(selectedIncident.timeline || []).map((ev, idx) => (
                  <div key={idx} className="relative text-xs">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-bee-500 border border-obsidian-900" />
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-bee-400 font-bold">{ev.time}</span>
                      <span className="text-white font-semibold">{ev.title}</span>
                    </div>
                    <p className="text-gray-400 mt-0.5 text-[11px] font-mono">
                      {ev.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
