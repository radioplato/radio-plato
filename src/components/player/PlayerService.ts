import { Subject } from 'rxjs'

import { PlayerState } from './interfaces';
import { DEFAULT_PLAYER_STATE } from './constants';

class PlayerService {
    private state: PlayerState;
    private subject: Subject<PlayerState>;

    constructor (state: PlayerState) {
        this.state = state;
        this.subject = new Subject();
    }

    set playing (isPlaying: boolean) {
        this.state.playing = isPlaying;
        this.subject.next(this.state);
    }

    get playing () {
        return this.state.playing;
    }

    set volume (volumeLevel: number) {
        this.state.volume = volumeLevel;
        this.subject.next(this.state);
    }

    set muted (isMuted: boolean) {
        this.state.muted = isMuted;
        this.subject.next(this.state);
    }

    get muted () {
        return this.state.muted;
    }

    subscribe (onNext: Function) {
        return this.subject.subscribe(data => onNext(data));
    }
}

const playerService = new PlayerService(DEFAULT_PLAYER_STATE)

export { playerService };