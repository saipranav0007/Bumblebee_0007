'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { 
  Gauge, 
  Clock, 
  Activity, 
  Globe, 
  Zap, 
  Layers, 
  Sliders, 
  TrendingUp,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function ObservabilityPage() {
  const { metrics } = useBumblebee();
  const [timeRange, setTimeRange] = useState('24h'); // '1h', '6h', '24h', '7d', '30d', '90d'

  // Time series data generator for latency & TTFB
  const telemetryData = [
    { time: "00:00", p50: 120, p95: 310, p99: 450, errorRate: 0.01, uptime: 100 },
    { time: "03:00", p50: 115, p95: 290, p99: 420, errorRate: 0.00, uptime: 100 },
    { time: "06:00", p50: 130, p95: 340, p99: 510, errorRate: 0.02, uptime: 100 },
    { time: "09:00", p50: 180, p95: 460, p99: 890, errorRate: 0.05, uptime: 100 },
    { time: "12:00", p50: 210, p95: 580, p99: 1200, errorRate: 0.08, uptime: 99.9 },
    { time: "15:00", p50: 240, p95: 690, p99: 1850, errorRate: 0.12, uptime: 99.8 },
    { time: "18:00", p50: 380, p95: 1450, p99: 4800, errorRate: 2.80, uptime: 98.4 },
    { time: "21:00", p50: 290, p95: 890, p99: 2450, errorRate: 0.40, uptime: 99.6 },
    { time: "23:59", p50: 140, p95: 350, p99: 520, errorRate: 0.02, uptime: 100 },
  ];

  const regionBreakdowns = [
    { code: "us-east-1", name: "US East (N. Virginia)", p50: "112 ms", p99: "420 ms", uptime: "99.98%", status: "HEALTHY" },
    { code: "eu-central-1", name: "EU Central (Frankfurt)", p50: "145 ms", p99: "580 ms", uptime: "99.95%", status: "HEALTHY" },
    { code: "ap-south-1", name: "India (Mumbai)", p50: "185 ms", p99: "890 ms", uptime: "99.92%", status: "HEALTHY" },
    { code: "ap-southeast-1", name: "Singapore (Edge)", p50: "160 ms", p99: "620 ms", uptime: "99.94%", status: "HEALTHY" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Observability & Telemetry</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
                <Gauge className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            High-resolution P50/P95/P99 latency percentiles, TTFB breakdowns, and regional probe maps.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center bg-obsidian-900 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
          {['1h', '6h', '24h', '7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 rounded-lg transition-colors font-bold ${
                timeRange === r ? 'bg-bee-500 text-black shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Latency Percentiles Chart */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Response Latency Distribution (P50, P95, P99)</span>
              <span className="text-xs text-bee-400 font-mono font-normal">• Range: {timeRange}</span>
            </h3>
            <span className="text-xs text-gray-400 font-mono">Sub-millisecond probe measurements from global worker pool</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> P50 Median
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> P95 Tail
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> P99 Peak
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="p99Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#212b40" opacity={0.5} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontStyle="JetBrains Mono" />
              <YAxis stroke="#64748b" fontSize={11} unit="ms" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0c0f17', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
              />
              <Area type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#p99Grad)" name="P99 Peak" />
              <Area type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} fill="#f59e0b" name="P95 Tail" />
              <Area type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#p50Grad)" name="P50 Median" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Probe Network Status */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-bee-400" />
              <span>Multi-Region Watchdog Network</span>
            </h3>
            <span className="text-xs text-gray-400 font-mono">Autonomous edge nodes verifying quorum consensus</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/30">
            4/4 PROBES ONLINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionBreakdowns.map((reg) => (
            <div key={reg.code} className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{reg.name}</span>
                <span className="text-emerald-400 font-bold">{reg.status}</span>
              </div>
              <div className="text-[11px] font-mono text-gray-400 space-y-0.5 pt-1">
                <div>P50 Median: <strong className="text-gray-200">{reg.p50}</strong></div>
                <div>P99 Tail: <strong className="text-gray-200">{reg.p99}</strong></div>
                <div>Uptime: <strong className="text-emerald-400">{reg.uptime}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
