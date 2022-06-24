import fetch from 'node-fetch';
import { S2F_MAIN_PAGE } from './consts';
import { S2FPlayers, S2FPlayersRecord } from './types';
import { addTimestamp } from './utils';

import { logger } from './logger';

export async function getHTMLpage(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    logger.error(`❌ Can't request ${url} page. Status: ${response.status}`);
    throw Error(`Can't request ${url} page. Status: ${response.statusText}`);
  }

  return await (response.text());
}

export function getPlayersFromHTML(html: string): S2FPlayers {
  const regexp = />(\d{1,9})</gm;

  let m: RegExpExecArray | null;

  const playersNum: Array<number> = [];

  while ((m = regexp.exec(html)) !== null) {
    if (m.index === regexp.lastIndex) {
      regexp.lastIndex++;
    }

    playersNum.push(parseInt(m[1]));
  }

  if (typeof playersNum[0] === 'undefined' || typeof playersNum[1] === 'undefined') {
    throw new Error('Could not read players from html');
  }

  return {
    tr: playersNum[0],
    pn: playersNum[1]
  } as S2FPlayers;
}

export async function fetchPlayersFromUrl(url: string): Promise<S2FPlayers> {
  const html = await getHTMLpage(url);
  const players = getPlayersFromHTML(html);

  return players;
}

export async function fetchPlayersFromUrlTimestamped(url: string): Promise<S2FPlayersRecord> {
  const players = await fetchPlayersFromUrl(url);
  return addTimestamp<S2FPlayersRecord>(players);
}
