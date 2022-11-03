import * as url from 'url';
import * as path from 'path';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const __root = () => {
  const dir = __dirname;
  const splitPath = dir.split(path.sep);
  const exceptLast = splitPath.slice(0, splitPath.length - 2);
  return path.join('/', ...exceptLast);
};
