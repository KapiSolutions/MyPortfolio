/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  i18n: {
    locales: ["default", "en", "pl"],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: false,
}

module.exports = nextConfig
