
import { ncp } from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { FolderNotFoundInPackage } from './errors';
import { tryResolve } from './tryResolve';


export function copyArtifacts(packageName: string, name: string, cwd = process.cwd()) {
  return copyFile(packageName, path.join(name, 'artifacts'), cwd)
}

const ncpp = promisify(ncp)
export async function copyFile(packageName: string, folder: string, destination: string) {
  const basePath = tryResolve(packageName)
  try {
    return await ncpp(path.resolve(basePath, folder), destination)
  }
  catch (errors) {
    // ncpp throws an error array...
    const e = errors[0]
    if (e.code === 'ENOENT') {
      throw new FolderNotFoundInPackage(packageName, folder)
    }
    // istanbul ignore next
    throw errors
  }
}
