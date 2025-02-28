export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    // "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|gif|ttf|eot|svg|png)$": "identity-obj-proxy",
    // "^@components/(.*)$": "<rootDir>/src/components/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
