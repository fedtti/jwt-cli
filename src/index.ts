#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { select } from '@inquirer/prompts';
import jwt from 'jsonwebtoken';
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
      .command(
        'encode [token] [secret] [publicKey] [options]',
        'JWT Encoder',
        (yargs) => {

        },
        async (argv) => {

          await encoder(
            argv.token,
            argv.secret || argv.publicKey,
            argv.options
          );
        }
      )
      .command(
        'decode [token] [secret] [encoding] [publicKey] [options]',
        'JWT Decoder',
        (yargs) => {
          yargs
            .positional('token', {
              describe: 'JSON Web Token (JWT) to decode',
              type: 'string'
            })
        },
        async (argv) => {
          if (!argv.token) {
            console.error(chalk.red.bold('You must provide a token to decode.'));
            process.exit(1);
          }
          let secretsOrPublicKey: jwt.Secret | jwt.PublicKey;
          if (!!argv.secret || !!argv.publicKey) {
            secretsOrPublicKey = !!argv.secret ? argv.secret as jwt.Secret : argv.publicKey as jwt.PublicKey;
          } else {
            console.error(chalk.red.bold('You must provide either a secret or a public key.'));
            process.exit(1);
          }
          await decoder(
            argv.token as string,
            secretsOrPublicKey,
            argv.encoding as string || undefined,
            argv.options as jwt.VerifyOptions || undefined
          );
          process.exit(0);
        }
      )
      .version('jwt-cli 1.0.0')
      .help()
      .alias('h', 'help')
      .alias('v', 'verbose')
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
        await encoder();
        process.exit(0);
      } else {
        await decoder();
        process.exit(0);
      }
    }, 1000);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
    process.exit(1);
  }
};
run();
