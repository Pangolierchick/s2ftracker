import { fetchS2FAuctionTimestamped } from './auction';
import {
    fetchPlayersFromUrlTimestamped
} from './players';

import { writeFile } from 'fs/promises';
import { safeReadJsonPlayers, safeReadJsonProduct } from './utils';

import { AUCTION_URL, FETCH_AUCTION_TIMEOUT, FETCH_PLAYERS_TIMEOUT, S2F_MAIN_PAGE } from './consts';
import { logger } from './logger';

import { setIntervalAsync } from 'set-interval-async/dynamic/index.js';

async function fetchS2FData() {
    try {
        await fetchAndSavePlayers();
        await fetchAndSaveProducts();
    } catch (e: any) {
        logger.prettyError(e);
    }
}
 
async function fetchAndSavePlayers() {
    const players = [await fetchPlayersFromUrlTimestamped(S2F_MAIN_PAGE)];
    const playersJson = await safeReadJsonPlayers('players.json');
    const mergedPlayers = playersJson.concat(players);
    await writeFile('players.json', JSON.stringify(mergedPlayers));
   
    logger.info('✅ Fetching players done.');
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

    logger.info('✅ Fetching products done.');
}

async function main() {
    console.log("=========== CHECKER STARTED ===========");

    fetchS2FData();

    setIntervalAsync(async () => {
        try {
            await fetchAndSavePlayers();
        } catch (e: any) {
            logger.error(e);
        }
    }, FETCH_PLAYERS_TIMEOUT);

    setIntervalAsync(async () => {
        try {
            await fetchAndSaveProducts();
        } catch (e: any) {
            logger.error(e);
        }
    }, FETCH_AUCTION_TIMEOUT);
}

main();
