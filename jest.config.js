module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  reporters: ['default', 'jest-html-reporters'],
  coverageReporters: ['html', 'lcov'],
  testResultsProcessor: 'jest-sonar-reporter',
};
