'use client';

import React from 'react';
import { useBumblebee } from '../../lib/store';
import { playBuzzAlert } from '../../lib/sound';
import { AlertTriangle, BellRing, Volume2, ShieldAlert, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BuzzAlertOverlay() {
  const { activeBuzzAlert, setActiveBuzzAlert } = useBumblebee();

  if (!activeBuzzAlert) return null;

  return (
    <aside aria-label="Critical Buzz Alert Notification" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl animate-buzz-strobe">
      <div className="bg-gradient-to-r from-red-950/95 via-obsidian-900/95 to-red-950/95 border-2 border-red-500 rounded-2xl p-4 md:p-5 shadow-glow-critical backdrop-blur-xl text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center shrink-0 animate-bounce">
              <span className="text-2xl">🐝</span>
            </div>
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider">
                  BUZZ ALERT
                </span>
                <span className="bg-red-500/20 text-red-300 font-mono text-xs px-2 py-0.5 rounded border border-red-500/30">
                  CRITICAL OUTAGE
                </span>
                <span className="text-xs text-red-200/80">
                  Detected at {activeBuzzAlert.startedAt || '18:42 IST'}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white mt-1.5 flex items-center gap-2">
                {activeBuzzAlert.title || 'Payment Gateway API Complete Failure'}
              </h2>

              <p className="text-sm text-red-200/90 mt-1 font-mono">
                {activeBuzzAlert.errorMessage || 'HTTP 503 Service Unavailable (3 consecutive failed checks from US-East, EU, AP)'}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs text-red-300/80 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  Multi-Region Confirmation: <strong>3/3 Failed</strong>
                </span>
                <span>•</span>
                <span>Dispatched to: <strong>Web Push, WhatsApp, PWA, Email</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveBuzzAlert(null)}
            className="text-red-300/60 hover:text-white p-1 rounded-lg hover:bg-red-900/40 transition-colors"
            title="Dismiss Alert"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={() => playBuzzAlert()}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            Replay Buzz Alarm
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveBuzzAlert(null)}
              className="px-3.5 py-1.5 text-xs text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Acknowledge
            </button>
            <Link
              href="/app/incidents"
              onClick={() => setActiveBuzzAlert(null)}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs px-4 py-1.5 rounded-lg shadow-lg shadow-red-600/40 transition-all hover:translate-x-0.5"
            >
              Open Incident Triage <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
