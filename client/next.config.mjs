/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: process.env.GRAPHQL_URL,
      },
    ];
  },
};

export default nextConfig;
