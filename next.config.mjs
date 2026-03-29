/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/ideas",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
