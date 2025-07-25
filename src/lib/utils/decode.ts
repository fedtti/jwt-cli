import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

export const main: any = async (token?: string, secret?: jwt.Secret, encoding?: 'utf8' | 'base64', publicKey?: jwt.PublicKey, options?: jwt.VerifyOptions & { complete?: boolean }): Promise<void> => {
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
        if (!encoding) {
          await select({
            message: 'Encoding Format',
            choices: [
              {
                name: 'UTF-8',
                value: 'utf8'
              },
              {
                name: 'Base64',
                value: 'base64'
              }
            ]
          });
        }
        secretOrPublicKey = encoding === 'base64' ? Buffer.from(secret, 'base64') as jwt.Secret : secret as jwt.Secret;
      } else {
        const publicKeyFile = await input({
          message: chalk.blue('Public Key: ')
        });
        publicKey = readFileSync(publicKeyFile, 'utf-8');
        secretOrPublicKey = publicKey as jwt.PublicKey;
      }
    } else {
      if (!!secret) {
        secretOrPublicKey = secret as jwt.Secret;
      } else if (!!publicKey) {
        secretOrPublicKey = publicKey as jwt.PublicKey;
      } else {
        console.error(chalk.red.bold('You must provide either a secret or a public key.'));
        process.exit(1);
      }
    }
    if (!!options) {
      // TODO: @fedtti - Add options handling.
    }
    console.info(chalk.green.bold(`\n\r${JSON.stringify(jwt.verify(token, secretOrPublicKey, options))}`));
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
    process.exit(1);
  }
};
