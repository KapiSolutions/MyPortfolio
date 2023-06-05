/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV == "production";
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: `/${process.env.GS_BUCKET_NAME}/**`,
      },
    ],
  },
  i18n: {
    locales: ["default", "en", "pl"],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' https://vitals.vercel-insights.com https://www.google.com/recaptcha/ https://translate.googleapis.com ; form-action 'self'; frame-src 'self' https://www.google.com/recaptcha/; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' https://storage.googleapis.com data: ; script-src 'self' ${
              prod ? "" : "'unsafe-eval'"
            } https://apis.google.com  https://vitals.vercel-insights.com/  https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ ;`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
