import t from 'assert';
import { setupCliCommandTest } from 'clibuilder';
import { initCommand } from './initCommand';

test('install @unional/dev as dev dependency', () => {
  const { cmd, args, argv } = setupCliCommandTest(initCommand, [])

  let actualPackages: string[]
  cmd.copyArtifacts = () => Promise.resolve()
  cmd.applyTemplates = () => Promise.resolve()
  cmd.initializeFolder = () => Promise.resolve()
  cmd.installDev = (...packages: string[]) => {
    actualPackages = packages
    return Promise.resolve()
  }

  cmd.run(args, argv)
  t.deepStrictEqual(actualPackages!, ['@unional/devpkg-node'])
})
