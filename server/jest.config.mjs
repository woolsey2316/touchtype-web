import { pathsToModuleNameMapper } from "ts-jest";
import tsConfig from "./tsconfig.json" with { type: "json" };

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  maxConcurrency: 4,
};
