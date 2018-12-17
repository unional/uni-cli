import cp from 'child_process'

export function getConfig(key: string) {
  return cp.execSync(`git config ${key}`).toString()
}
