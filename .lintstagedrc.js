const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  '**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*': [
    'biome check --no-errors-on-unmatched --files-ignore-unknown=true', // Check formatting and lint
  ],
}
