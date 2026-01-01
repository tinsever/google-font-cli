module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/windows/**/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 10000,
  maxWorkers: 1,
  // Allow Jest to transform ESM packages from node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(pascal-case|no-case|lower-case|upper-case)/)'
  ]
};
