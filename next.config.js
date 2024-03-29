/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async generateStaticParams() {
    return {
      'src/app/(logged)/@modal/(.)member/:id': { page: '/member/:id' }, // correct
    }
  },
  async headers() {
    return [
      {
        source: '/usports/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/usports/:path*',
        destination: 'https://3.39.34.245.nip.io/:path*',
      },
      {
        source: '/ws/chat/:path*',
        destination: 'https://3.39.34.245.nip.io/ws/chat/:path*',
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
