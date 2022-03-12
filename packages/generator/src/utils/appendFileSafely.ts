import fs from 'fs';
import path from 'path';
import { formatFile } from './formatFile';

export const appendFileSafely = async (writeLocation: string, content: any) => {
  fs.mkdirSync(path.dirname(writeLocation), {
    recursive: true,
  });

  fs.appendFileSync(writeLocation, await formatFile(content));
};
