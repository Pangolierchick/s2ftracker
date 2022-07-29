import { writeFile, readFile } from 'fs/promises';
import fs from 'fs';
import { basename, extname, dirname, join } from 'path';
import AdmZip from 'adm-zip';

export function getBackupFileName(filePath: string): string {
  const fileBasename = basename(filePath, extname(filePath));
  const backupFilename = fileBasename.concat('.backup', extname(filePath));
  return join(dirname(filePath), backupFilename);
}

export async function createBackup(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} doesn't exist`);
  }
  const file = await readFile(filePath, { encoding: 'utf8' });

  const backupPath = getBackupFileName(filePath);

  await writeFile(backupPath, file);
}

function createZipIfNotExist(zipPath: string): AdmZip {
  if (!fs.existsSync(zipPath)) {
    return new AdmZip();
  }

  return new AdmZip(zipPath);
}

export function addFilesZip(zipPath: string, ...files: string[]) {
  const zip = createZipIfNotExist(zipPath);

  for (const file of files) {
    if (fs.existsSync(file)) {
      const text = fs.readFileSync(file);
      zip.addFile(file, text);
    }
  }

  zip.writeZip(zipPath);
}

export function readFilesZip(zipPath: string, ...files: string[]): string[] {
  const zip = new AdmZip(zipPath);

  const readFiles: string[] = []

  for (const file of files) {
    readFiles.push(zip.readAsText(file, 'utf8'));
  }

  return readFiles;
}
