import sharedConfig from 'config/tailwind/tailwind.config.ts'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    // h/t to https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
    '../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}',
    '../../packages/editor/src/**/*{.js,.ts,.jsx,.tsx}',
  ],
  presets: [sharedConfig],
  theme: {
    colors: {
      emerald: {
        // PRIMARY COLOR
        '50': '#eefff6',
        '100': '#d7ffed',
        '200': '#b2ffdc',
        '300': '#76ffc3',
        '400': '#33f5a1',
        '500': '#09de82',
        '600': '#00cf76',
        '700': '#049155',
        '800': '#0a7146',
        '900': '#0a5d3c',
        '950': '#00341f',
      },
    },
    fontFamily: {
      default: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-geist-mono)', 'system-ui', 'sans-serif'],
    },
  },
}

export default config
