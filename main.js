import readline from 'node:readline';
import { EOL, homedir } from 'node:os';
import { getUsername } from './modules/getUsername.js';
import { up } from './modules/up.js';
import { cd } from './modules/cd.js';
import { ls } from './modules/ls.js';

const username = getUsername();
let currentDir = homedir();

process.stdout.write(`Welcome to the File Manager, ${username}!${EOL}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = () => {
  rl.setPrompt(`You are currently in ${currentDir}${EOL}${EOL}`);
  rl.prompt();
};

prompt();

rl.on('line', async (command) => {
  process.stdout.write(EOL);
  command = command.trim();
  if (command === '.exit') {
    exit();
  } if (command.startsWith('up')) {
    currentDir = up(command, currentDir);
  } else if (command.startsWith('cd')) {
    const targetPath = command.slice(3);

    if (targetPath === '') {
      process.stdout.write(`Missing mandatory directory path.${EOL}`);
    } else if (command[2] !== ' ') {
      process.stdout.write(`Invalid command${EOL}`);
    } else {
      const result = await cd(currentDir, targetPath);
      
      if (result.success) {
        currentDir = result.data;
        process.stdout.write(result.message);
      } else {
        process.stdout.write(result.message);
      }
    }
  } else if (command.startsWith('ls')) {
    await ls(command, currentDir);
  } else {
    process.stdout.write(`Invalid command${EOL}`);
  }
  prompt();
});

rl.on('SIGINT', () => {
  exit();
});

const exit = () => {
  process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!${EOL}`);
  rl.close();
  process.exit(0);
};