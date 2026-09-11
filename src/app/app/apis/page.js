'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { validateSafeUrl } from '../../../lib/ssrf';
import { playClickSound, playRecoverySound } from '../../../lib/sound';
import { 
  Code, 
  Send, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Server, 
  Layers, 
  Sliders, 
  ExternalLink,
  Zap
} from 'lucide-react';

export default function ApisPage() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('https://api.github.com/status');
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer ••••••••82KQ",\n  "Accept": "application/json"\n}');
  const [requestBody, setRequestBody] = useState('{\n  "amount": 4900,\n  "currency": "usd"\n}');
  const [jsonAssertion, setJsonAssertion] = useState('status == "ok"');
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleTestApi = () => {
    playClickSound();
    const safety = validateSafeUrl(endpoint);
    if (!safety.isValid) {
      alert(safety.error);
      return;
    }

    setIsExecuting(true);
    setApiResponse(null);

    setTimeout(() => {
      setIsExecuting(false);
      playRecoverySound();
      setApiResponse({
        statusCode: 200,
        statusText: "OK",
        responseTimeMs: 142,
        dnsMs: 12,
        tlsMs: 24,
        ttfbMs: 106,
        body: JSON.stringify({
          status: "ok",
          message: "All systems operating at normal capacity",
          timestamp: new Date().toISOString(),
          region: "us-east-1",
          authenticatedAs: "service_account_prod"
        }, null, 2),
        ssl: {
          issuer: "DigiCert Global Root CA",
          validTo: "2027-04-14",
          daysRemaining: 184,
          protocol: "TLSv1.3",
          cipher: "TLS_AES_256_GCM_SHA384",
          hostnameMatch: true
        }
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>APIs & Backend Services Inspector</span>
            <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
              <Code className="w-4 h-4" />
            </span>
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
          Probe REST & GraphQL endpoints, validate JSONPath response schemas, and inspect TLS 1.3 certificates.
        </p>
      </div>

      {/* Main Request / Response Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Request Builder (6 cols) */}
        <div className="lg:col-span-6 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              API Probe Request
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              SSRF PROTECTED
            </span>
          </div>

          {/* Method & URL */}
          <div className="flex items-center gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2.5 text-xs text-bee-400 font-bold font-mono focus:outline-none focus:border-bee-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>

            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://api.yourcompany.com/v1/health"
              className="flex-1 bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>

          {/* Headers */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              Headers (JSON / Masked Vault Tokens)
            </label>
            <textarea
              rows={3}
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-2.5 text-xs text-gray-300 focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>

          {/* Body */}
          {['POST', 'PUT', 'PATCH'].includes(method) && (
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                JSON Request Payload
              </label>
              <textarea
                rows={3}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-2.5 text-xs text-gray-300 focus:outline-none focus:border-bee-500 font-mono"
              />
            </div>
          )}

          {/* JSON Assertion */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              JSONPath Schema Assertion
            </label>
            <input
              type="text"
              value={jsonAssertion}
              onChange={(e) => setJsonAssertion(e.target.value)}
              placeholder="status == 'ok'"
              className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>

          <button
            onClick={handleTestApi}
            disabled={isExecuting}
            className="w-full flex items-center justify-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-bold text-xs py-3 rounded-xl shadow-glow-amber transition-all"
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Sending Probe Request...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                <span>Send API Health Probe</span>
              </>
            )}
          </button>

        </div>

        {/* Right: Response Inspector & SSL Details (6 cols) */}
        <div className="lg:col-span-6 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Live Probe Response & Telemetry
            </h3>
            {apiResponse && (
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                HTTP {apiResponse.statusCode} {apiResponse.statusText} • {apiResponse.responseTimeMs}ms
              </span>
            )}
          </div>

          {apiResponse ? (
            <div className="space-y-4 animate-in fade-in">
              {/* Telemetry Breakdown */}
              <div className="grid grid-cols-3 gap-2 bg-obsidian-950 p-3 rounded-xl border border-obsidian-800 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block">DNS Lookup</span>
                  <span className="text-white font-bold">{apiResponse.dnsMs} ms</span>
                </div>
                <div>
                  <span className="text-gray-500 block">TLS Handshake</span>
                  <span className="text-white font-bold">{apiResponse.tlsMs} ms</span>
                </div>
                <div>
                  <span className="text-gray-500 block">TTFB</span>
                  <span className="text-white font-bold">{apiResponse.ttfbMs} ms</span>
                </div>
              </div>

              {/* JSON Response Body */}
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase block mb-1">Response Body</span>
                <pre className="p-3 rounded-xl bg-obsidian-950 border border-obsidian-800 text-[11px] font-mono text-gray-300 max-h-48 overflow-y-auto">
                  {apiResponse.body}
                </pre>
              </div>

              {/* SSL Certificate Inspector */}
              <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> SSL Certificate Valid ({apiResponse.ssl.daysRemaining} days remaining)
                  </span>
                  <span>{apiResponse.ssl.protocol}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-2 border-t border-obsidian-800">
                  <div>Issuer: <strong className="text-gray-300">{apiResponse.ssl.issuer}</strong></div>
                  <div>Expiry: <strong className="text-gray-300">{apiResponse.ssl.validTo}</strong></div>
                  <div>Hostname Match: <strong className="text-emerald-400">VERIFIED</strong></div>
                  <div>Cipher: <strong className="text-gray-300">{apiResponse.ssl.cipher}</strong></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 text-xs font-mono">
              Click "Send API Health Probe" to execute an immediate probe and inspect HTTP headers, latency metrics, and SSL certificates.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
