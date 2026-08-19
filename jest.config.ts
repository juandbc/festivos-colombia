/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	// testMatch: ["**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	transform: {
		"\\.[jt]sx?$": ["ts-jest", { useESM: true }],
	},
	moduleNameMapper: {
		"(.+)\\.js": "$1",
	},
  extensionsToTreatAsEsm: [".ts"],
  coverageProvider: "babel",
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.ts",
      "!src/**/*.d.ts",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "coverage"
};
export default config;
