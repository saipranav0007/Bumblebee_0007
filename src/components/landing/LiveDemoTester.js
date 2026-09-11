'use client';

import React, { useState } from 'react';
import { validateSafeUrl } from '../../lib/ssrf';
import { playBuzzAlert, playRecoverySound, playClickSound } from '../../lib/sound';
import { Shield, CheckCircle, AlertOctagon, RefreshCw, Globe, Zap, Cpu, Bell, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LiveDemoTester() {
  const [testUrl, setTestUrl] = useState('https://api.github.com/status');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);
  const [simulatedErrorType, setSimulatedErrorType] = useState('none'); // 'none', 'http503', 'latency'

  const steps = [
    { title: "CHECK", desc: "US-East initial probe dispatched" },
    { title: "RECHECK", desc: "EU-Frankfurt verification probe" },
    { title: "CONFIRM", desc: "AP-Mumbai quorum quorum consensus" },
    { title: "INCIDENT", desc: "Deduplicated incident generated" },
    { title: "ANALYZE", desc: "AI Fact vs Inference telemetry breakdown" },
    { title: "ALERT", desc: "Dispatched Buzz Alert across channels" }
  ];

  const handleRunSimulation = () => {
    playClickSound();
    const safety = validateSafeUrl(testUrl);
    if (!safety.isValid) {
      alert(safety.error);
      return;
    }

    setIsSimulating(true);
    setCurrentStep(1);
    setSimulationResult(null);

    // Step by step progression
    setTimeout(() => setCurrentStep(2), 700);
    setTimeout(() => setCurrentStep(3), 1400);
    setTimeout(() => setCurrentStep(4), 2100);
    setTimeout(() => setCurrentStep(5), 2800);
    setTimeout(() => {
      setCurrentStep(6);
      setIsSimulating(false);

      if (simulatedErrorType === 'http503') {
        playBuzzAlert();
        setSimulationResult({
          status: 'CONFIRMED_OUTAGE',
          statusCode: 503,
          rt: 6420,
          dns: 12,
          tls: 24,
          ttfb: 6384,
          msg: "HTTP 503 Outage confirmed across 3/3 regions. Buzz Alert triggered!"
        });
      } else if (simulatedErrorType === 'latency') {
        setSimulationResult({
          status: 'DEGRADED',
          statusCode: 200,
          rt: 2840,
          dns: 15,
          tls: 28,
          ttfb: 2797,
          msg: "Degraded latency detected (+340% over baseline). Warning alert logged."
        });
      } else {
        playRecoverySound();
        setSimulationResult({
          status: 'OPERATIONAL',
          statusCode: 200,
          rt: 142,
          dns: 8,
          tls: 18,
          ttfb: 116,
          msg: "Service healthy and operational across all global probe locations."
        });
      }
    }, 3500);
  };

  return (
    <div className="py-16 md:py-24 border-b border-obsidian-800 bg-obsidian-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase text-bee-400 font-bold tracking-widest px-3 py-1 rounded-full bg-bee-500/10 border border-bee-500/30">
            Interactive Verification Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            See the 6-Stage Watchdog Pipeline in Action
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Bumblebee never produces false alarms. It systematically executes multi-region retries, builds quorum consensus, isolates anomalies, and sounds the Buzz Alert.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Globe className="w-4 h-4 text-bee-400" />
              </div>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="https://your-service.com/health"
                className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:border-bee-500 focus:outline-none transition-colors"
              />
            </div>

            <select
              value={simulatedErrorType}
              onChange={(e) => setSimulatedErrorType(e.target.value)}
              className="w-full sm:w-56 bg-obsidian-950 border border-obsidian-700 text-xs sm:text-sm text-gray-200 rounded-xl px-3 py-3 font-mono focus:border-bee-500 focus:outline-none"
            >
              <option value="none">Simulate: Healthy (200 OK)</option>
              <option value="http503">Simulate: Critical Outage (503)</option>
              <option value="latency">Simulate: Latency Spike</option>
            </select>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:bg-obsidian-700 text-black font-bold text-sm px-6 py-3 rounded-xl shadow-glow-amber transition-all"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>Run Live Probe</span>
                </>
              )}
            </button>
          </div>

          {/* Stepper Pipeline */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isActive = currentStep === stepNumber;
              const isPast = currentStep > stepNumber;
              return (
                <div
                  key={step.title}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-bee-500/20 border-bee-500 text-bee-400 shadow-glow-amber scale-105'
                      : isPast
                      ? 'bg-obsidian-950 border-emerald-500/40 text-emerald-400'
                      : 'bg-obsidian-950/60 border-obsidian-800 text-gray-500'
                  }`}
                >
                  <div className="text-[10px] font-mono tracking-wider font-bold">
                    STEP 0{stepNumber}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {step.title}
                  </div>
                  <div className="text-[9px] text-gray-400 mt-1 leading-tight line-clamp-2">
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Output Card */}
          {simulationResult && (
            <div className={`mt-6 p-4 rounded-xl border text-sm animate-in fade-in duration-200 ${
              simulationResult.status === 'CONFIRMED_OUTAGE'
                ? 'bg-red-950/40 border-red-500 text-red-200 shadow-glow-critical'
                : simulationResult.status === 'DEGRADED'
                ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-glow-operational'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-bold">
                  {simulationResult.status === 'CONFIRMED_OUTAGE' ? (
                    <AlertOctagon className="w-5 h-5 text-red-400" />
                  ) : simulationResult.status === 'DEGRADED' ? (
                    <Zap className="w-5 h-5 text-amber-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  <span>{simulationResult.msg}</span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  HTTP {simulationResult.statusCode} • {simulationResult.rt}ms Total
                </span>
              </div>

              {/* Telemetry breakdown */}
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block">DNS Lookup</span>
                  <span className="text-white font-bold">{simulationResult.dns} ms</span>
                </div>
                <div>
                  <span className="text-gray-400 block">TLS Handshake</span>
                  <span className="text-white font-bold">{simulationResult.tls} ms (TLSv1.3)</span>
                </div>
                <div>
                  <span className="text-gray-400 block">TTFB</span>
                  <span className="text-white font-bold">{simulationResult.ttfb} ms</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Probe Quorum</span>
                  <span className="text-white font-bold">3/3 Nodes Verified</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
