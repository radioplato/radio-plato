import { PlayerTypes } from "../enums";

export interface PlayerState {
    playing: boolean;
    fading: boolean;
    muted: boolean;
    volume: number;
}

export interface TrackInformation {
    name: string;
    art: string;
}

export interface PlayerProps {
    playerType: PlayerTypes;
}
