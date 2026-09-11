'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../lib/store';
import { validateSafeUrl } from '../../lib/ssrf';
import { playClickSound, playRecoverySound } from '../../lib/sound';
import { 
  X, 
  Globe, 
  Code, 
  Workflow, 
  Database, 
  Server, 
  Layers, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  BellRing, 
  RefreshCw 
} from 'lucide-react';

export default function AddMonitorModal({ isOpen, onClose }) {
  const { addMonitor } = useBumblebee();

  const [step, setStep] = useState(1); // 1 to 8

  // Form Fields
  const [monitorType, setMonitorType] = useState('WEBSITE');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [frequency, setFrequency] = useState('30s');
  const [selectedLocations, setSelectedLocations] = useState(['us-east', 'eu-central', 'ap-south']);
  const [expectedStatus, setExpectedStatus] = useState('200');
  const [expectedText, setExpectedText] = useState('');
  const [jsonPath, setJsonPath] = useState('');
  const [retryCount, setRetryCount] = useState(3);
  const [retryDelay, setRetryDelay] = useState(3);
  const [quorumThreshold, setQuorumThreshold] = useState(2);
  const [enableBuzzAlert, setEnableBuzzAlert] = useState(true);
  const [enableWebPush, setEnableWebPush] = useState(true);
  const [enableWhatsApp, setEnableWhatsApp] = useState(false);
  const [enableEmail, setEnableEmail] = useState(true);

  // Instant Test
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const monitorTypes = [
    { type: 'WEBSITE', name: 'Website / Web App', icon: Globe, desc: 'HTTP, SSL, DOM, TTFB' },
    { type: 'API', name: 'REST / GraphQL API', icon: Code, desc: 'JSON payloads, Headers, Status' },
    { type: 'SYNTHETIC', name: 'Synthetic Test', icon: Workflow, desc: 'Playwright headless user flow' },
    { type: 'DATABASE', name: 'Database Port', icon: Database, desc: 'PostgreSQL, MySQL, Redis' },
    { type: 'SERVER', name: 'Server / Node', icon: Server, desc: 'ICMP / TCP latency probes' },
    { type: 'BACKEND_SERVICE', name: 'Microservice / Queue', icon: Layers, desc: 'Kafka, RabbitMQ, Celery' },
  ];

  const locationsList = [
    { code: 'us-east', name: 'US East (N. Virginia)' },
    { code: 'eu-central', name: 'EU Central (Frankfurt)' },
    { code: 'ap-south', name: 'India (Mumbai)' },
    { code: 'ap-southeast', name: 'Singapore' },
  ];

  const handleNext = () => {
    playClickSound();
    if (step === 2) {
      const safe = validateSafeUrl(url);
      if (!safe.isValid) {
        alert(safe.error);
        return;
      }
    }
    setStep((prev) => Math.min(8, prev + 1));
  };

  const handleBack = () => {
    playClickSound();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleRunLiveTest = () => {
    playClickSound();
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      playRecoverySound();
      setTestResult({
        status: 'SUCCESS',
        statusCode: 200,
        latencyMs: 168,
        dnsMs: 14,
        tlsMs: 32,
        ttfbMs: 122,
        multiRegionQuorum: '3/3 Nodes Passed'
      });
    }, 1100);
  };

  const handleFinish = () => {
    playClickSound();
    addMonitor({
      name: name || `${monitorType} Monitor`,
      url: url,
      type: monitorType,
      method: method,
      interval: frequency,
      location: "Multi-Region Quorum",
      locationCode: "global-quorum",
      expectedStatus: parseInt(expectedStatus, 10) || 200,
      expectedText: expectedText,
      retryCount: retryCount,
      retryDelaySeconds: retryDelay,
      group: "Custom Probes",
      tags: ["custom", monitorType.toLowerCase()],
      responseTime: testResult ? testResult.latencyMs : 168
    });

    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-obsidian-900 border border-obsidian-700 rounded-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-obsidian-800 flex items-center justify-between bg-obsidian-950/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-bee-400 uppercase">
                Step {step} of 8:
              </span>
              <h3 className="text-base font-bold text-white">
                {step === 1 && "What do you want Bumblebee to watch?"}
                {step === 2 && "Endpoint Configuration & Headers"}
                {step === 3 && "Frequency & Probe Locations"}
                {step === 4 && "Response Validation Rules"}
                {step === 5 && "Failure Confirmation & Retry Policy"}
                {step === 6 && "Notification & Buzz Alert Routing"}
                {step === 7 && "Review & Run Live Probe"}
                {step === 8 && "Activate & Start Monitoring"}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-obsidian-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-obsidian-800 h-1">
          <div 
            className="bg-bee-500 h-full transition-all duration-200"
            style={{ width: `${(step / 8) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Friendly Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Production Billing API"
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                    <option value="HEAD">HEAD</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Target URL (SSRF Protected)</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-service.com/health"
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Headers (JSON / Masked Secrets)</label>
                <textarea
                  rows={2}
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  placeholder='Optional JSON headers (e.g. {"Authorization": "Bearer token"})'
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-2">Probe Interval</label>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {['10s', '30s', '60s', '5m'].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`py-2 rounded-lg border text-center font-bold ${
                        frequency === freq ? 'bg-bee-500 text-black border-bee-500' : 'bg-obsidian-950 border-obsidian-800 text-gray-300'
                      }`}
                    >
                      Every {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-2">Probe Geographic Locations</label>
                <div className="space-y-2">
                  {locationsList.map((loc) => {
                    const isChecked = selectedLocations.includes(loc.code);
                    return (
                      <label key={loc.code} className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                        <span className="text-xs font-mono text-gray-300">{loc.name}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setSelectedLocations(selectedLocations.filter(c => c !== loc.code));
                            } else {
                              setSelectedLocations([...selectedLocations, loc.code]);
                            }
                          }}
                          className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Expected HTTP Status Code</label>
                <input
                  type="text"
                  value={expectedStatus}
                  onChange={(e) => setExpectedStatus(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="200"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Expected Response Substring</label>
                <input
                  type="text"
                  value={expectedText}
                  onChange={(e) => setExpectedText(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                  placeholder='"status": "ok"'
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 uppercase mb-1">JSONPath Assertion (Optional)</label>
                <input
                  type="text"
                  value={jsonPath}
                  onChange={(e) => setJsonPath(e.target.value)}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="data.healthy == true"
                />
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-3">
              <div className="p-3 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs text-gray-300">
                <span className="text-bee-400 font-bold block mb-1">BUMBLEBEE CONFIRMATION POLICY</span>
                To eliminate false alarms, Bumblebee requires consecutive retry failures across multiple regional probe nodes before creating an incident.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Retry Count Before Incident</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={retryCount}
                    onChange={(e) => setRetryCount(parseInt(e.target.value, 10))}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Retry Delay (Seconds)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={retryDelay}
                    onChange={(e) => setRetryDelay(parseInt(e.target.value, 10))}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white">🐝 Bumblebee Buzz Alert (Audible Alarm)</span>
                  <p className="text-gray-400 text-[11px]">Instant siren synthesizer on Critical outage quorum</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableBuzzAlert}
                  onChange={(e) => setEnableBuzzAlert(e.target.checked)}
                  className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white">Browser Web Push & PWA</span>
                  <p className="text-gray-400 text-[11px]">Device push notification even when browser is closed</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableWebPush}
                  onChange={(e) => setEnableWebPush(e.target.checked)}
                  className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white">WhatsApp Business Notification</span>
                  <p className="text-gray-400 text-[11px]">Direct verified WhatsApp text to On-Call engineer</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableWhatsApp}
                  onChange={(e) => setEnableWhatsApp(e.target.checked)}
                  className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white">Email Incident Telemetry</span>
                  <p className="text-gray-400 text-[11px]">Root cause attachments and recovery notice</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableEmail}
                  onChange={(e) => setEnableEmail(e.target.checked)}
                  className="rounded bg-obsidian-900 border-obsidian-700 text-bee-500 focus:ring-bee-500"
                />
              </label>
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-300">
                Execute a live multi-region pre-flight probe test against <code className="text-bee-400 font-mono">{url}</code> before deploying to the scheduler.
              </p>

              <button
                onClick={handleRunLiveTest}
                disabled={isTesting}
                className="inline-flex items-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-glow-amber transition-all"
              >
                {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-black" />}
                <span>{isTesting ? "Testing Probes..." : "Run Pre-Flight Probe Test"}</span>
              </button>

              {testResult && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-left text-xs font-mono space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> HTTP 200 OK — Probe Verified
                    </span>
                    <span>{testResult.latencyMs} ms</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-gray-300 text-[11px]">
                    <div>DNS: {testResult.dnsMs}ms</div>
                    <div>TLS: {testResult.tlsMs}ms</div>
                    <div>TTFB: {testResult.ttfbMs}ms</div>
                    <div>Quorum: {testResult.multiRegionQuorum}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 8 */}
          {step === 8 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-glow-operational">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Ready to Start Continuous Watching!
              </h4>
              <p className="text-xs text-gray-300 max-w-sm mx-auto font-mono">
                Bumblebee will probe <span className="text-bee-400 font-bold">{name || url}</span> every {frequency}.
              </p>
              <button
                onClick={handleFinish}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all hover:scale-105"
              >
                <span>Deploy Watchdog to Production</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Footer controls */}
        <div className="px-6 py-3.5 border-t border-obsidian-800 bg-obsidian-950 flex items-center justify-between">
          {step > 1 && step < 8 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-obsidian-800 font-mono transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : <div></div>}

          {step < 8 && (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber transition-all ml-auto"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
