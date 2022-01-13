module.exports = {
  "testEnvironment": "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/src/pages$1",
  },
}