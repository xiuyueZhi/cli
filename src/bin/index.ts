#!/usr/bin/env node 
import path from "path";
// import alias from "module-alias";
// alias(path.resolve(__dirname, "../../"));
import { Command } from 'commander';
// import internallyCommand from './internally'
// import { initExtraPack } from './extra'
import { getEslint } from '../eslint'
import { buildWebpack } from '../build/webpack'
import { buildRollup } from '../build/rollup'


const program = new Command(require('../../package').commandName);

export interface ICommand {
    version: string
    description: string
    command: string
    action: (value?: any) => void
}



// program
//   .version('0.1.0')
//   .description('start eslint and fix code')
//   .command('eslint')
//   .action((value) => {
//     getEslint()
//   })

program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('webpack')
  .action((value) => {
    // buildRollup()
    getEslint()
    buildWebpack()
  })

// const init = () => {
//     // const extraPacks = initExtraPack()
//     // initCommand([...internallyCommand, ...extraPacks])
// }

// init()

program.parse(process.argv);