import { PlayerState } from "./interfaces";

export const DATA_REQUEST_INTERVAL = 15000;

export const DEFAULT_PLAYER_STATE: PlayerState = {
    playing: false,
    fading: false,
    muted: false,
    volume: 1,
};
