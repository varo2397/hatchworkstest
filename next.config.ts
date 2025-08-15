import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default nextConfig;
