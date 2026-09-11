import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'OPERATIONAL',
    service: 'Bumblebee Digital Service Watchdog Engine',
    version: '2.4.0',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    regions: ['us-east-1', 'eu-central-1', 'ap-south-1', 'ap-southeast-1'],
    checksToday: 245832,
    activeWatchdogs: 128
  });
}
