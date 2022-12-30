const customJestConfig = {
  preset: '@shelf/jest-mongodb',
  moduleFileExtensions: ['js', 'ts'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(setupFiles.js|ts)?$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/setupFiles.js'],
  watchPathIgnorePatterns: ['globalConfig'],
};

module.exports = customJestConfig;
