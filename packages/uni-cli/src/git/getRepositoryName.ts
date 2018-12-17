export function getRepositoryName(remote: string | undefined) {
  if (remote) {
    const match = /https?:\/\/github.com\/(.*)\.git/.exec(remote)
    if (match) return match[1]
  }
  return undefined
}
