import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import * as jwt from 'jsonwebtoken';

let options: jwt.VerifyOptions;

/**
 * 
 */
export const main: any = async (token?: string, secret?: jwt.Secret | jwt.PublicKey): Promise<null | jwt.Jwt | jwt.JwtPayload | string> => {
  try {
    if (!token) {
      token = await input({
        message: chalk.blue('JSON Web Token (JWT): ')
      });
    }
    if (!secret) {
      //
    }

    return jwt.verify(token, secret);
  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
