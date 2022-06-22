import fetch from 'node-fetch';
import { parse } from 'csv-parse';
import { S2FProduct, S2FProductRecord } from './types';
import fs from 'fs';
import { AUCTION_URL } from './consts';
import { addTimestamp } from './utils';

import { logger } from './logger';

async function getAuction(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
        logger.error(`❌ Cant fetch auction ${url} data. Status: ${response.status}`);
        throw Error(`Cant fetch auction ${url} data. Status: ${response.status}`);
    }

    const auctionCsv = await response.text();

    return auctionCsv;
}

async function parseAuction(csv: string): Promise<S2FProduct[]> {
    const readCsv = () => new Promise((resolve, reject) => {
        const records: Array<S2FProduct> = [];
    
        const parser = parse({ columns: ['id', 'name', 'count', 'priceAvg', 'priceMin'], delimiter: '\t', ltrim: true, rtrim: true, relax_quotes: true });
    
        parser.on('readable', () => {
            let line;
            while ((line = parser.read()) !== null) {
                records.push(line as S2FProduct);
            }
    
            resolve(records);
        })
    
        parser.on('error', (err) => {
            reject(err);
        })
    
        parser.write(csv);
        parser.end();
    })

    const records = await readCsv();

    return records as S2FProduct[];
}

export async function fetchS2FAuctionTimestamped(url: string, filterPath?: string): Promise<S2FProductRecord> {
    const product = await fetchS2FAuction(url, filterPath);
    return addTimestamp<S2FProductRecord>(product);
}

export async function fetchS2FAuction(url: string = AUCTION_URL, filterPath?: string): Promise<S2FProduct[]> {
    const csv = await getAuction(url);
    let products = await parseAuction(csv);

    if (typeof filterPath !== 'undefined') {
        products = filterAuctionJson(products, filterPath);
    }

    return products
}

export function filterAuctionJson(auctionJson: S2FProduct[], filterJsonPath: string): S2FProduct[] {
    if (!fs.existsSync(filterJsonPath)) {
        throw new Error(`Filter json ${filterJsonPath} doesnt exist`);
    }

    const filter: {names: string[]} = JSON.parse(fs.readFileSync(filterJsonPath, 'utf8'));
    filter.names.map(w => w.trim());

    const result = auctionJson.filter(word => filter.names.includes(word.n));

    return result;
}

