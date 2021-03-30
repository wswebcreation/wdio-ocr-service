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
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["node_modules/"],
};
