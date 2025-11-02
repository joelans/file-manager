import readline from 'readline';
import { EOL } from 'os';
import { getUsername } from './modules/getUsername.js';

const username = getUsername();

process.stdout.write(`Welcome to the File Manager, ${username}!${EOL}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (command) => {
  if (command === '.exit') {
    exit();
  }
});

rl.on('SIGINT', () => {
  exit();
});

const exit = () => {
  process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!${EOL}`);
  rl.close();
  process.exit(0);
};