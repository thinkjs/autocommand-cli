import * as program from 'commander';

import Watch from './watch';
import configUtil from './configUtil';

let pkg:any = require('../package.json');

export default function (args:string[]):void {
  let watch: Watch = new Watch();
    program.version(pkg.version);

    program.command('watch', '')
    .description('watch file change run command')
    .option('-c, --config [config]', 'config file')
    .option('-t, --test [testFile]', 'test mode')
    .action(watch.run.bind(watch));

    program.command('config', '')
    .description('create and test config file')
    .option('-i, --init [config]', 'create config file')
    .option('-t, --test [config]', 'test config file')
    .action(configUtil.action.bind(configUtil));

    program.command('run', '')
    .description('run command by config')
    .option('-f, --file <file>', 'run command by file')
    .option('-o, --stdout', 'run command by stdout file')
    .action(watch.compile.bind(watch));

    program.parse(args);

    if(!process.argv.slice(2).length) {
      program.help();
    }
}
