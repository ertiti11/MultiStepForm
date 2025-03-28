/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    RESEND_API_KEY: 're_fmEviVfX_PxHMyd4hAwBGJ1KAfhMYh44L',
  },
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // async redirects() {
  //   return [
  //     {
  //       source: '/gracias',
  //       destination: '/gracias',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
