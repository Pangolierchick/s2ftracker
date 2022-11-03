import {__root} from './path';
import { join } from 'path';

export const AUCTION_URL = 'http://sky2fly.ru/gen/auction.csv';
export const S2F_MAIN_PAGE = 'https://sky2fly.ru/';

export const PLAYERS_DATA_JSON_FILENAME = join(__root(), './data/players.json');
export const AUCTION_DATA_JSON_FILENAME = join(__root(), './data/auction.json');
export const DEFAULT_FILTER_FILEPATH    = join(__root(), 'filter.json');

export const FETCH_PLAYERS_TIMEOUT = 1000 * 60 * 60 * 2; // 2 hours
export const FETCH_AUCTION_TIMEOUT = 1000 * 60 * 60 * 6; // 6 hours
