export type S2FPlayers = {
    totalRegistered: number,
    playingNow: number
}

export type S2FProduct = {
    id: number,
    name: string,
    count: number,
    priceAvg: number,
    priceMin: number
}

export type S2FPlayersRecord = {
    timestamp: number,
    record: S2FPlayers
}

export type S2FProductRecord = {
    timestamp: number,
    record: S2FProduct[]
}
