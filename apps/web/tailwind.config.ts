import sharedConfig from 'config/tailwind/tailwind.config.ts'
import type { Config } from 'tailwindcss'

const config: Config = {
  presets: [sharedConfig],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // h/t to https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
    '../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
}

export default config
