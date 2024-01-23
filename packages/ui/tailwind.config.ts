// tailwind config is required for editor support
import sharedConfig from 'config/tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...sharedConfig,
  prefix: 'md-',
}

export default config
