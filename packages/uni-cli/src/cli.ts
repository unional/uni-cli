import { Cli } from 'clibuilder';
import { getVersion } from './version';
import { initCommand } from './commands';

export const cli = new Cli({ name: 'uni', version: getVersion(), commands: [initCommand] })
