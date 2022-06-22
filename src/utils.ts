import { readFile, writeFile } from 'fs/promises';
import { existsSync, write } from 'fs';
import { S2FPlayers, S2FPlayersRecord, S2FProduct, S2FProductRecord } from './types';

export async function safeReadJson<T>(path: string): Promise<T[]> {
    const json = existsSync(path) ? JSON.parse(await readFile(path, { encoding: 'utf8' })) : [];

    return json as T[];
}

export async function safeReadJsonProduct(path: string): Promise<S2FProductRecord[]> {
    return await safeReadJson<S2FProductRecord>(path);
}

export async function safeReadJsonPlayers(path: string): Promise<S2FPlayersRecord[]> {
    return await safeReadJson<S2FPlayersRecord>(path);
}

export function addTimestamp<T>(object: any): T {
    return {
        t: Date.now(),
        r: object
    } as unknown as T;
}
