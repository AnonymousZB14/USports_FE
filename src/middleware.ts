import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { setHeaderToken } from './func/fetchCall'
export async function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests`
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  )
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    setHeaderToken(accessToken + '')
  }
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/createAccount')
  ) {
    if (accessToken) return NextResponse.redirect(new URL('/home', request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/home/:path*',
    '/explore/:path*',
    '/messages/:path*',
    '/member/:path*',
    '/mypage/:path*',
    '/notifications/:path*',
    '/record/:path*',
    '/recruit/:path*',
  ],
}
