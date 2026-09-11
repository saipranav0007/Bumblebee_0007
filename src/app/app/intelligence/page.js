'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { generateAIChatResponse, AI_PATTERNS, AI_PREDICTIONS } from '../../../lib/ai-engine';
import { playClickSound } from '../../../lib/sound';
import { 
  Brain, 
  Sparkles, 
  Send, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Radio, 
  FileText, 
  ArrowRight,
  RefreshCw,
  Shield,
  Zap,
  Flame
} from 'lucide-react';

export default function IntelligencePage() {
  const { monitors, incidents, activityFeed } = useBumblebee();

  // Chat State
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "🐝 I've been watching your services. Telemetry indicates 1 critical outage on Payment Gateway API and 1 degraded latency trend on Auth Service.",
      breakdown: {
        confirmed: "HTTP 503 returned across US-East, EU-Frankfurt, and AP-Mumbai probe nodes.",
        observed: "Response latency rose from 320ms to 6,800ms 14 minutes prior to failure, correlated with PostgreSQL connection pool saturation at 96.4%.",
        likely: "Database transaction lock contention or pool ceiling exhaustion on payment worker threads.",
        unknown: "Container pod CPU/memory thrash specifics without APM agent profiler logs."
      },
      nextStep: "Inspect active database queries and consider restarting affected payment worker pods."
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('ANALYST'); // 'ANALYST', 'PATTERNS', 'PREDICTIONS', 'BRIEF'

  const quickPrompts = [
    "Why did the API fail?",
    "What happened today?",
    "Which service is causing the most incidents?",
    "Why is the Authentication service getting slower?"
  ];

  const handleSendMessage = (promptText) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    playClickSound();
    const userMsg = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsAiThinking(true);

    setTimeout(() => {
      const aiResponse = generateAIChatResponse(textToSend, { monitors, incidents, activity: activityFeed });
      setMessages((prev) => [...prev, { role: 'assistant', ...aiResponse }]);
      setIsAiThinking(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Bumblebee Intelligence</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/40 text-xs">
                <Brain className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            "Your AI reliability analyst." Correlates authorized telemetry, historical baselines, and root causes without hallucinations.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-obsidian-900 p-1 rounded-xl border border-obsidian-800 text-xs font-mono">
          {[
            { id: 'ANALYST', label: 'AI Analyst & Chat' },
            { id: 'PATTERNS', label: 'Pattern Radar' },
            { id: 'PREDICTIONS', label: 'Predictive Alerts' },
            { id: 'BRIEF', label: 'Daily Brief' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClickSound(); setActiveSubTab(tab.id); }}
              className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                activeSubTab === tab.id ? 'bg-bee-500 text-black shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-VIEW 1: AI ANALYST & CHAT */}
      {activeSubTab === 'ANALYST' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Situation Summary & Timeline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Situation Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-obsidian-700/80 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-bee-400 font-bold font-mono text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Current Situation Report
              </div>

              <p className="text-sm font-bold text-white leading-snug">
                🐝 I've been watching your services.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/40 text-red-200 flex items-center justify-between">
                  <span>🔴 Payment Gateway API</span>
                  <span className="font-bold text-red-400">CRITICAL DOWN</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 flex items-center justify-between">
                  <span>🟠 User Authentication</span>
                  <span className="font-bold text-amber-400">SLOW (+480% TTFB)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 flex items-center justify-between">
                  <span>🟢 Core Edge CDN & Redis</span>
                  <span className="font-bold text-emerald-400">100% HEALTHY</span>
                </div>
              </div>
            </div>

            {/* AI Timeline Analysis: What happened today? */}
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-bee-400" /> Chronological Telemetry Timeline
              </h3>

              <div className="space-y-2 text-xs font-mono border-l border-obsidian-800 ml-2 pl-3">
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-gray-500">08:00 UTC</span> • <span className="text-emerald-400">All services healthy & green</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-gray-500">13:42 UTC</span> • <span className="text-amber-300">Customer Portal latency increased (+45ms)</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-gray-500">13:48 UTC</span> • <span className="text-gray-300">Transient latency normalized</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-gray-500">17:31 UTC</span> • <span className="text-amber-400">Authentication TTFB increased to 2,450ms</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-gray-500">18:42 UTC</span> • <span className="text-red-400 font-bold">Payment API DOWN (HTTP 503 Quorum)</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-bee-400" />
                  <span className="text-gray-500">18:44 UTC</span> • <span className="text-bee-400">🐝 Buzz Alert dispatched across all channels</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive AI Analyst Chat & Fact Engine (7 cols) */}
          <div className="lg:col-span-7 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-5 shadow-2xl flex flex-col h-[650px]">
            
            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 text-xs ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-bee-500/20 text-bee-400 border border-bee-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                      🐝
                    </div>
                  )}

                  <div className={`p-4 rounded-2xl max-w-xl space-y-2.5 ${
                    m.role === 'user'
                      ? 'bg-bee-500 text-black font-semibold rounded-br-sm'
                      : 'bg-obsidian-950 border border-obsidian-800 text-gray-200 rounded-bl-sm font-mono'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>

                    {/* Fact vs Inference Breakdown */}
                    {m.breakdown && (
                      <div className="space-y-1.5 pt-2 border-t border-obsidian-800/80 text-[11px]">
                        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                          <strong className="text-emerald-400">[CONFIRMED]:</strong> {m.breakdown.confirmed}
                        </div>
                        <div className="p-2 rounded bg-blue-950/30 border border-blue-500/30 text-blue-200">
                          <strong className="text-blue-400">[OBSERVED]:</strong> {m.breakdown.observed}
                        </div>
                        <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-amber-200">
                          <strong className="text-amber-400">[LIKELY]:</strong> {m.breakdown.likely}
                        </div>
                        <div className="p-2 rounded bg-gray-900 border border-gray-800 text-gray-400">
                          <strong className="text-gray-300">[UNKNOWN]:</strong> {m.breakdown.unknown}
                        </div>
                      </div>
                    )}

                    {m.nextStep && (
                      <div className="pt-1.5 text-[11px] text-bee-400 flex items-center gap-1 font-bold">
                        <Zap className="w-3 h-3" /> Recommended Step: {m.nextStep}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs font-mono text-bee-400 p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Bumblebee AI correlating telemetry and log facts...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Bar */}
            <div className="pt-3 pb-2 border-t border-obsidian-800 flex items-center gap-2 overflow-x-auto">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg bg-obsidian-950 hover:bg-obsidian-800 border border-obsidian-800 hover:border-bee-500 text-[11px] font-mono text-gray-300 hover:text-white shrink-0 transition-all"
                >
                  "{q}"
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                placeholder="Ask Bumblebee AI about outage causes, evidence, or historical trends..."
                className="flex-1 bg-obsidian-950 border border-obsidian-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputPrompt.trim() || isAiThinking}
                className="p-2.5 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-bold rounded-xl transition-all shadow-glow-amber"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SUB-VIEW 2: PATTERN RADAR */}
      {activeSubTab === 'PATTERNS' && (
        <div className="space-y-4">
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 rounded-2xl text-xs font-mono text-gray-400">
            <span className="text-bee-400 font-bold block mb-1">AUTONOMOUS PATTERN DETECTION ENGINE</span>
            Bumblebee continuously scans 30-day historical incident logs, time-of-day traffic spikes, and retry durations to detect recurring anomalies before they become catastrophic outages.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_PATTERNS.map((pat) => (
              <div
                key={pat.id}
                className={`p-5 rounded-2xl border bg-obsidian-900/90 ${
                  pat.severity === 'CRITICAL' ? 'border-red-500/50 shadow-glow-critical' :
                  pat.severity === 'WARNING' ? 'border-amber-500/50' :
                  'border-obsidian-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    pat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    pat.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {pat.severity}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{pat.id}</span>
                </div>

                <h3 className="text-sm font-bold text-white mt-3">
                  {pat.title}
                </h3>
                <span className="text-xs text-bee-400 font-mono block mt-0.5">
                  Service: {pat.service}
                </span>

                <p className="text-xs text-gray-300 font-mono mt-3 leading-relaxed">
                  {pat.evidence}
                </p>

                <div className="mt-4 pt-3 border-t border-obsidian-800 text-[11px] font-mono text-emerald-400">
                  <strong className="text-gray-400 block mb-0.5">RECOMMENDED ACTION:</strong>
                  {pat.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: PREDICTIONS */}
      {activeSubTab === 'PREDICTIONS' && (
        <div className="space-y-4">
          <div className="p-4 bg-obsidian-900 border border-obsidian-800 rounded-2xl text-xs font-mono text-gray-400">
            <span className="text-bee-400 font-bold block mb-1">PREDICTIVE DEGRADATION RADAR</span>
            Identifies gradual metric drift (TTFB slope, connection pool burn rate) where mathematical trends indicate imminent threshold breach.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_PREDICTIONS.map((pred) => (
              <div key={pred.id} className="p-5 rounded-2xl bg-obsidian-900 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {pred.status}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{pred.evidenceConfidence}</span>
                </div>

                <h3 className="text-base font-bold text-white">{pred.service}</h3>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 block">Current Metric</span>
                    <span className="text-red-400 font-bold">{pred.currentValue} ({pred.metric})</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">SLA Threshold</span>
                    <span className="text-gray-300 font-bold">{pred.threshold}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 font-mono leading-relaxed bg-obsidian-950 p-3 rounded-xl border border-obsidian-800">
                  {pred.predictionText}
                </p>

                <div className="text-xs font-mono text-bee-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Action: {pred.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: DAILY BRIEF */}
      {activeSubTab === 'BRIEF' && (
        <div className="max-w-3xl mx-auto bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
            <div>
              <div className="text-xs font-mono text-bee-400 font-bold uppercase">BUMBLEBEE INTELLIGENCE</div>
              <h2 className="text-xl font-bold text-white mt-1">Daily Reliability Briefing</h2>
              <span className="text-xs text-gray-500 font-mono">Generated at 08:00 UTC • Acme Cloud Technologies</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-bee-500/20 text-bee-400 border border-bee-500/40 flex items-center justify-center font-bold">
              🐝
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-mono">
            Good morning. Overall reliability across your 9 services was <strong>99.96%</strong> over the past 24 hours. A total of 3 incidents occurred (1 Critical, 2 Degraded), with a combined downtime of 7m 42s.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
            <div>
              <span className="text-gray-500 block">Overall Uptime</span>
              <span className="text-emerald-400 font-bold text-base">99.96%</span>
            </div>
            <div>
              <span className="text-gray-500 block">Total Incidents</span>
              <span className="text-white font-bold text-base">3</span>
            </div>
            <div>
              <span className="text-gray-500 block">Most Affected</span>
              <span className="text-red-400 font-bold">Payment API</span>
            </div>
            <div>
              <span className="text-gray-500 block">SLA Compliance</span>
              <span className="text-emerald-400 font-bold">ON TRACK</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-gray-300">
            <h4 className="font-bold text-white uppercase text-[11px]">Key Takeaways & SRE Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Authentication Service experienced periodic evening latency drift between 18:00 and 20:00 UTC. Pre-scaling is advised.</li>
              <li>PostgreSQL connection pool utilization surged to 96.4% concurrently with the Payment API HTTP 503 outage.</li>
              <li>SSL/TLS certificates for 4 domains remain valid for more than 60 days.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
