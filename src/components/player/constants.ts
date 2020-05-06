import { PlayerState } from './interfaces';

export const STREAM_URL = 'https://radioplato.radioca.st/stream';
export const DATA_URL = 'https://radioplato.radioca.st/status-json.xsl';

export const DATA_REQUEST_INTERVAL = 15000;

export const DEFAULT_PLAYER_STATE: PlayerState = {
    playing: false,
    muted: false,
    volume: 1
};

export enum PlayerTypes {
    Main = 'main',
    Header = 'header'
};
