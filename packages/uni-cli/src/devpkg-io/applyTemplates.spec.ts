import t from 'assert';
import a from 'assertron';
import fs from 'fs';
import path from 'path';
import { dirSync } from 'tmp';
import { applyTemplates, FolderNotFoundInPackage, PackageNotFound } from '.';

test('not exist package throws PackageNotFound', async () => {
  const err = await a.throws(() => applyTemplates('not-exist-package', 'something'), PackageNotFound)

  t.strictEqual(err.packageName, 'not-exist-package')
})

test('not exist directory throws FolderNotFoundInPackage', async () => {
  const err = await a.throws(() => applyTemplates('@unional/devpkg-node', 'not-exist'), FolderNotFoundInPackage)

  t.strictEqual(err.packageName, '@unional/devpkg-node')
  t.strictEqual(err.folder, 'not-exist/templates')
})

test('support README.md', async () => {
  const tmp = dirSync()
  await applyTemplates('@unional/devpkg-node', 'simple', tmp.name)
  const actual = fs.readFileSync(path.resolve(tmp.name, 'README.md'), 'utf-8')
  console.log(actual)
})

