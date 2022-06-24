import { fetchS2FAuctionTimestamped } from './auction';
import {
    fetchPlayersFromUrlTimestamped
} from './players';

import { writeFile } from 'fs/promises';
import { safeReadJsonPlayers, safeReadJsonProduct } from './utils';

import { AUCTION_URL, BACKUP_TIMEOUT, FETCH_AUCTION_TIMEOUT, FETCH_PLAYERS_TIMEOUT, S2F_MAIN_PAGE } from './consts';
import { logger } from './logger';

import { setIntervalAsync } from 'set-interval-async/dynamic/index.js';
import { createBackup } from './backup';

async function fetchS2FData() {
    try {
        await fetchAndSavePlayers();
        await fetchAndSaveProducts();
    } catch (e: any) {
        logger.prettyError(e);
    }

    const res = Promise.all([fetchAndSavePlayers(), fetchAndSaveProducts()]).then(() => {
        console.log('✅ Data fetch done.');
    }, () => {
        console.log('❌ Data fetch failed.');
    })
}
 
async function fetchAndSavePlayers() {
    const players = [await fetchPlayersFromUrlTimestamped(S2F_MAIN_PAGE)];
    const playersJson = await safeReadJsonPlayers('players.json');
    const mergedPlayers = playersJson.concat(players);
    await writeFile('players.json', JSON.stringify(mergedPlayers));
}

async function fetchAndSaveProducts() {
    const products = await fetchS2FAuctionTimestamped(AUCTION_URL, 'filter.json');
    const auctionJson = await safeReadJsonProduct('auction.json');

    if (products.r.length > 0) {
        const mergedAuction = auctionJson.concat(products);
        await writeFile('auction.json', JSON.stringify(mergedAuction));
    } else {
        logger.warn('Got 0 products.');
    }
}

async function createBackupHandler() {
    const backupFiles = [ './auction.json', 'players.json' ];
    const promises: Promise<void>[] = [];
    
    for (const file of backupFiles) {
        promises.push(createBackup(file));
    }

    Promise.all(promises).then(() => {
        console.log('✅ Backup done.');
    }, (r) => {
        console.log(`❌ Backup Failed. ${r}`);    
    });
}

async function main() {
    console.log("=========== CHECKER STARTED ===========");

    fetchS2FData();

    setIntervalAsync(async () => {
        fetchAndSavePlayers().then(() => {
            logger.info('✅ Fetching players done.');
        }, (r) => {
            logger.error('❌ Fetching players failed.', r);
        })
    }, FETCH_PLAYERS_TIMEOUT);

    setIntervalAsync(async () => {
        fetchAndSaveProducts().then(() => {
            logger.info('✅ Fetching products done.');
        }, (r) => {
            logger.error('❌ Fetching products failed.', r);
        })
    }, FETCH_AUCTION_TIMEOUT);

    setIntervalAsync(async () => {
        await createBackupHandler();
    }, BACKUP_TIMEOUT);
}

main();
