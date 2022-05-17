#!/usr/bin/env node 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import alias from "module-alias";
// alias(path.resolve(__dirname, "../../"));
var commander_1 = require("commander");
var webpack_1 = require("../build/webpack");
var program = new commander_1.Command(require('../../package').commandName);
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
    .action(function (value) {
    // buildRollup()
    webpack_1.buildWebpack();
});
// const init = () => {
//     // const extraPacks = initExtraPack()
//     // initCommand([...internallyCommand, ...extraPacks])
// }
// init()
program.parse(process.argv);
