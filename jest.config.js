module.exports = {
  projects: [
    '<rootDir>/apps/chrome-ext/jest.config.js',
    '<rootDir>/apps/cli/jest.config.js',
    '<rootDir>/apps/web/jest.config.js',
    '<rootDir>/apps/sseramemes/jest.config.js',
  ],
  transformIgnorePatterns: ['node_modules/(?!use-debounce|uuid)'],
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
