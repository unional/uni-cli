import t from 'assert';
import { cli } from './cli';
import { getVersion } from './version';

test('cli name is "uni"', () => {
  t.strictEqual(cli.name, 'uni')
})

test('cli version is current version', () => {
  const version = getVersion()
  t.strictEqual(cli.version, version)
})
