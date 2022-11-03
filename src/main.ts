import { AUCTION_DATA_JSON_FILENAME, AUCTION_URL, DEFAULT_FILTER_FILEPATH, FETCH_AUCTION_TIMEOUT, FETCH_PLAYERS_TIMEOUT, PLAYERS_DATA_JSON_FILENAME, S2F_MAIN_PAGE } from './consts';
import { logger } from './logger';
import { createBackup } from './backup';
import { S2FFetcher } from './fetcher';
import { setIntervalAsync } from 'set-interval-async/dynamic/index.js';
import express from 'express';
import compression from 'compression';

import fs from 'fs/promises'
import { S2FPlayersRecord } from './types';

import { __root } from './path';

const app = express()
const port = 3000

app.use(compression())
app.use(express.static('public'));
app.set('view engine', 'ejs');

async function main() {
  console.log("=========== CHECKER STARTED ===========");

  const fetcher = new S2FFetcher(PLAYERS_DATA_JSON_FILENAME, AUCTION_DATA_JSON_FILENAME, { zipName: './data/backup.zip' });
  console.log(__root());
  fetcher.attachLogger(logger);
  fetcher.attachBackuper(createBackup);

  fetcher.fetchS2FData(S2F_MAIN_PAGE, AUCTION_URL, DEFAULT_FILTER_FILEPATH);

  setIntervalAsync(async () => { await fetcher.fetchAndSavePlayers(S2F_MAIN_PAGE) }, FETCH_PLAYERS_TIMEOUT);
  setIntervalAsync(async () => { await fetcher.fetchAndSaveAuction(AUCTION_URL) }, FETCH_AUCTION_TIMEOUT);
}

main();


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/render', (req, res) => {
  app.render('index', {}, async (err, html) => {
    console.log(err, html)
    await fs.writeFile('index.html', html)
  })

  app.render('players', {players: [{t: 0, r: {tr: 0, pn: 0}}]}, async (err, html) => {
    console.log(err, html)
    await fs.writeFile('players.html', html)
  })
})

app.get('/players', async (req, res) => {
  const playersText = await fs.readFile('./data/players.json', {encoding: 'utf-8'})
  const playersJson = JSON.parse(playersText) as S2FPlayersRecord[]

  const labels: string[] = []
  const data: number[] = []

  for (const player of playersJson) {
    labels.push(`"${new Date(player.t).toLocaleString('ru').replace(',', '')}"`)
    data.push(player.r.pn)
  }

  res.render('players', {
    players: playersJson,
    plotData: {
      labels: labels,
      data: data
    }
  })
})

app.get('/auction', async (req, res) => {
  res.render('auction')
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
