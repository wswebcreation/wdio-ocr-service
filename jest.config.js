module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testMatch: ["**/src/__tests__/**/*.test.(js|ts)"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
  collectCoverageFrom: [
    "./src/**/*.(js|ts)",
    "!**/*.d.ts",
  ],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["node_modules/"],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupJest.ts']
};
