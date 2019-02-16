import { PluginCli } from 'clibuilder';
import { getVersion } from './version';
import { initCommand, listCommand, searchCommand } from './commands';
import { UniConfig } from './types';

export const cli = new PluginCli<UniConfig>({
  name: 'uni',
  version: getVersion(),
  defaultConfig: { devpkgKeywords: ['uni-devpkg'] },
  commands: [initCommand, listCommand, searchCommand]
})
