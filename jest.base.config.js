module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setupJest.ts'],
  reporters: ['default', 'jest-html-reporters'],
  coverageReporters: ['text', 'html', 'icov'],
};
