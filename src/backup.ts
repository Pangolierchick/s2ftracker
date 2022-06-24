import { writeFile, readFile } from 'fs/promises';
import fs from 'fs';
import { basename, extname, dirname, join } from 'path';

export async function createBackup(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File ${filePath} doesn't exist`);
    }

    const file = await readFile(filePath, { encoding: 'utf8' });
    const fileBasename = basename(filePath, extname(filePath));
    const backupFilename = fileBasename.concat('.backup', extname(filePath));
    const backupPath = join(dirname(filePath), backupFilename);

    await writeFile(backupPath, file);
}
