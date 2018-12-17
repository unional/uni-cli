import { getRemote } from './getRemote';
import t from 'assert'
import { dirSync } from 'tmp'
import cp from 'child_process'

test('Return the remote url', () => {
  const tmpdir = dirSync()
  const cwd = process.cwd()
  try {
    process.chdir(tmpdir.name)
    cp.execSync('git init')
    cp.execSync('git remote add origin https://github.com/unional/global-store.git')
    const actual = getRemote()
    t.strictEqual(actual, 'https://github.com/unional/global-store.git')
  }
  finally {
    process.chdir(cwd)
  }
})

test('return undefined if not a git repo', () => {
  const tmpdir = dirSync()
  const cwd = process.cwd()
  try {
    process.chdir(tmpdir.name)
    const actual = getRemote()
    t.strictEqual(actual, undefined)
  }
  finally {
    process.chdir(cwd)
  }
})


test('return undefined if no remote', () => {
  const tmpdir = dirSync()
  const cwd = process.cwd()
  try {
    process.chdir(tmpdir.name)
    cp.execSync('git init')
    const actual = getRemote()
    t.strictEqual(actual, undefined)
  }
  finally {
    process.chdir(cwd)
  }
})
