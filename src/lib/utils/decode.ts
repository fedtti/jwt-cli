import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import * as jwt from 'jsonwebtoken';

let options: jwt.VerifyOptions;

/**
 * 
 */
export const main: any = async (): Promise<void> => {
  try {
    const token = await input({
      message: chalk.blue('JSON Web Token (JWT): ')
    });

  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
  }
};
