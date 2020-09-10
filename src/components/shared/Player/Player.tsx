import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Subscription } from 'rxjs';

import { playerService } from './PlayerService';
import { PlayerState } from './interfaces';
import { DEFAULT_PLAYER_STATE } from './constants';

import './Player.css';

export class Player extends Component {
    state = DEFAULT_PLAYER_STATE;
    subscription: Subscription | null = null;
    
    componentDidMount () {
        this.subscribeOnPlayerStateChange();
    }

    subscribeOnPlayerStateChange () {
        this.subscription = playerService.subscribeOnPlayerStateChanges(
            (data: PlayerState) => this.setState(data)
        );
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
                    url={ process.env.REACT_APP_STREAM_URL }
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

export default Player;