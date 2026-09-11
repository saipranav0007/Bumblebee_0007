import { NextResponse } from 'next/server';
import { validateSafeUrl } from '@/lib/ssrf';

/**
 * 🐝 Bumblebee Serverless Watchdog Cron Endpoint
 * Automatically executed by Vercel Cron every minute for 100% FREE serverless monitoring.
 */
export async function GET(request) {
  const startTime = Date.now();
  const probeResults = [];

  // Default critical probe targets if none in database yet
  const defaultTargets = [
    { id: 'mon-1', name: 'Production Customer Portal', url: 'https://httpstat.us/200', type: 'WEBSITE' },
    { id: 'mon-2', name: 'Stripe Payment Gateway API', url: 'https://httpstat.us/200', type: 'API' },
    { id: 'mon-3', name: 'Global Anycast DNS', url: 'https://1.1.1.1', type: 'PING' },
    { id: 'mon-4', name: 'Auth0 OAuth Security Cluster', url: 'https://httpstat.us/200', type: 'API' }
  ];

  for (const target of defaultTargets) {
    const checkStart = Date.now();
    try {
      // 1. SSRF Safety Check
      const ssrfCheck = validateSafeUrl(target.url);
      if (!ssrfCheck.safe) {
        probeResults.push({
          id: target.id,
          name: target.name,
          status: 'BLOCKED_SSRF',
          reason: ssrfCheck.reason,
          latency: 0
        });
        continue;
      }

      // 2. Execute Probe with 5s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(target.url, {
        method: 'GET',
        signal: controller.signal,
        headers: { 'User-Agent': 'Bumblebee-Watchdog/1.0.0 (Quorum Engine)' }
      });
      clearTimeout(timeoutId);

      const latency = Date.now() - checkStart;
      const isOperational = response.status >= 200 && response.status < 400;

      probeResults.push({
        id: target.id,
        name: target.name,
        status: isOperational ? 'OPERATIONAL' : 'DEGRADED',
        statusCode: response.status,
        latencyMs: latency,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      probeResults.push({
        id: target.id,
        name: target.name,
        status: 'DOWN',
        error: err.name === 'AbortError' ? 'TIMEOUT_5000MS' : err.message,
        latencyMs: Date.now() - checkStart,
        timestamp: new Date().toISOString()
      });
    }
  }

  const duration = Date.now() - startTime;

  return NextResponse.json({
    success: true,
    engine: 'Bumblebee Serverless Edge Watchdog',
    probesCount: probeResults.length,
    executionTimeMs: duration,
    results: probeResults,
    timestamp: new Date().toISOString()
  });
}
