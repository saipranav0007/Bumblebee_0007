'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function SecurityConsentPage() {
  const router = useRouter();
  const [agreedTelemetry, setAgreedTelemetry] = useState(true);
  const [agreedSecrets, setAgreedSecrets] = useState(true);
  const [agreedNotification, setAgreedNotification] = useState(true);

  const handleProceed = () => {
    playClickSound();
    router.push('/onboarding');
  };

  const allConsented = agreedTelemetry && agreedSecrets && agreedNotification;

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-glow-operational">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Security & Telemetry Consent
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400">
          Transparent data handling and zero-knowledge encryption guarantees
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-obsidian-900 border border-obsidian-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl space-y-6">
          
          <div className="space-y-4">
            
            {/* Consent Item 1: URLs & Probes */}
            <label className="flex items-start gap-3.5 p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-obsidian-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={agreedTelemetry}
                onChange={(e) => setAgreedTelemetry(e.target.checked)}
                className="mt-1 rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
              />
              <div className="text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Server className="w-3.5 h-3.5 text-bee-400" /> Monitored Endpoints & Probe Telemetry
                </div>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  Bumblebee probes your configured URLs every 30 seconds to measure response times, HTTP statuses, and SSL certificates. We never probe unconfigured endpoints.
                </p>
              </div>
            </label>

            {/* Consent Item 2: Secret Storage */}
            <label className="flex items-start gap-3.5 p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-obsidian-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={agreedSecrets}
                onChange={(e) => setAgreedSecrets(e.target.checked)}
                className="mt-1 rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
              />
              <div className="text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <EyeOff className="w-3.5 h-3.5 text-emerald-400" /> AES-256 Secret Vault & Masking
                </div>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  API headers and synthetic test credentials are encrypted with AES-256-GCM. Credentials are masked in the UI (<code className="text-bee-400 font-mono">••••••••82KQ</code>) and never outputted in server logs or AI context.
                </p>
              </div>
            </label>

            {/* Consent Item 3: Notification routing */}
            <label className="flex items-start gap-3.5 p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 hover:border-obsidian-700 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={agreedNotification}
                onChange={(e) => setAgreedNotification(e.target.checked)}
                className="mt-1 rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
              />
              <div className="text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Lock className="w-3.5 h-3.5 text-blue-400" /> Notification Channels & Buzz Alert Authorization
                </div>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  You authorize Bumblebee to dispatch high-priority incident notifications to your configured Web Push, Mobile PWA, WhatsApp, and Email recipients.
                </p>
              </div>
            </label>

          </div>

          <button
            onClick={handleProceed}
            disabled={!allConsented}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 disabled:opacity-50 text-black font-black text-sm py-3.5 rounded-xl shadow-glow-amber transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Accept Security Policy & Start Onboarding</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center text-[11px] text-gray-500 font-mono">
            Complies with SOC2, GDPR & ISO/IEC 27001 data isolation requirements.
          </div>

        </div>
      </div>
    </div>
  );
}
