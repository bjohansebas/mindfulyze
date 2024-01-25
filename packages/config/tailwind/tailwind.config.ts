import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '420px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
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
        grenadier: {
          // SECOND COLOR
          '50': '#fff6e5',
          '100': '#ffebcc',
          '200': '#ffd89e',
          '300': '#ffbd66',
          '400': '#ff9429',
          '500': '#ff7300',
          '600': '#f55a00',
          '700': '#d14200',
          '800': '#9b3208',
          '900': '#7b2a0a',
          '950': '#401203',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [typography, animate],
}

export default config
