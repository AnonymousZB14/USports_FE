/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  generateStaticParams: function () {
    return {
      '/': { page: '/' },
      'src/app/(logged)/@modal/(.)member/:id': { page: '/member/:id' }, // correct
    }
  },
  async rewrites() {
    return [
      {
        source: '/usports/:path*',
        destination: 'http://3.39.34.245:8080/:path*',
      },
    ]
  },
  // trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'usportsbucket-kmj.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
