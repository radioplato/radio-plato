import { Subject } from 'rxjs'

import { PlayerState } from './interfaces';
import { DEFAULT_PLAYER_STATE, DATA_REQUEST_INTERVAL } from './constants';

class PlayerService {
    private playerState: PlayerState;
    private track = '';
    private playerStateSubject: Subject<PlayerState>;
    private trackNameSubject: Subject<string>;

    constructor (state: PlayerState) {
        this.playerState = state;
        this.playerStateSubject = new Subject();
        this.trackNameSubject = new Subject();

        this.updateTrackName();
        setInterval(this.updateTrackName.bind(this), DATA_REQUEST_INTERVAL);
    }

    set playing (isPlaying: boolean) {
        this.playerState.playing = isPlaying;
        this.playerStateSubject.next(this.playerState);
    }

    get playing () {
        return this.playerState.playing;
    }

    set volume (volumeLevel: number) {
        this.playerState.volume = volumeLevel;
        this.playerStateSubject.next(this.playerState);
    }

    get volume () {
        return this.playerState.volume;
    }

    set muted (isMuted: boolean) {
        this.playerState.muted = isMuted;
        this.playerStateSubject.next(this.playerState);
    }

    get muted () {
        return this.playerState.muted;
    }

    get trackName () {
        return this.track;
    }

    subscribeOnPlayerStateChanges (onNext: Function) {
        return this.playerStateSubject.subscribe(data => onNext(data));
    }

    subscribeOnTrackNameChanges (onNext: Function) {
        return this.trackNameSubject.subscribe(data => onNext(data));
    }

    async updateTrackName () {
        const url = process.env.REACT_APP_DATA_URL as string;
        const response = await fetch(url);
        const data = await response.json();
        const trackName = process.env.REACT_APP_ENV !== 'staging' ?
            data.now_playing.song.title :
            data.icestats.source[0].title;

        if (trackName !== this.track) {
            this.track = trackName;
            this.trackNameSubject.next(this.track);
        }
    }
}

const playerService = new PlayerService(DEFAULT_PLAYER_STATE);

export { playerService };