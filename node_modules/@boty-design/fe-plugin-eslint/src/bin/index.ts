#!/usr/bin/env node

/*
 * @Author: Cookie
 * @Date: 2021-07-03 22:28:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-29 17:25:32
 * @Description:
 */

import path from "path";
import alias from "module-alias";
alias(path.resolve(__dirname, "../../"));

import { Command } from 'commander';

const program = new Command();

import { execEslint, } from '../index'

/**
 * @description: eslint 检测
 * @param {*}
 * @return {*}
 */
program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    execEslint()
  })

program.parse(process.argv);