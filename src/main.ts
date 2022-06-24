import { AUCTION_DATA_JSON_FILENAME, AUCTION_URL, DEFAULT_FILTER_FILEPATH, FETCH_AUCTION_TIMEOUT, FETCH_PLAYERS_TIMEOUT, PLAYERS_DATA_JSON_FILENAME, S2F_MAIN_PAGE } from './consts';
import { logger } from './logger';
import { createBackup } from './backup';
import { S2FFetcher } from './fetcher';
import { setIntervalAsync } from 'set-interval-async/dynamic/index.js';

async function main() {
    console.log("=========== CHECKER STARTED ===========");

    const fetcher = new S2FFetcher(PLAYERS_DATA_JSON_FILENAME, AUCTION_DATA_JSON_FILENAME);
    fetcher.attachLogger(logger);
    fetcher.attachBackuper(createBackup);

    fetcher.fetchS2FData(S2F_MAIN_PAGE, AUCTION_URL, DEFAULT_FILTER_FILEPATH);

    setIntervalAsync(async () => { await fetcher.fetchAndSavePlayers(S2F_MAIN_PAGE) }, FETCH_PLAYERS_TIMEOUT);
    setIntervalAsync(async () => { await fetcher.fetchAndSaveAuction(AUCTION_URL)   }, FETCH_AUCTION_TIMEOUT);
}

main();
