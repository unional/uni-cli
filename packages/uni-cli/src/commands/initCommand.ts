/* istanbul ignore file */
import { CliCommand } from 'clibuilder';
import { copyArtifacts } from '../devpkg-io';
import { getRemote, getRepositoryName } from '../git';
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
    await this.installDev('@unional/devpkg-node')

    this.ui.info('Copying files...')
    await this.copyArtifacts('@unional/devpkg-node', 'simple')

    this.ui.info('Ready!')
  },
  async getInputs(args: any) {
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
      const repo = inputs.repo = getRepositoryName(getRemote())
      if (!repo) {
        questions.push({
          name: 'repo',
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
    const gitEmail = inputs.gitemail = getConfig('user.email')
    if (!gitEmail) {
      questions.push({
        name: 'gitEmail',
        message: 'Your git email'
      })
    }
    if (questions.length === 0) return inputs

    return { ...inputs, ...this.ui!.prompt(questions) }
  },
  async getRepositoryName(name: string | undefined) {
    if (name) return name

    const repoName = getRepositoryName(getRemote())
    if (repoName) return repoName
    const answers = await this.ui!.prompt([{
      name: 'repositoryName',
      message: 'Please enterthe github repository name including organization (e.g. user/repo)'
    }])
    return answers['repositoryName']
  }
} as CliCommand<undefined, {
  copyArtifacts: typeof copyArtifacts,
  getInputs(args: any): Promise<object>,
  initializeFolder: typeof initializeFolder,
  installDev: typeof installDev
}>
