import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import jwt from 'jsonwebtoken';

export const main: any = async (): Promise<void> => {
  try {

  } catch (error) {
    console.error(chalk.red.bold(`\n\r${error}`));
    process.exit(1);
  }
};
