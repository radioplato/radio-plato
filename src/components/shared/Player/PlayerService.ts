import { Subject } from "rxjs";

import { PlayerState } from "./interfaces";
import { DEFAULT_PLAYER_STATE } from "./constants";

enum StorageKey {
    Volume = "volume",
}

const parseVolume = (value: string | null): number => (value !== null ? parseFloat(value) : 1);
const tickPeriod = 50;
const rampTicks = 10;

class PlayerService {
    private playerState: PlayerState;
    private track = "";
    private playerStateSubject: Subject<PlayerState>;
    private trackNameSubject: Subject<string>;
    private connection = new WebSocket(process.env.REACT_APP_DATA_URL as string);

    private onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);

        this.updateTrackName(data.now_playing.song.text);
    }

    constructor(state: PlayerState) {
        this.playerState = state;

        this.playerStateSubject = new Subject();
        this.trackNameSubject = new Subject();

        this.volume = parseVolume(localStorage.getItem(StorageKey.Volume));

        this.connection.onmessage = (event) => this.onMessage(event);
    }

    set playing(isPlaying: boolean) {
        this.playerState.playing = isPlaying;
        this.playerStateSubject.next(this.playerState);
    }

    get playing() {
        return this.playerState.playing;
    }

    set volume(volumeLevel: number) {
        localStorage.setItem(StorageKey.Volume, volumeLevel.toString());

        this.playerState.volume = volumeLevel;
        this.playerStateSubject.next(this.playerState);
    }

    get volume() {
        return this.playerState.volume;
    }

    set muted(isMuted: boolean) {
        this.playerState.muted = isMuted;
        this.playerStateSubject.next(this.playerState);
    }

    get muted() {
        return this.playerState.muted;
    }

    get trackName() {
        return this.track;
    }

    subscribeOnPlayerStateChanges(onNext: Function) {
        return this.playerStateSubject.subscribe((data) => onNext(data));
    }

    subscribeOnTrackNameChanges(onNext: Function) {
        return this.trackNameSubject.subscribe((data) => onNext(data));
    }

    async updateTrackName(name: string = "") {
        if (name !== this.track) {
            this.track = name;
            this.trackNameSubject.next(this.track);
        }
    }

    fadeOut() {
        const currentVolume = this.volume;
        const volumeDecrease = currentVolume / rampTicks;

        this.playerState.fading = false;

        if (currentVolume > 0) {
            setTimeout(() => {
                this.volume = currentVolume - volumeDecrease;
                this.fadeOut();
            }, tickPeriod);
        } else {
            this.volume = 0;
            this.playerState.fading = false;
        }
    }

    fadeIn() {
        const currentVolume = this.volume;
        const volumeIncrease = currentVolume / rampTicks;

        if (currentVolume < 1) {
            setTimeout(() => {
                this.volume = currentVolume + volumeIncrease;
                this.fadeOut();
            }, tickPeriod);
        } else {
            this.volume = 1;
            this.playerState.fading = false;
        }
    }
}

const playerService = new PlayerService(DEFAULT_PLAYER_STATE);

export { playerService };
