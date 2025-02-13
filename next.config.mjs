/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      }
      // Ajoutez d'autres domaines si nécessaire
    ]
  }
};

export default nextConfig;
