import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function adminMiddleware(request: NextRequest) {
  const queryParams = new URL(request.url).searchParams

  if (queryParams.get('apiKey') !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
