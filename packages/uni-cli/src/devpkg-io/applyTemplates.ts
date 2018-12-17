import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { FolderNotFoundInPackage, TemplateHandlerNotFound } from './errors';
import { tryResolve } from './tryResolve';
import { getName } from './variables';

const variableHandler: { [k in string]: () => string } = {
  'name': getName,
  'repository': () => 'actual repo'
}

function createVariableLoader() {
  const variables: { [k in string]: string } = {}
  return {
    get(name: string) {
      if (variables[name]) return variables[name]

      return variables[name] = variableHandler[name]()
    }
  }
}


const templateHandlers: { [k in string]: (loader: ReturnType<typeof createVariableLoader>, content: string) => { path: string, content: string } } = {
  'README.md': (loader, content) => {
    const name = loader.get('name')
    const repository = loader.get('repository')

    return { path: 'README.md', content: applyVariables(content, { name, repository }) }
  },
  'LICENSE': (loader, content) => { return { path: 'LICENSE', content: '' } },
  'package.json': (loader, content) => { return { path: 'package.json', content: '' } }
}

const writeFilep = promisify(fs.writeFile)

export function applyTemplates(packageName: string, name: string, cwd = process.cwd()) {
  const templateFiles = tryReadFiles(packageName, path.join(name, 'templates'))
  return Promise.all(templateFiles.map(file => {
    return writeFilep(path.resolve(cwd, file.path), file.content)
  })).then(() => { return })
}

function tryReadFiles(packageName: string, folderName: string) {
  const basePath = tryResolve(packageName)
  try {
    return readFiles(path.resolve(basePath, folderName))
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      throw new FolderNotFoundInPackage(packageName, folderName)
    }
    throw e
  }
}

function readFiles(folderName: string) {
  const filenames = fs.readdirSync(folderName)
  const variableLoader = createVariableLoader()
  return filenames.map(filename => {
    const handler = templateHandlers[filename]
    if (!handler) throw new TemplateHandlerNotFound(filename)
    const content = fs.readFileSync(path.resolve(folderName, filename), 'utf-8')
    return handler(variableLoader, content)
  })
}

function applyVariables(content: string, variables: { [k in string]: string }) {
  return Object.keys(variables).reduce((p, name) => {
    const value = variables[name]
    return p.replace(new RegExp(`\\[${name}\\]`, 'g'), value)
  }, content)
}
