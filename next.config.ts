import type { NextConfig } from 'next';

/**
 * Security headers applied to every response.
 *
 * Content-Security-Policy breakdown:
 *  - default-src 'self'          → only load resources from your own origin by default
 *  - script-src 'self' 'unsafe-inline' 'unsafe-eval'
 *                                → Next.js/React need these for hydration & RSC;
 *                                   tighten by adding a nonce in middleware when possible
 *  - style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
 *                                → Tailwind inlines styles; Google Fonts stylesheet
 *  - font-src 'self' https://fonts.gstatic.com
 *                                → Google Fonts actual font files
 *  - img-src 'self' data: blob:  → local images, inline data URIs, canvas blobs
 *  - media-src 'self'            → local <video>/<audio> files
 *  - connect-src 'self' blob:    → fetch/XHR to own origin + blob URLs (Three.js GLTFLoader)
 *  - worker-src 'self' blob:     → allow blob: workers (Three.js may spawn workers)
 *  - frame-ancestors 'none'      → disallow iframing your site (clickjacking defence)
 *  - object-src 'none'           → block Flash / old plugins
 *  - base-uri 'self'             → prevent <base> tag hijacking
 *  - form-action 'self'          → prevent form submissions to external sites
 *  - upgrade-insecure-requests   → force HTTPS
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "connect-src 'self' blob:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  {
    // Prevent browsers from MIME-sniffing away from the declared Content-Type
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Disallow the site from being embedded in an iframe (extra clickjacking guard)
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Enable the browser's built-in XSS filter (legacy browsers)
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    // Don't send the Referer header to cross-origin destinations
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Restrict what browser features this page can use
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), clipboard-write=()',
  },
  {
    // Force HTTPS for 1 year (set once you're sure HTTPS is permanent)
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
