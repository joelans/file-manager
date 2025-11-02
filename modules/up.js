import { resolve } from 'node:path';
import { EOL } from 'os';

const up = (currentDir) => {
  const upperDir = resolve(currentDir, '..');

  if (upperDir === currentDir) {
    return {
      success: false,
      message: `You are at the root directory. Cannot go up${EOL}`,
      data: currentDir
    };
  }

  return {
    success: true,
    message: `Moved up${EOL}`,
    data: upperDir
  };
}

export { up };
