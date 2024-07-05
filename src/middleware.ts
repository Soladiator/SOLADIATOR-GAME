import { NextRequest, NextResponse } from 'next/server'
import { adminMiddleware } from './middlewares'

export async function middleware(req: NextRequest) {
  const adminAuthResponse = await adminMiddleware(req)
  if (adminAuthResponse) return adminAuthResponse

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/admin/:path*'], // Matches admin routes, API routes, and non-API routes
}
