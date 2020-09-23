import { Subject } from 'rxjs'

import { PlayerState } from './interfaces';
import { DEFAULT_PLAYER_STATE } from './constants';

class PlayerService {
    private playerState: PlayerState;
    private track = '';
    private playerStateSubject: Subject<PlayerState>;
    private trackNameSubject: Subject<string>;
    private connection = new WebSocket(process.env.REACT_APP_DATA_URL as string);

    private onMessage (event: MessageEvent) {
        const data = JSON.parse(event.data);

        this.updateTrackName(data.now_playing.song.text);
    }

    constructor (state: PlayerState) {
        this.playerState = state;
        this.playerStateSubject = new Subject();
        this.trackNameSubject = new Subject();
        this.connection.onmessage = event => this.onMessage(event);
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

    async updateTrackName (name: string = '') {
        if (name !== this.track) {
            this.track = name;
            this.trackNameSubject.next(this.track);
        }
    }
}

const playerService = new PlayerService(DEFAULT_PLAYER_STATE);

export { playerService };