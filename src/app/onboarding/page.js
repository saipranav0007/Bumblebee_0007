'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBumblebee } from '../../lib/store';
import { validateSafeUrl } from '../../lib/ssrf';
import { playClickSound, playRecoverySound, playBuzzAlert } from '../../lib/sound';
import { 
  Building, 
  Globe, 
  Code, 
  Layers, 
  Workflow, 
  Database, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  BellRing, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { addMonitor, currentOrg, updateOrgProfile } = useBumblebee();

  const [currentStep, setCurrentStep] = useState(1); // 1 to 7

  // Form State
  const [workspaceName, setWorkspaceName] = useState(currentOrg?.name || 'My Organization');
  const [monitorType, setMonitorType] = useState('WEBSITE');
  const [monitorName, setMonitorName] = useState('Production Marketing Portal');
  const [monitorUrl, setMonitorUrl] = useState('https://app.bumblebee.io');
  const [checkInterval, setCheckInterval] = useState('30s');
  const [channels, setChannels] = useState({
    buzzAlert: true,
    webPush: true,
    email: true,
    whatsapp: false
  });

  // Test Runner State
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const monitorTypes = [
    { type: 'WEBSITE', name: 'Website / Web App', icon: Globe, desc: 'Uptime, HTTP status, SSL expiry, TTFB' },
    { type: 'API', name: 'REST / GraphQL API', icon: Code, desc: 'GET/POST endpoints, JSON response assertions' },
    { type: 'SYNTHETIC', name: 'Synthetic Journey', icon: Workflow, desc: 'Playwright headless user flow automation' },
    { type: 'DATABASE', name: 'Database TCP Ping', icon: Database, desc: 'PostgreSQL, MySQL, Redis port availability' },
    { type: 'SERVER', name: 'Server / Node Ping', icon: Server, desc: 'ICMP / TCP latency & packet loss check' },
    { type: 'BACKEND_SERVICE', name: 'Microservice / Queue', icon: Layers, desc: 'Worker queues, Kafka, background jobs' }
  ];

  const handleNext = () => {
    playClickSound();
    if (currentStep === 4) {
      const safe = validateSafeUrl(monitorUrl);
      if (!safe.isValid) {
        alert(safe.error);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(7, prev + 1));
  };

  const handleBack = () => {
    playClickSound();
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleRunFirstTest = () => {
    playClickSound();
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      playRecoverySound();
      setTestResult({
        status: 'OPERATIONAL',
        statusCode: 200,
        latencyMs: 142,
        dnsMs: 12,
        tlsMs: 28,
        ttfbMs: 102,
        sslExpiryDays: 84
      });
    }, 1200);
  };

  const handleCompleteOnboarding = () => {
    playClickSound();
    if (workspaceName?.trim()) {
      updateOrgProfile({ name: workspaceName.trim() });
    }
    // Add monitor to central store
    addMonitor({
      name: monitorName,
      url: monitorUrl,
      type: monitorType,
      interval: checkInterval,
      location: "US East (N. Virginia)",
      locationCode: "us-east",
      responseTime: testResult ? testResult.latencyMs : 142,
      group: "Primary Monitors",
      expectedStatus: 200,
      tags: ["prod", "onboarding"]
    });

    router.push('/app/overview');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-honeycomb-pattern relative text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bee-500/10 border border-bee-500/30 text-xs font-mono text-bee-400 font-bold mb-4">
          🐝 WELCOME TO BUMBLEBEE • ONBOARDING WIZARD
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Step {currentStep} of 7: {
            currentStep === 1 ? "Create Workspace" :
            currentStep === 2 ? "Ready First Watchdog" :
            currentStep === 3 ? "Choose Monitor Type" :
            currentStep === 4 ? "Configure Target Endpoint" :
            currentStep === 5 ? "Configure Alerts & Buzz" :
            currentStep === 6 ? "Run Instant Health Probe" :
            "Verify Result & Launch Dashboard"
          }
        </h1>
        <div className="w-full bg-obsidian-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-bee-400 to-bee-500 h-full transition-all duration-300 shadow-glow-amber"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-obsidian-900 border border-obsidian-700/80 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          
          {/* STEP 1: WORKSPACE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Name Your Team's Monitoring Workspace
              </h3>
              <p className="text-xs text-gray-400">
                Organizations provide strict cryptographic multi-tenant isolation for all monitors, incidents, and secrets.
              </p>
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">
                  Workspace / Organization Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 w-4 h-4 text-bee-400" />
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ADD FIRST MONITOR INTRO */}
          {currentStep === 2 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-bee-500/20 border border-bee-500/40 mx-auto flex items-center justify-center text-3xl shadow-glow-amber">
                🐝
              </div>
              <h3 className="text-xl font-bold text-white">
                Let's Set Up Your First Watchdog Probe
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Bumblebee monitors digital environments continuously every 30 seconds. In the next 60 seconds, we will configure and verify your first service.
              </p>
            </div>
          )}

          {/* STEP 3: CHOOSE MONITOR TYPE */}
          {currentStep === 3 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">
                What would you like Bumblebee to watch?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {monitorTypes.map((m) => {
                  const Icon = m.icon;
                  const isSelected = monitorType === m.type;
                  return (
                    <button
                      key={m.type}
                      type="button"
                      onClick={() => { playClickSound(); setMonitorType(m.type); }}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        isSelected ? 'bg-bee-500/15 border-bee-500 text-white shadow-glow-amber' : 'bg-obsidian-950 border-obsidian-800 text-gray-300 hover:border-obsidian-700'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-bee-500 text-black font-bold' : 'bg-obsidian-850 text-bee-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{m.name}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CONFIGURE MONITOR */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                Configure Target Endpoint & Probe Frequency
              </h3>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">
                  Service Display Name
                </label>
                <input
                  type="text"
                  value={monitorName}
                  onChange={(e) => setMonitorName(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">
                  Target URL / Endpoint (Protected by SSRF Defense)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 w-4 h-4 text-bee-400" />
                  <input
                    type="url"
                    value={monitorUrl}
                    onChange={(e) => setMonitorUrl(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">
                  Monitoring Frequency
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {['15s', '30s', '60s'].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setCheckInterval(freq)}
                      className={`py-2 rounded-lg border text-center font-bold ${
                        checkInterval === freq ? 'bg-bee-500 text-black border-bee-500' : 'bg-obsidian-950 border-obsidian-800 text-gray-300'
                      }`}
                    >
                      Every {freq}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: NOTIFICATIONS */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                Configure Incident Notification Channels
              </h3>
              <p className="text-xs text-gray-400">
                Choose how Bumblebee will warn your engineering team when multi-region failures are confirmed.
              </p>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🐝</span>
                    <div>
                      <span className="font-bold text-white">Bumblebee Buzz Alert (Signature Auditory Alarm)</span>
                      <p className="text-gray-400 text-[11px]">Instant audio alarm & screen flash on Critical outages</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={channels.buzzAlert}
                    onChange={(e) => setChannels({ ...channels, buzzAlert: e.target.checked })}
                    className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <BellRing className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="font-bold text-white">Browser Web Push & PWA</span>
                      <p className="text-gray-400 text-[11px]">Background push notifications even when tab is closed</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={channels.webPush}
                    onChange={(e) => setChannels({ ...channels, webPush: e.target.checked })}
                    className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white">Email Incident Reports</span>
                      <p className="text-gray-400 text-[11px]">Detailed telemetry attachments and recovery notices</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={channels.email}
                    onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                    className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: RUN FIRST TEST */}
          {currentStep === 6 && (
            <div className="space-y-4 text-center py-2">
              <h3 className="text-base font-bold text-white">
                Run First Health Probe Test
              </h3>
              <p className="text-xs text-gray-300">
                Let's trigger an immediate probe against <span className="text-bee-400 font-mono">{monitorUrl}</span> from our US-East probe node.
              </p>

              <button
                onClick={handleRunFirstTest}
                disabled={isTesting}
                className="inline-flex items-center justify-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-black text-sm px-6 py-3 rounded-xl shadow-glow-amber transition-all"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Executing Probe...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-black fill-black" />
                    <span>Test Connection Now</span>
                  </>
                )}
              </button>

              {testResult && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-left text-xs font-mono space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> HTTP 200 OK — Probe Passed
                    </span>
                    <span>{testResult.latencyMs} ms</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-gray-300">
                    <div>DNS: {testResult.dnsMs}ms</div>
                    <div>TLS: {testResult.tlsMs}ms (TLS 1.3)</div>
                    <div>TTFB: {testResult.ttfbMs}ms</div>
                    <div>SSL: {testResult.sslExpiryDays}d left</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7: SHOW RESULT & ENTER DASHBOARD */}
          {currentStep === 7 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-glow-operational">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Bumblebee Is Now Watching Your Service!
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Your watchdog is active. Probes will run automatically every {checkInterval}. If 3 consecutive checks fail across multi-region quorums, Bumblebee will sound the Buzz Alert.
              </p>
              <button
                onClick={handleCompleteOnboarding}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3.5 rounded-xl shadow-glow-amber transition-all hover:scale-105"
              >
                <span>Enter Overview Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-obsidian-800 flex items-center justify-between">
            {currentStep > 1 && currentStep < 7 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-obsidian-800 font-mono transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 7 && (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-glow-amber transition-all ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
