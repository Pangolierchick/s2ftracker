import { fetchS2FAuctionTimestamped } from './auction';
import {
    fetchPlayersFromUrlTimestamped
} from './players'

import { writeFile } from 'fs/promises';
import { safeReadJsonPlayers, safeReadJsonProduct } from './utils';

import { logger } from './logger';
import { S2F_MAIN_PAGE, AUCTION_URL } from './consts';

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
    }

    logger.info('✅ Fetching products done.');
}

async function main() {
    console.log("=========== CHECKER STARTED ===========");

    const FETCH_PLAYERS_TIMEOUT = 1000 * 60 * 3; // 3 hours
    const FETCH_AUCTION_TIMEOUT = 1000 * 60 * 8; // 8 hours

    fetchS2FData();

    setInterval(fetchAndSavePlayers, FETCH_PLAYERS_TIMEOUT);
    setInterval(fetchAndSaveProducts, FETCH_AUCTION_TIMEOUT);
}

main();
