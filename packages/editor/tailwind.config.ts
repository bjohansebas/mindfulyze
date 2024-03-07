import sharedConfig from '@mindfulyze/config/tailwind/tailwind.config.ts'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
}

export default config
