'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { playClickSound } from '../../../lib/sound';
import { 
  Clock, 
  ShieldCheck, 
  Download, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Percent, 
  Zap, 
  Layers 
} from 'lucide-react';

export default function SlaPage() {
  const { currentOrg, metrics } = useBumblebee();
  const [targetSla, setTargetSla] = useState(99.95); // 99.9, 99.95, 99.99
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  // 30 days = 43,200 minutes
  const totalMinutesInMonth = 43200;
  const allowedDowntimeMinutes = totalMinutesInMonth * (1 - targetSla / 100); // 21.6 min for 99.95%
  const actualDowntimeMinutes = 7.7; // From current incident
  const remainingBudgetMinutes = Math.max(0, allowedDowntimeMinutes - actualDowntimeMinutes);
  const burnPercentage = ((actualDowntimeMinutes / allowedDowntimeMinutes) * 100).toFixed(1);

  const handleExportReport = () => {
    playClickSound();
    setIsExporting(true);
    setExportMessage('');

    setTimeout(() => {
      setIsExporting(false);
      setExportMessage('SLA Compliance Certificate (PDF/JSON) generated successfully.');
    }, 900);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>SLA & Error Budget Management</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
                <Clock className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Track contractual availability commitments, error budget burn rates, and compliance documentation.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? "Generating PDF..." : "Export SLA Compliance Report"}</span>
        </button>
      </div>

      {exportMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Target SLA Tier Selector */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-obsidian-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Configured SLA Commitment Tier</h3>
            <span className="text-xs text-gray-400 font-mono">Calculated for 30-day calendar billing cycle</span>
          </div>

          <div className="flex items-center bg-obsidian-950 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
            {[
              { val: 99.9, label: '99.9% (Three 9s)' },
              { val: 99.95, label: '99.95% (High Avail)' },
              { val: 99.99, label: '99.99% (Four 9s)' },
            ].map((tier) => (
              <button
                key={tier.val}
                onClick={() => { playClickSound(); setTargetSla(tier.val); }}
                className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                  targetSla === tier.val ? 'bg-bee-500 text-black shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* SLA Burn Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800">
            <span className="text-xs text-gray-500 font-mono uppercase block">Measured Actual Uptime</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">
              {metrics.overallUptime}%
            </div>
            <span className="text-[11px] text-gray-400 font-mono mt-2 block">
              Target: {targetSla}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800">
            <span className="text-xs text-gray-500 font-mono uppercase block">Total Downtime Budget</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
              {allowedDowntimeMinutes.toFixed(1)} <span className="text-xs text-gray-400 font-normal">min</span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono mt-2 block">
              Per 30-day billing window
            </span>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800">
            <span className="text-xs text-gray-500 font-mono uppercase block">Actual Downtime Consumed</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono">
              {actualDowntimeMinutes} <span className="text-xs text-gray-400 font-normal">min</span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono mt-2 block">
              Remaining: {remainingBudgetMinutes.toFixed(1)} min
            </span>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800">
            <span className="text-xs text-gray-500 font-mono uppercase block">Error Budget Burn</span>
            <div className="text-2xl sm:text-3xl font-black text-bee-400 mt-1 font-mono">
              {burnPercentage}%
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-2 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> NO SLA BREACH
            </span>
          </div>

        </div>

        {/* Burn Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-300">Monthly Error Budget Burn Consumption</span>
            <span className="text-bee-400 font-bold">{burnPercentage}% Burned ({remainingBudgetMinutes.toFixed(1)} min buffer remaining)</span>
          </div>
          <div className="w-full bg-obsidian-950 h-3 rounded-full border border-obsidian-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-bee-500 to-red-500 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, burnPercentage)}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
