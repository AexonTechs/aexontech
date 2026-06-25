import { NextResponse } from 'next/server';

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://13.126.130.137:5000'
).replace(/\/$/, '');

export async function GET() {
  const clientStatus = {
    status: 'ok',
    service: 'aexon-client',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'unknown',
    apiBaseUrl: API_BASE_URL,
    backend: { status: 'unknown' } as Record<string, unknown>,
  };

  // Try to ping the backend health endpoint
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      clientStatus.backend = { status: 'ok', ...data };
    } else {
      clientStatus.backend = { status: 'error', httpStatus: res.status };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    clientStatus.backend = { status: 'unreachable', error: message };
  }

  return NextResponse.json(clientStatus, { status: 200 });
}
