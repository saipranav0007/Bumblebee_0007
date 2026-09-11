import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const { title, monitorName, severity, errorMessage } = payload;

    // Simulate multi-channel broadcast dispatch (Web Push, WhatsApp, Email, PWA)
    const dispatchReceipt = {
      alertId: `BUZZ-${Date.now()}`,
      triggeredAt: new Date().toISOString(),
      service: monitorName || "Stripe & Crypto Payment Gateway API",
      severity: severity || "CRITICAL",
      channelsDispatched: [
        { channel: "BROWSER_WEB_PUSH", status: "DELIVERED", latencyMs: 14 },
        { channel: "MOBILE_PWA_PUSH", status: "DELIVERED", latencyMs: 28 },
        { channel: "WHATSAPP_BUSINESS_API", status: "DELIVERED", latencyMs: 180 },
        { channel: "TRANSACTIONAL_EMAIL", status: "DELIVERED", latencyMs: 320 }
      ],
      synthesizerState: "AUDIO_ALARM_ARMED"
    };

    return NextResponse.json({
      success: true,
      message: "🐝 Bumblebee Buzz Alert successfully broadcasted across all emergency channels.",
      receipt: dispatchReceipt
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
