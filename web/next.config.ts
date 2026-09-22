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
};

export default withNextIntl(nextConfig);
