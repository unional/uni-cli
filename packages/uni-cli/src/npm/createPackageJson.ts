import fs from 'fs'
import path from 'path'

export function createPackageJson(pjson: object) {
  fs.writeFileSync(path.resolve('package.json'), JSON.stringify(pjson))
}
