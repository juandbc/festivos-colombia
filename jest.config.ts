/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	transform: {
		"\\.[jt]sx?$": ["ts-jest", { useESM: true }],
	},
	moduleNameMapper: {
		"(.+)\\.js": "$1",
	},
	extensionsToTreatAsEsm: [".ts"],
};
export default config;
