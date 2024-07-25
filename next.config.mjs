/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
