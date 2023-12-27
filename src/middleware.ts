import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { setHeaderToken } from './func/fetchCall'
export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  if (!accessToken) {
    return NextResponse.rewrite(new URL('/login', request.url))
  } else {
    setHeaderToken(accessToken + '')
  }
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/createAccount')
  ) {
    if (accessToken) return NextResponse.rewrite(new URL('/home', request.url))
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
