// Content Security Policy: only the site itself and the Google Maps platform
// (scripts, tiles, fonts, Routes API) may load resources. Gemini and Resend are
// called server-side, so they do not appear here. 'unsafe-inline' is required
// by Next.js inline bootstrap scripts and by Google Maps styles.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.googleapis.com https://*.gstatic.com https://*.google.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Montreal purification project was withdrawn; old links go to the home page.
  async redirects() {
    return [{ source: "/:lang(fr|en)/epuration", destination: "/:lang", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Microphone: voice chat with the assistant. Geolocation: "locate me" on the map.
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
