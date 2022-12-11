const nextJest = require('next/jest');
const pkg = require('./package.json');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  // dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  displayName: pkg.name,
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['node_modules/(?!use-debounce|uuid)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
