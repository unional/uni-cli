import t from 'assert';
import { cli } from './cli';

test('cli name is "uni"', () => {
  t.strictEqual(cli.name, 'uni')
})

test('cli version is current version', () => {
  t.strictEqual(cli.version, '0.0.0-development')
})
