module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: [
        'tsconfig.json'
    ],
    sourceType: 'module',
  },
  plugins: [
    'react',
    'mui-unused-classes'
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
