'use client';

import React from 'react';
import { Brain, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AiFeatureSection() {
  return (
    <div id="intelligence" className="py-20 border-b border-obsidian-800 bg-obsidian-950/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bee-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Description */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bee-500/10 border border-bee-500/30 text-xs font-mono text-bee-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bumblebee Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
              An AI Reliability Analyst That Strictly Distinguishes Fact From Inference.
            </h2>

            <p className="text-gray-300 text-base sm:text-lg mt-4 leading-relaxed">
              Bumblebee does NOT hallucinate or guess. When an incident occurs, our specialized AI analyst correlates authorized monitoring telemetry, latency curves, and logs to break down what is proven vs. what is likely.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white font-mono uppercase text-xs tracking-wider">[CONFIRMED]:</strong>
                  <span className="text-gray-300 ml-1.5">Measured hard data (HTTP 503, 3/3 probe timeouts, SSL expiration).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white font-mono uppercase text-xs tracking-wider">[OBSERVED]:</strong>
                  <span className="text-gray-300 ml-1.5">Telemetry anomalies leading up to failure (latency rose +480% 14 mins prior).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white font-mono uppercase text-xs tracking-wider">[LIKELY]:</strong>
                  <span className="text-gray-300 ml-1.5">Probabilistic system deductions (e.g. database connection pool exhaustion).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-gray-500/20 text-gray-400 mt-0.5 shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white font-mono uppercase text-xs tracking-wider">[UNKNOWN]:</strong>
                  <span className="text-gray-300 ml-1.5">Telemetry limits requiring internal APM hooks or pod metrics.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/app/intelligence"
                className="inline-flex items-center gap-2 text-sm font-bold text-bee-400 hover:text-bee-300 bg-bee-500/10 hover:bg-bee-500/20 border border-bee-500/30 px-5 py-2.5 rounded-xl transition-all"
              >
                Explore Bumblebee Intelligence <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Live Visual Card */}
          <div className="bg-obsidian-900 border border-obsidian-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-bee-500/20 border border-bee-500/40 flex items-center justify-center text-bee-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Incident Breakdown: INC-8F42A1</h4>
                  <span className="text-[11px] text-gray-400 font-mono">Payment Gateway API (HTTP 503)</span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                CRITICAL
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                <span className="text-emerald-400 font-bold">[CONFIRMED]</span> 3/3 global probes received HTTP 503 with 0-byte responses. Handshake completed in 34ms.
              </div>

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-200">
                <span className="text-blue-400 font-bold">[OBSERVED]</span> Latency spiked from 320ms to 6,800ms 14 mins prior. PostgreSQL connection pool utilization reached 96.4%.
              </div>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
                <span className="text-amber-400 font-bold">[LIKELY]</span> Database transaction lock contention exhausted worker pool ceiling.
              </div>

              <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-300">
                <span className="text-gray-400 font-bold">[UNKNOWN]</span> Pod-level memory thrashes without APM profiler telemetry.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-obsidian-800 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-bee-400">
                <FileText className="w-3.5 h-3.5" /> Recommended Action Ready
              </span>
              <span className="font-mono text-[11px]">Analysis Latency: 1.2s</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
