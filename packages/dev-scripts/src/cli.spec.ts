import { cli } from './cli';

test('version matches package verion', () => {
  const pkg = require('../package.json')
  expect(cli.version).toBe(pkg.version)
})
