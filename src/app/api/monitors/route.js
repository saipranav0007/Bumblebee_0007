import { NextResponse } from 'next/server';
import { validateSafeUrl } from '../../../lib/ssrf';
import { INITIAL_MONITORS } from '../../../lib/mock-data';

let memoryMonitors = [...INITIAL_MONITORS];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: memoryMonitors.length,
    monitors: memoryMonitors
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, url, type, interval } = body;

    const safety = validateSafeUrl(url);
    if (!safety.isValid) {
      return NextResponse.json({ success: false, error: safety.error }, { status: 400 });
    }

    const newMonitor = {
      id: `mon-${Date.now()}`,
      name: name || 'Custom Watchdog',
      url: url,
      type: type || 'WEBSITE',
      interval: interval || '30s',
      status: 'OPERATIONAL',
      responseTime: 180,
      uptime: 100.0,
      lastCheck: 'just now',
      location: 'US East (N. Virginia)',
      locationCode: 'us-east',
      sparkline: [170, 185, 175, 190, 180],
      sslExpiryDays: 90,
      tlsVersion: 'TLSv1.3',
      consecutiveFails: 0,
      createdAt: new Date().toISOString()
    };

    memoryMonitors.unshift(newMonitor);

    return NextResponse.json({
      success: true,
      monitor: newMonitor
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
