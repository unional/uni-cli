import a from 'assertron';
import { setupCliCommandTest } from 'clibuilder';
import { initCommand } from './initCommand';
import { some } from 'satisfier';

describe('assert installed dependencies', () => {
  const { cmd, args, argv } = setupCliCommandTest(initCommand, [])

  cmd.getInputs = () => Promise.resolve({})
  cmd.copyArtifacts = () => Promise.resolve()
  cmd.initializeFolder = () => Promise.resolve()
  let actualPackages: string[]
  cmd.installDev = (...packages: string[]) => {
    actualPackages = packages
    return Promise.resolve()
  }

  beforeAll(async () => {
    await cmd.run(args, argv)
  })

  test('install @unional/dev as dev dependency', async () => {
    a.satisfy(actualPackages, some('@unional/devpkg-node'))
  })
  test('install assertron as dev dependency directly so that it can be importable by TS', async () => {
    a.satisfy(actualPackages, some('assertron'))
  })
})
