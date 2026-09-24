import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Sucht die Sprach-Konfiguration standardmäßig unter ./src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // FACE-Demo unter /software-demo (nicht /demo – das ist die Buchungsseite).
  async rewrites() {
    return [
      { source: "/software-demo", destination: "/software-demo/index.html" },
      { source: "/software-demo/", destination: "/software-demo/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/software-demo/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob:",
              "connect-src 'none'",
              "worker-src 'none'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
