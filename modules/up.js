import { resolve } from 'node:path';
import { EOL } from 'node:os';

const up = (command, currentDir) => {
  if (command !== 'up') {
    process.stdout.write(`No attributes are needed for the 'up' command${EOL}`);
    return currentDir;
  }

  const upperDir = resolve(currentDir, '..');

  if (upperDir === currentDir) {
    process.stdout.write(`You are at the root directory. Cannot go up${EOL}`);
    return currentDir;
  }

  process.stdout.write(`Moved up${EOL}`);
  return upperDir;
}

export { up };
