import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

export const main: any = async (token?: string, secret?: jwt.Secret, publicKey?: jwt.PublicKey, options?: jwt.VerifyOptions & { complete?: boolean }): Promise<void> => {
  try {
    if (!token) {
      token = await input({
        message: chalk.blue('JSON Web Token (JWT): ')
      });
    }
    let secretOrPublicKey: jwt.Secret | jwt.PublicKey;
    if (!secret && !publicKey) {
      const selection = await select({
        message: 'Secret or Public Key',
        choices: [
          {
            name: 'Secret',
            value: 'secret'
          },
          {
            name: 'Public Key',
            value: 'publicKey'
          }
        ]
      });
      if (selection === 'secret') {
        secret = await input({
          message: chalk.blue('Secret: ')
        });
        secretOrPublicKey = secret;
      } else {
        const publicKeyFile = await input({
          message: chalk.blue('Public Key: ')
        });
        publicKey = readFileSync(publicKeyFile, 'utf-8');
        secretOrPublicKey = publicKey;
      }
    } else {
      if (!!secret && !publicKey) {
        secretOrPublicKey = secret;
      } else if (!secret && !!publicKey) {
        secretOrPublicKey = publicKey;
      } else {
        throw new Error(''); // TODO: @fedtti - Add a proper error handling.
      }
    }
    console.info(jwt.verify(token, secretOrPublicKey, options));
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
