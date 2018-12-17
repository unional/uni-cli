import path from 'path';
import { PackageNotFound } from './errors';

export function tryResolve(packageName: string) {
  try {
    const indexPath = require.resolve(packageName)
    return path.dirname(indexPath)
  }
  catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new PackageNotFound(packageName)
    }
    // istanbul ignore next
    throw e
  }
}
