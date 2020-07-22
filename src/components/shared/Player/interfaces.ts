import { PlayerTypes } from '../enums';


export interface PlayerState {
    playing: boolean;
    muted: boolean;
    volume: number;
}

export interface PlayerProps {
    playerType: PlayerTypes
};
