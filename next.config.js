const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useDeploymentId: true,
    serverActions: true,
    useDeploymentIdServerActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
}

// module.exports = nextConfig
module.exports = withContentlayer(nextConfig)
