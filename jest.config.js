module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testMatch: ["**/tests/**/*.test.(js|ts)"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/tests/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "packages/**/src/**/*.(js|ts)",
    "!packages/**/src/**/*.d.ts",
  ],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["node_modules/"],
};
