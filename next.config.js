const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
}

// module.exports = nextConfig
module.exports = withContentlayer(nextConfig)
