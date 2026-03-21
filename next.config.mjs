/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    urlImports: ['https://framer.com/m/', 'https://framerusercontent.com/'],
  },
};

export default nextConfig;
