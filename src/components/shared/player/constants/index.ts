import { PlayerState } from "../interfaces";

export const DEFAULT_PLAYER_STATE: PlayerState = {
    playing: false,
    fading: false,
    muted: false,
    volume: 1,
};

export const PLAYER_CONNECTING = 'Connecting to the server...';

export const PLAYER_COPIED = 'Сopied to clipboard!'
