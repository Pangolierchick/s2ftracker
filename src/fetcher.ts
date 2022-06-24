import { writeFile } from "fs/promises";
import { Logger } from "tslog";
import { fetchS2FAuctionTimestamped } from "./auction";
import { AUCTION_URL, S2F_MAIN_PAGE } from "./consts";
import { logger } from "./logger";
import { fetchPlayersFromUrlTimestamped } from "./players";
import { ILogger } from "./types";
import { safeReadJsonPlayers, safeReadJsonProduct } from "./utils";

export class S2FFetcher {
    readonly playersFilename: string;
    readonly auctionFilename: string;
    private logger: ILogger | undefined;
    private backuper: ((filename: string) => Promise<void>) | undefined;

    constructor(playersFilename: string, auctionFilename: string, options?: {log?: Logger, backuper?: (filename: string) => Promise<void>}) {
        this.playersFilename = playersFilename;
        this.auctionFilename = auctionFilename;

        if (typeof options !== 'undefined') {
            this.logger = options.log;
            this.backuper = options.backuper;
        }
    }

    async fetchAndSavePlayers(s2fmainpageUrl: string) {
        const playersFilename = this.playersFilename;
        Promise.all([
            fetchPlayersFromUrlTimestamped(s2fmainpageUrl),
            safeReadJsonPlayers(playersFilename)
        ]).then(async (value) => {
            const players = [value[0]];
            const playersJson = value[1];

            const mergedPlayers = playersJson.concat(players);
            await writeFile(this.playersFilename, JSON.stringify(mergedPlayers));

            await this.backup(this.playersFilename);

            this.logger?.info('✅ Fetching players done.');
        }, (r) => {
            this.logger?.error('❌ Fetching players failed.', r);
        })
    }

    async fetchAndSaveAuction(auctionUrl: string, filterPath?: string) {
        Promise.all([
            fetchS2FAuctionTimestamped(auctionUrl, filterPath),
            safeReadJsonProduct(this.auctionFilename)
        ]).then(async (value) => {
            const products = value[0];
            const auctionJson = value[1];

            if (products.r.length > 0) {
                const mergedAuction = auctionJson.concat(products);
                await writeFile(this.auctionFilename, JSON.stringify(mergedAuction));
            } else {
                this.logger?.warn('Got 0 products.');
            }

            await this.backup(this.auctionFilename);

            this.logger?.info('✅ Fetching products done.');
        }, (r) => {
            this.logger?.error('❌ Fetching products failed.', r);
        })
    }

    async fetchS2FData(s2fmainpageUrl: string, auctionUrl: string, filterPath?: string) {
        Promise.all([this.fetchAndSavePlayers(s2fmainpageUrl), this.fetchAndSaveAuction(auctionUrl, filterPath)]).then(() => {
            this.logger?.info('✅ Data fetch done.');
        }, (r) => {
            this.logger?.error('❌ Data fetch failed.', r);
        })
    }

    private async backup(filename: string) {
        if (this.backuper) {
            this.backuper(filename).then(() => {
                this.logger?.info(`✅ Backup of ${filename} done.`);
            }, (r) => {
                this.logger?.error(`❌ Backup of ${filename} Failed. ${r}`);
            });
        }
    }

    attachBackuper(backuper: (filename: string) => Promise<void>) {
        this.backuper = backuper;
    }

    attachLogger(logger: ILogger) {
        this.logger = logger;
    }
}
