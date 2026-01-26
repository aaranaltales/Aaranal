import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Set COOP headers for Google OAuth
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
  
  return response;
}

// Apply to all routes
export const config = {
  matcher: '/:path*',
};
