module.exports = {
  roots: ["<rootDir>/src/", "<rootDir>/test/"],
  testMatch: ["<rootDir>/test/**/*.js", "<rootDir>/test/**/*.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": ["es-jest"],
  },
  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["ts", "js", "json", "node"],
};
