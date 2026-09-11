'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { playClickSound, playRecoverySound } from '../../../lib/sound';
import { 
  Workflow, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Code, 
  RefreshCw, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Eye, 
  Clock, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SyntheticTestsPage() {
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [activeStepRunning, setActiveStepRunning] = useState(0);
  const [testResult, setTestResult] = useState(null);

  const [steps, setSteps] = useState([
    { id: 1, action: "GOTO", target: "https://app.bumblebee.io/login", label: "Open Portal Login URL", timeout: "5000ms" },
    { id: 2, action: "WAIT_FOR_SELECTOR", target: "#email-input", label: "Wait for Email Input field", timeout: "3000ms" },
    { id: 3, action: "TYPE_SECRET", target: "#password-input", label: "Fill Masked Password (••••••••82KQ)", isSecret: true, timeout: "2000ms" },
    { id: 4, action: "CLICK", target: "button[type='submit']", label: "Submit Authentication Form", timeout: "5000ms" },
    { id: 5, action: "ASSERT_ELEMENT", target: "#dashboard-overview", label: "Verify Dashboard Header renders", timeout: "5000ms" }
  ]);

  const handleRunJourney = () => {
    playClickSound();
    setIsRunningTest(true);
    setActiveStepRunning(1);
    setTestResult(null);

    // Step by step progression
    setTimeout(() => setActiveStepRunning(2), 600);
    setTimeout(() => setActiveStepRunning(3), 1200);
    setTimeout(() => setActiveStepRunning(4), 1800);
    setTimeout(() => setActiveStepRunning(5), 2400);
    setTimeout(() => {
      setActiveStepRunning(6);
      setIsRunningTest(false);
      playRecoverySound();
      setTestResult({
        status: 'PASSED',
        totalDurationMs: 2740,
        screenshotUrl: '/synthetic-proof.png',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
    }, 3000);
  };

  const samplePlaywrightCode = `// Generated Playwright Synthetic Watchdog Script
import { test, expect } from '@playwright/test';

test('E2E User Login & Dashboard Verification', async ({ page }) => {
  // Step 1: Navigate to endpoint
  await page.goto('https://app.bumblebee.io/login');
  
  // Step 2: Wait for DOM readiness
  await page.waitForSelector('#email-input', { timeout: 3000 });
  
  // Step 3: Inject zero-knowledge vault credential
  await page.fill('#email-input', 'qa-synthetic@bumblebee.io');
  await page.fill('#password-input', process.env.BUMBLEBEE_VAULT_SECRET);
  
  // Step 4: Click submit
  await page.click("button[type='submit']");
  
  // Step 5: Assert dashboard render
  const header = page.locator('#dashboard-overview');
  await expect(header).toBeVisible({ timeout: 5000 });
});`;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Synthetic User Journeys</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-400 border border-bee-500/30 text-xs">
                <Workflow className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Simulate real multi-step user workflows using headless Chromium / Playwright instances with zero-knowledge secret injection.
          </p>
        </div>

        <button
          onClick={handleRunJourney}
          disabled={isRunningTest}
          className="flex items-center gap-2 bg-bee-500 hover:bg-bee-400 disabled:opacity-50 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-glow-amber transition-all"
        >
          {isRunningTest ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
          <span>{isRunningTest ? "Executing Headless Flow..." : "Run Synthetic Test"}</span>
        </button>
      </div>

      {/* Main Builder & Executor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Step-by-Step Flow (7 cols) */}
        <div className="lg:col-span-7 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Journey: User Authentication & Checkout</h3>
              <span className="text-xs text-gray-400 font-mono">Target: https://app.bumblebee.io/login • Chromium Node</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              INTERVAL: 2 MIN
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-3">
            {steps.map((step) => {
              const isExecuting = isRunningTest && activeStepRunning === step.id;
              const isCompleted = activeStepRunning > step.id || (testResult && !isRunningTest);
              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    isExecuting
                      ? 'bg-bee-500/15 border-bee-500 text-white shadow-glow-amber'
                      : isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-gray-200'
                      : 'bg-obsidian-950 border-obsidian-800 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-emerald-500 text-black' : 'bg-obsidian-800 text-gray-300'
                    }`}>
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                    </span>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{step.label}</span>
                        {step.isSecret && (
                          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                            AES-256 VAULT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-gray-500 mt-0.5">
                        <strong className="text-bee-400">{step.action}</strong> → <code>{step.target}</code>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-gray-500">
                    {isExecuting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-bee-400" />
                    ) : (
                      step.timeout
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Test Result Box */}
          {testResult && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Headless Synthetic Test PASSED (5/5 Steps)
                </span>
                <span>{testResult.totalDurationMs} ms</span>
              </div>
              <p className="text-gray-300 text-[11px]">
                Executed on US-East Playwright worker node. Zero DOM assertion timeouts. Masked credentials cleared from memory immediately.
              </p>
            </div>
          )}
        </div>

        {/* Right: Code Exporter & Playwright Script (5 cols) */}
        <div className="lg:col-span-5 bg-obsidian-900 border border-obsidian-700 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <Code className="w-4 h-4 text-bee-400" />
                <span>Playwright / Headless Script</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">TypeScript / Python</span>
            </div>

            <pre className="mt-3 p-3 bg-obsidian-950 border border-obsidian-800 rounded-xl text-[11px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
              {samplePlaywrightCode}
            </pre>
          </div>

          <div className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-xl text-xs font-mono text-gray-400">
            <span className="text-bee-400 font-bold block mb-1">PAYMENT SANDBOX POLICY:</span>
            Never run live credit cards in production synthetic tests. Bumblebee supports dry-run sandboxes and Stripe test credentials.
          </div>
        </div>

      </div>

    </div>
  );
}
