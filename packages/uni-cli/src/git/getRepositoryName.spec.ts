import t from 'assert';
import { getRepositoryName } from './getRepositoryName';

test('repository name is org/name', () => {
  const actual = getRepositoryName('https://github.com/unional/dev.git')
  t.strictEqual(actual, 'unional/dev')
})

test('undefined remote gets undefined repo name', () => {
  t.strictEqual(getRepositoryName(undefined), undefined)
})
