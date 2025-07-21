#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { select } from '@inquirer/prompts';
import { main as encoder } from './lib/utils/encode.js';
import { main as decoder } from './lib/utils/decode.js';

const init: any = (): void => {
  console.info(
    chalk.green(
      figlet.textSync('jwt-cli', {
        font: 'Ghost'
      })
    )
  );
};

const run: any = (): void => {
  console.clear();
  if (!!process.argv.slice(2).length) {
    yargs(hideBin(process.argv))
      .usage('Usage: jwt-cli <command> [options]')

      .version('jwt-cli 1.0.0')
      .help()
      .alias('h', 'help')
      .argv;
    process.exit(0);
  }
  init();
  try {
    setTimeout(async (): Promise<void> => {
      console.clear();
      const answer: string = await select({
        message: 'JSON Web Token (JWT) Debugger',
        choices: [
          {
            name: 'JWT Encoder',
            value: 'encode'
          },
          {
            name: 'JWT Decoder',
            value: 'decode'
          }
        ]
      });
      if (answer === 'encode') {
        encoder();
      } else {
        decoder();
      }
    }, 1000);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
run();
