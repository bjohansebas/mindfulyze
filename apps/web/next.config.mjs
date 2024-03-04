import { build } from 'velite'

/** @type {import('next').NextConfig} */
export default {
  experimental: {
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
    serverActions: {
      bodySizeLimit: '3mb',
    },
    optimizePackageImports: ['@mindfulyze/ui', '@mindfulyze/editor', '@mindfulyze/utils'],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
  logging: {
    fetches: { fullUrl: true },
  },
  transpilePackages: ['@mindfulyze/ui', '@mindfulyze/editor', '@mindfulyze/utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

class VeliteWebpackPlugin {
  static started = false
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      this.options.watch = this.options.watch ?? dev
      this.options.clean = this.options.clean ?? !dev
      await build(this.options) // start velite
    })
  }
}
