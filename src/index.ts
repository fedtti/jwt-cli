#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { select } from '@inquirer/prompts';

/**
 * Prints the package name in the console.
 */
const init: any = (): void => {
  console.info(
    chalk.green(
      figlet.textSync('jwt-cli', {
        font: 'Ghost'
      })
    )
  );
};

/**
 * 
 */
const run: any = (): void => {
  console.clear();
  init();

  try {
    setTimeout(async (): Promise<void> => {
      console.clear();
      const answer = await select({
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

      } else {

      }
    }, 1000);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
