import { pathsToModuleNameMapper } from "ts-jest";
import tsConfig from "./tsconfig.json" with { type: "json" };

export default {
  preset: "ts-jest/presets/default-esm", // Or default if not fully ESM
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx|ts)?$": ["ts-jest", { useESM: true }],
  },
  globals: {
    "ts-jest": {
      astTransformers: {
        before: ["ts-jest-mock-import-meta"],
      },
      babelConfig: true,
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^@/(.*)\\.js$": "<rootDir>/src/$1",
    "^@config/(.*)\\.js$": "<rootDir>/src/config/$1",
    "^@controllers/(.*)\\.js$": "<rootDir>/src/controllers/$1",
    "^@databases/(.*)\\.js$": "<rootDir>/src/databases/$1",
    "^@dtos/(.*)\\.js$": "<rootDir>/src/dtos/$1",
    "^@exceptions/(.*)\\.js$": "<rootDir>/src/exceptions/$1",
    "^@interfaces/(.*)\\.js$": "<rootDir>/src/interfaces/$1",
    "^@middlewares/(.*)\\.js$": "<rootDir>/src/middlewares/$1",
    "^@models/(.*)\\.js$": "<rootDir>/src/models/$1",
    "^@routes/(.*)\\.js$": "<rootDir>/src/routes/$1",
    "^@services/(.*)\\.js$": "<rootDir>/src/services/$1",
    "^@utils/(.*)\\.js$": "<rootDir>/src/utils/$1",
    "^@types/(.*)\\.js$": "<rootDir>/src/types/$1",
  },
  maxConcurrency: 4,
};
