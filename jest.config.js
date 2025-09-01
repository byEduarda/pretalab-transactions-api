const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testMatch: ["**/tests/**/*.spec.ts", "**/tests/**/*.test.ts"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testTimeout: 60000,
  transform: {
    ...tsJestTransformCfg,
  },
};
