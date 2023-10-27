const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useDeploymentId: true,
    serverActionsBodySizeLimit: '3mb',
    useDeploymentIdServerActions: true,
    webpackBuildWorker: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
}

// module.exports = nextConfig
module.exports = withContentlayer(nextConfig)
