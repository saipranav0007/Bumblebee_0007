import { NextResponse } from 'next/server';
import { INITIAL_INCIDENTS } from '../../../lib/mock-data';

let memoryIncidents = [...INITIAL_INCIDENTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: memoryIncidents.length,
    incidents: memoryIncidents
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, incidentId } = body;

    if (action === 'RESOLVE') {
      memoryIncidents = memoryIncidents.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'RESOLVED',
            resolvedAt: new Date().toISOString()
          };
        }
        return inc;
      });
      return NextResponse.json({ success: true, message: `Incident ${incidentId} marked as RESOLVED.` });
    }

    return NextResponse.json({ success: false, error: 'Unsupported action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
