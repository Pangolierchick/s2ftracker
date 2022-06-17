import { fetchS2FAuction, fetchS2FAuctionTimestamped, filterAuctionJson } from './auction';
import {
    fetchPlayersFromUrlTimestamped
} from './players'

import { writeFile } from 'fs/promises';
import { addTimestamp, saveReadJson, saveReadJsonPlayers, saveReadJsonProduct } from './utils';
import { S2FPlayersRecord, S2FProductRecord } from './types';

import { logger } from './logger';
import { S2F_MAIN_PAGE, AUCTION_URL } from './consts';

async function fetchS2FData() {
    try {
        await fetchAndSavePlayers();
        await fetchAndSaveProducts();
    } catch {
        
    }
}

async function fetchAndSavePlayers() {
    logger.info('Fetching players');
    const players = [await fetchPlayersFromUrlTimestamped(S2F_MAIN_PAGE)];
    const playersJson = await saveReadJsonPlayers('players.json');
    const mergedPlayers = playersJson.concat(players);
    await writeFile('players.json', JSON.stringify(mergedPlayers));
}

async function fetchAndSaveProducts() {
    logger.info('Fetching products');
    const products = await fetchS2FAuctionTimestamped(AUCTION_URL, 'filter.json');
    const auctionJson = await saveReadJsonProduct('auction.json');
    
    if (products.record.length > 0) {
        const mergedAuction = auctionJson.concat(products);
        await writeFile('auction.json', JSON.stringify(mergedAuction));
    }
}

async function main() {
    console.log("=========== CHECKER STARTED ===========");

    const THREE_HOURS = 1000 * 60 * 3;
    const EIGHT_HOURS = 1000 * 60 * 8;

    fetchS2FData();

    // setInterval(fetchAndSavePlayers, THREE_HOURS);
    // setInterval(fetchAndSavePlayers, EIGHT_HOURS);
}

main();
