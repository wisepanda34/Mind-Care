// jest.config.ts

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1",
  },
  globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.json',
        },
      },
};

module.exports = config;
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '^~/(.*)$': '<rootDir>/src/$1',
//   },
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.json',
//     },
//   },
// };

