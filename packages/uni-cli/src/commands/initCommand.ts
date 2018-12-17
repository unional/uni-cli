/* istanbul ignore file */
import { CliCommand } from 'clibuilder';
import { copyArtifacts } from '../devpkg-io';
import { getRemote, getRepositoryName, isGitRepo } from '../git';
import { getConfig } from '../git/getConfig';
import { initializeFolder } from '../io';
import { installDev } from '../npm';
import inquirer = require('inquirer');

export const initCommand = {
  name: 'init',
  description: 'setup an existing repository',
  options: {
    string: {
      name: {
        description: 'The NPM package name'
      },
      repo: {
        description: 'The github repository name including organization (e.g. user/repo)'
      }
    }
  },
  copyArtifacts,
  initializeFolder,
  installDev,
  async run(args) {
    const inputs = await this.getInputs(args)

    this.ui.info('Initializing folder...')
    await this.initializeFolder(inputs)

    this.ui.info('Installing @unional/devpkg-node')
    await this.installDev('@unional/devpkg-node', 'assertron')

    this.ui.info('Copying files...')
    await this.copyArtifacts('@unional/devpkg-node', 'simple')

    this.ui.info(`Ready!`)
    this.ui.info(``)
    this.ui.info(`Remember to update your package description in package.json and README.md`)
  },
  async getInputs(args: { name?: string, repo?: string }) {
    const inputs: any = { year: new Date().getFullYear() }
    const questions: inquirer.Question<inquirer.Answers>[] = []
    if (args.name) {
      inputs.name = args.name
    }
    else {
      questions.push({
        name: 'name',
        message: 'The NPM package name'
      })
    }
    if (args.repo) {
      inputs.repo = args.repo
    }
    else {
      inputs.isGitRepo = isGitRepo()
      const repo = inputs.repository = getRepositoryName(getRemote())
      if (!repo) {
        inputs.noRemote = true
        questions.push({
          name: 'repository',
          message: 'The github repository name including organization (e.g. user/repo)'
        })
      }
    }

    const gitUsername = inputs.gitUsername = getConfig('user.name')
    if (!gitUsername) {
      questions.push({
        name: 'gitUsername',
        message: 'Your git username'
      })
    }
    const gitEmail = inputs.gitEmail = getConfig('user.email')
    if (!gitEmail) {
      questions.push({
        name: 'gitEmail',
        message: 'Your git email'
      })
    }
    if (questions.length === 0) return inputs
    const answers = await this.ui!.prompt(questions)
    return { ...inputs, ...answers }
  }
} as CliCommand<undefined, {
  needAddRemote: boolean,
  copyArtifacts: typeof copyArtifacts,
  getInputs(args: any): Promise<object>,
  initializeFolder: typeof initializeFolder,
  installDev: typeof installDev
}>
