// jest.config.js
export default {
  preset: "ts-jest/presets/js-with-ts", // 使用 ts-jest 的预设
  testEnvironment: "node",
  transform: { "^.+\\.(t|j)sx?$": ["@swc/jest", {}] },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(some-esm-package|another-esm-package)/)",
  ],
};
