/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      'src/app/(logged)/@modal/(.)member/:id': { page: '/member/:id' }, // correct
    }
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://3.39.34.245:8080/:path*',
      },
    ]
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'usportsbucket-kmj.s3.ap-northeast-2.amazonaws.com',
        /*         port: '',
        pathname: '/account123/**', */
      },
    ],
  },
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
}
