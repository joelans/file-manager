import readline from 'readline';
import { EOL, homedir } from 'os';
import { getUsername } from './modules/getUsername.js';

const username = getUsername();
let currentDir = homedir();

process.stdout.write(`Welcome to the File Manager, ${username}!${EOL}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt(`You are currently in ${currentDir}${EOL}`);
rl.prompt();

rl.on('line', (command) => {
  if (command === '.exit') {
    exit();
  } else {


    rl.prompt();
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