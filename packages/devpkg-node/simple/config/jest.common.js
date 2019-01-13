const isCI = require('is-ci')
module.exports = isCI ? {
  'preset': 'ts-jest',
  'roots': [
    '<rootDir>/src'
  ],
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'output': '.reports/junit/js-test-results.xml'
      }
    ],
  ],
  'testEnvironment': 'node',
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).ts?(x)']
} : {
    'preset': 'ts-jest',
    'globals': {
      'ts-jest': {
        'diagnostics': false
      }
    },
    'collectCoverageFrom': [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/bin.ts'
    ],
    'reporters': [
      'default',
      'jest-progress-tracker',
      ['jest-audio-reporter', { volume: 0.3 }],
    ],
    'roots': [
      '<rootDir>/src'
    ],
    'testEnvironment': 'node',
    'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).ts?(x)'],
    'watchPlugins': [
      'jest-watch-suspend',
      'jest-watch-repeat',
      [
        'jest-watch-toggle-config', { 'setting': 'verbose' }
      ],
      [
        'jest-watch-toggle-config', { 'setting': 'collectCoverage' }
      ]
    ]
  }
