const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*': [
    'biome check --no-errors-on-unmatched --files-ignore-unknown=true', // Check formatting and lint
  ],
}
