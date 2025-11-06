import { resolve, isAbsolute } from 'node:path';
import { EOL } from 'node:os';
import { access } from 'node:fs/promises';

const cd = async (command, currentDir) => {
  if (command === 'cd') {
    process.stdout.write(`Missing mandatory directory path${EOL}`);
    return currentDir;
  } else if (command[2] !== ' ') {
    process.stdout.write(`Invalid command${EOL}`);
    return currentDir;
  }
  const targetPath = command.slice(3);

  try {
    const path = isAbsolute(targetPath) ? resolve(targetPath) : resolve(currentDir, targetPath);

    await access(path);

    if (resolve(currentDir) === path ) {
      const message = targetPath === '..' ? `Already at the root directory. Cannot go up${EOL}` : `Already in '${currentDir}' directory${EOL}`;
      process.stdout.write(message);
      return currentDir;
    }

    process.stdout.write(`Directory is changed${EOL}`);
    return path;

  } catch (error) {
    if (error.code === 'ENOENT') {
      process.stdout.write(`Path does not exist${EOL}`);
    } else {
      process.stdout.write(`Cannot change directory: ${error.message}${EOL}`);
    }
    return currentDir;
  }
};

export { cd };