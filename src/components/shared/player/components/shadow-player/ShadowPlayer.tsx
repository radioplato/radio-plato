import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Subscription } from 'rxjs';

import { playerService } from '../../services/PlayerService';
import { PlayerState } from '../../models';
import { DEFAULT_PLAYER_STATE } from '../../constants';

import './ShadowPlayer.css';

export class ShadowPlayer extends Component {
    state = DEFAULT_PLAYER_STATE;
    subscription: Subscription | null = null;
    
    componentDidMount () {
        this.subscribeOnPlayerStateChange();
        this.setState({ playing: false });
    }

    subscribeOnPlayerStateChange () {
        this.subscription = playerService.subscribeOnPlayerStateChanges((data: PlayerState) => {
            if (data.playing !== this.state.playing) {
                const audio = document.querySelector('audio') as HTMLAudioElement;

                audio.src = data.playing ? process.env.REACT_APP_STREAM_URL as string : '';
            }
            this.setState(data);
        });
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    render () {
        const {
            playing,
            muted,
            volume
        } = this.state;

        return (
            <div className='audio'>
                <ReactPlayer
                    url={ "https://upload.wikimedia.org/wikipedia/commons/2/2e/LatinTriangle.ogg" }
                    playing={ playing }
                    muted={ muted }
                    volume={ volume }
                    config={{
                        file: {
                            forceAudio: true
                        }
                    }}
                />
            </div>
        );
    }
}

export default ShadowPlayer;