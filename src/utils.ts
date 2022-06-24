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


export function validateS2FProduct(object: S2FProduct): boolean {
    if (typeof object.c !== 'undefined') {
        if (typeof object.c === 'string') {
            object.c = parseInt(object.c);

            if (isNaN(object.c)) {
                return false;
            }
        }
    } else {
        return false;
    }

    if (typeof object.id !== 'undefined') {
        if (typeof object.id === 'string') {
            object.id = parseInt(object.id);
            if (isNaN(object.id)) {
                return false;
            }
        }
    } else {
        return false;
    }

    if (typeof object.pa !== 'undefined') {
        if (typeof object.pa === 'string') {
            object.pa = parseInt(object.pa);
            if (isNaN(object.pa)) {
                return false;
            }
        }
    } else {
        return false;
    }

    if (typeof object.pm !== 'undefined') {
        if (typeof object.pm === 'string') {
            object.pm = parseInt(object.pm);
            if (isNaN(object.pm)) {
                return false;
            }
        }
    } else {
        return false;
    }

    if (typeof object.n === 'undefined') {
        return false;
    }

    return true
}
