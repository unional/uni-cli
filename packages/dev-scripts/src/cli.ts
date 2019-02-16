import { Cli } from 'clibuilder';
import { CliConfig } from './interfaces';
import { pkg } from './pkg';

export const cli = new Cli<CliConfig>({ name: 'uni-dev-scripts', version: pkg.version, commands: [] })
