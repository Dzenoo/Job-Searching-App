/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: ["cloudinary"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
