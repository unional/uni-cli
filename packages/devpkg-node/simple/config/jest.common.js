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
    ]
  ]
} : {
    'preset': 'ts-jest',
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
