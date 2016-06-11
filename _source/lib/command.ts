/// <reference path="../../typings/index.d.ts" />

let program:commander.IExportedCommand = require('commander');
let pkg:any = require('../package.json');

import watchAction from './watch';
import configUtil from './configUtil';

export default function (args:string[]):void {
    program.version(pkg.version);

    program.command('watch', '')
    .description('watch file change run command')
    .option('-c, --config [config]', 'config file')
    .option('-t, --test [testFile]', 'test mode')
    .action(watchAction.run.bind(watchAction));

    program.command('config', '')
    .description('create and test config file')
    .option('-i, --init [config]', 'create config file')
    .option('-t, --test [config]', 'test config file')
    .action(configUtil.action.bind(configUtil));

    program.command('run', '')
    .description('run command by config')
    .action(watchAction.compile.bind(watchAction));

    program.parse(args);

    if(!process.argv.slice(2).length) {
      program.help();
    }
}
