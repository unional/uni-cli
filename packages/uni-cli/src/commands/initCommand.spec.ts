import t from 'assert';
import { setupCliCommandTest } from 'clibuilder';
import { initCommand } from './initCommand';

test('install @unional/dev as dev dependency', async () => {
  const { cmd, args, argv } = setupCliCommandTest(initCommand, [])

  cmd.getInputs = () => Promise.resolve({})
  cmd.copyArtifacts = () => Promise.resolve()
  cmd.initializeFolder = () => Promise.resolve()
  let actualPackages: string[]
  cmd.installDev = (...packages: string[]) => {
    actualPackages = packages
    return Promise.resolve()
  }

  await cmd.run(args, argv)
  t.deepStrictEqual(actualPackages!, ['@unional/devpkg-node'])
})
