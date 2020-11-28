import React, { PureComponent } from 'react';

import { Subscription } from 'rxjs';

import { isMobileOnly } from 'react-device-detect';

import PlayButton from '../PlayerControls/PlayButton/PlayButton';
import VolumeControls from '../PlayerControls/VolumeControls/VolumeControls';

import { playerService } from '../PlayerService';
import { PlayerProps } from '../interfaces';
import { PlayerTypes } from '../../enums';

import './PlayerComponent.css';


const ONAIR = 'onair';

export class PlayerComponent extends PureComponent<PlayerProps> {
    state = {
        trackName: ''
    };
    subscription: Subscription | null = null;

    get isMainPlayer () {
        return this.props.playerType === PlayerTypes.Main;
    }

    componentDidMount () {
        this.subscribeOnPlayerStateChange();
        this.setState({
            trackName: playerService.trackName
        });
    }

    onTrackChange (trackName: string) {
        if (isMobileOnly) {
            this.setState({ trackName });
        } else {
            const tracktitle = document.querySelector("p.track-title");

            tracktitle?.classList.remove("shown")
            tracktitle?.classList.add("hidden");
    
            setTimeout(() => { tracktitle?.classList.add("shown"); this.setState({ trackName }) }, 1000)
            setTimeout(() => tracktitle?.classList.remove("hidden"), 2000);
        } 
    }

    subscribeOnPlayerStateChange () {
        this.subscription = playerService.subscribeOnTrackNameChanges((trackName: string) => this.onTrackChange(trackName));
    }
    
    renderMainPlayer (trackName: string) {
        return (
            <>
                <div className='controls-container'>
                    <PlayButton playerType={ this.props.playerType }/>
                    <VolumeControls />
                </div>
                <p className='onair'>{ ONAIR }</p>
                <p className='track-title'>{ trackName }</p>
            </>
        );
    }

    renderHeaderPlayer (trackName: string) {
        return (
            <>
                <PlayButton playerType={ this.props.playerType }/>
                    <div className='track-title'>
                        <div className="overlay"></div>
                        <p>{ trackName }</p>
                    </div>
                <VolumeControls />
            </>
        );
    }

    renderPlayer () {
        const {
            trackName
        } = this.state;

        return this.isMainPlayer ?
            this.renderMainPlayer(trackName) :
            this.renderHeaderPlayer(trackName);
    }

    render () {
        return (
            <div className={ `${ this.props.playerType }-player ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                { this.renderPlayer() }
            </div>
        );
    }
}

export default PlayerComponent;
