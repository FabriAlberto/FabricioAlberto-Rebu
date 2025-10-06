import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticatedServer } from './utils/auth-server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/employees')) {
    const token = request.cookies.get('auth-token')?.value;
    if (!token || token !== 'auth-token-12345') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  if (pathname === '/login') {
    if (isAuthenticatedServer()) {
      return NextResponse.redirect(new URL('/employees', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/employees/:path*',
    '/login'
  ]
};
