/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "job-searching-application.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
