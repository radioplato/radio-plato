import { PlayerTypes } from "../enums";

export interface PlayerState {
    playing: boolean;
    fading: boolean;
    muted: boolean;
    volume: number;
}

export interface PlayerProps {
    playerType: PlayerTypes;
}
