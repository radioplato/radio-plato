export interface PlayerState {
    playing: boolean;
    fading: boolean;
    muted: boolean;
    volume: number;
};

export interface TrackInformation {
    name: string;
    art: string;
};

export interface NowPlayingInformation {
    name: string | null;
}
