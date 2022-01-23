module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', 'stories.tsx'],
  transform: {
    '\\.tsx?$': 'ts-jest'
  }
};
