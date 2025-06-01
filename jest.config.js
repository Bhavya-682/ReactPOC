// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // allow transforming axios
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
