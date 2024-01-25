import { Options, defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  banner: {
    js: "'use client'",
  },
  dts: true,
  minify: true,
  external: ['react'],
  injectStyle: true,
  ...options,
}))
