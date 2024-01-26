import sharedConfig from 'config/tailwind/tailwind.config.ts'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
}

export default config
