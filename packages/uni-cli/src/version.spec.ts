import t from 'assert'
import { getVersion } from './version';

test('get version from package.json', () => {
  const actual = getVersion()

  // in real code, it will get from the published package.json thus getting the real version number.
  t.strictEqual(actual, '0.0.0-development')
})
