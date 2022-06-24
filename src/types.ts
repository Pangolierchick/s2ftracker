export type S2FPlayers = {
    tr: number, // totalPlayers
    pn: number  // playersNow
}

export type S2FProduct = {
    id: number,   // id of item
    n: string,    // name of item
    c: number,    // count of items in auction now
    pa: number,   // average price of item
    pm: number    // minimum price of item
}

export type S2FPlayersRecord = {
    t: number,    // timestamp
    r: S2FPlayers // record
}

export type S2FProductRecord = {
    t: number,      // timestamp
    r: S2FProduct[] //record
}

export interface ILogger {
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
