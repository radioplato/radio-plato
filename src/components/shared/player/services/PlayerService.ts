import { Subject } from 'rxjs';
import { DEFAULT_PLAYER_STATE, PLAYER_CONNECTING } from '../constants';
import { NowPlayingInformation, PlayerState, TrackInformation } from '../models';

enum StorageKey {
    Volume = 'volume',
}

const parseVolume = (value: string | null): number => (value !== null ? parseFloat(value) : 1);

const tickPeriod = 3;
const rampTicks = 100;

class PlayerService {
    private playerState: PlayerState;
    private trackInformation: TrackInformation = {
        name: PLAYER_CONNECTING,
        art: ''
    };
    private nowPlayingInformation: NowPlayingInformation = {
        name: null
    };
    private listeners = 'n/a';

    private playerStateSubject: Subject<PlayerState>;
    private trackInformationSubject: Subject<TrackInformation>;
    private nowPlayingInformationSubject: Subject<NowPlayingInformation>;
    private listenersSubject: Subject<string>;
    private connection = new WebSocket(process.env.REACT_APP_DATA_URL as string);

    private fadingTimer: ReturnType<typeof setInterval>;

    private onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);

        if (data && data.pub) {
            this.updateTrackInformation({
                name: data.pub.data.np.now_playing.song.text,
                art: data.pub.data.np.now_playing.song.art
            });

            this.updateNowPlayingInformation({
                name: data.pub.data.np.live.is_live ? data.pub.data.np.live.streamer_name : data.pub.data.np.now_playing.playlist,
            });

            this.updateTotalListeners(data.pub.data.np.listeners.total);
        }
    }

    constructor(state: PlayerState) {
        this.playerState = state;

        this.playerStateSubject = new Subject();
        this.trackInformationSubject = new Subject();
        this.nowPlayingInformationSubject = new Subject();
        this.listenersSubject = new Subject();

        this.fadingTimer = setInterval(() => {}, 0);

        this.volume = parseVolume(localStorage.getItem(StorageKey.Volume));

        this.connection.onopen = () => {
            this.connection.send(JSON.stringify({
                'subs': {
                    'station:radioplato': {}
                }
            }))
        }

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

    set fading(isFading: boolean) {
        this.playerState.fading = isFading;
        this.playerStateSubject.next(this.playerState);
    }

    get fading(): boolean {
        return this.playerState.fading;
    }

    get trackName() {
        return this.trackInformation.name;
    }

    get trackArt() {
        return this.trackInformation.art;
    }

    get nowPlaying() {
        return this.nowPlayingInformation;
    }

    get currentListeners() {
        return this.listeners;
    }

    subscribeOnPlayerStateChanges(onNext: Function) {
        return this.playerStateSubject.subscribe((data) => onNext(data));
    }

    subscribeOnTrackInformationChanges(onNext: Function) {
        return this.trackInformationSubject.subscribe((data) => onNext(data));
    }

    subscribeOnNowPlayingInformationChanges(onNext: Function) {
        return this.nowPlayingInformationSubject.subscribe((data) => onNext(data));
    }

    subscribeOnListenersChanges(onNext: Function) {
        return this.listenersSubject.subscribe((data) => onNext(data));
    }

    async updateTrackInformation(information: TrackInformation) {
        if (information && information.name !== this.trackName) {
            this.trackInformation = {
                ...information
            };
            this.trackInformationSubject.next(this.trackInformation);
        }
    }

    async updateNowPlayingInformation(information: NowPlayingInformation) {
        if (information && information.name !== this.nowPlayingInformation.name) {
            this.nowPlayingInformation = {
                ...information
            };
            this.nowPlayingInformationSubject.next(this.nowPlayingInformation);
        }
    }

    async updateTotalListeners(listeners: number) {
        const update = listeners.toString();

        if (listeners > 0 && update !== this.listeners) {
            this.listeners = update;
        }
        
        this.listenersSubject.next(this.listeners);
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
