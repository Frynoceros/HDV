const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opendata.hawaii.gov',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'health.hawaii.gov',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'icons.iconarchive.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
