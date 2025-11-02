import { resolve, isAbsolute } from 'node:path';
import { EOL } from 'os';
import { access } from 'node:fs/promises';

const cd = async (currentDir, targetPath) => {
  try {
    const path = isAbsolute(targetPath) ? resolve(targetPath) : resolve(currentDir, targetPath);

    await access(path);

    return {
      success: true,
      message: `Directory is changed${EOL}`,
      data: path
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        success: false,
        message: `Path does not exist${EOL}`,
        data: currentDir
      };
    } else {
      return {
        success: false,
        message: `Cannot change directory: ${error.message}${EOL}`,
        data: currentDir
      };
    }
  }
};

export { cd };