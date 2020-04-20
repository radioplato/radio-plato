import { PlayerTypes } from "./constants";

export interface PlayerState {
    playing: boolean;
    muted: boolean;
    volume: number;
}

export interface PlayerProps {
    playerType: PlayerTypes
};
