import { Subject } from "rxjs";

import { PlayerState } from "./interfaces";
import { DEFAULT_PLAYER_STATE, DATA_REQUEST_INTERVAL } from "./constants";

enum StorageKey {
    Volume = "volume",
}

const parseVolume = (value: string | null): number => (value !== null ? parseFloat(value) : 1);

const tickPeriod = 3;
const rampTicks = 100;

class PlayerService {
    private playerState: PlayerState;
    private track = "";
    private playerStateSubject: Subject<PlayerState>;
    private trackNameSubject: Subject<string>;

    private fadingTimer: ReturnType<typeof setInterval>;

    constructor(state: PlayerState) {
        this.playerState = state;

        this.playerStateSubject = new Subject();
        this.trackNameSubject = new Subject();

        this.fadingTimer = setInterval(() => {}, 0);

        this.volume = parseVolume(localStorage.getItem(StorageKey.Volume));

        this.updateTrackName();
        setInterval(this.updateTrackName.bind(this), DATA_REQUEST_INTERVAL);
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

    set fading(isFading: boolean) {
        this.playerState.fading = isFading;
        this.playerStateSubject.next(this.playerState);
    }

    get fading(): boolean {
        return this.playerState.fading;
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

    async updateTrackName () {
        const url = process.env.REACT_APP_DATA_URL_RESERVE as string;
        const response = await fetch(url);
        const data = await response.json();
        const title = process.env.REACT_APP_ENV !== 'staging' ?
            data?.now_playing?.song?.title :
            data.icestats.source[0].title;
        const artist = process.env.REACT_APP_ENV !== 'staging' ?
            data?.now_playing?.song?.artist :
            data.icestats.source[0].artist;
        const trackName = `${artist ?? 'Unknown Artist'} — ${title ?? 'ID'}`

        if (trackName !== this.track) {
            this.track = trackName;
            this.trackNameSubject.next(this.track);
        }
    }

    fadeOut() {
        if (!this.playing || !this.muted) {
            return;
        }

        const currentVolume = this.volume;
        const volumeDecrease = currentVolume / rampTicks;

        clearInterval(this.fadingTimer);

        this.fading = true;

        this.fadingTimer = setInterval(() => {
            if (this.volume - volumeDecrease > 0) {
                this.volume = this.volume - volumeDecrease;
            } else {
                this.volume = 0;
                this.fading = false;

                clearInterval(this.fadingTimer);
            }
        }, tickPeriod);
    }

    fadeIn() {
        if (!this.playing || !this.muted) {
            return;
        }

        const currentVolume = this.volume;
        const volumeIncrease = currentVolume / rampTicks;

        clearInterval(this.fadingTimer);

        this.fading = true;

        this.fadingTimer = setInterval(() => {
            if (this.volume + volumeIncrease < 1) {
                this.volume = this.volume + volumeIncrease;
            } else {
                this.volume = 1;
                this.fading = false;

                clearInterval(this.fadingTimer);
            }
        }, tickPeriod);
    }
}

const playerService = new PlayerService(DEFAULT_PLAYER_STATE);

export { playerService };
