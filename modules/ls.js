import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { EOL } from 'node:os';

const ls = async (command, currentDir) => {
  if (command !== 'ls') {
    process.stdout.write(`No attributes are needed for the 'ls' command${EOL}`);
    return;
  }

  try {
    const contents = await readdir(currentDir);
    let contentsInfo = [];
    
    for (const content of contents) {
      const contentPath = join(currentDir, content);
      const contentInfo = await stat(contentPath);

      contentsInfo.push({
        name: content,
        type: contentInfo.isDirectory() ? 'directory' : 'file'
      });
    }
    
    const files = [];
    const directories = [];
    for (const contentInfo of contentsInfo) {
      if (contentInfo.type === 'file') {
        files.push(contentInfo);
      } else {
        directories.push(contentInfo);
      }
    }

    files.sort((a, b) => a.name.localeCompare(b.name));

    directories.sort((a, b) => a.name.localeCompare(b.name));

    contentsInfo = [...directories, ...files];
    
    console.table(contentsInfo);

  } catch (error) {
    process.stdout.write(`Cannot read directory: ${currentDir}${EOL}`);
  }
};

export { ls };