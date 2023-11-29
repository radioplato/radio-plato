import React, { PureComponent } from 'react';

import { Subscription } from 'rxjs';

import { isMobileOnly } from 'react-device-detect';

import { playerService } from '../../services/PlayerService';
import { TrackInformation } from '../../interfaces';

import './HeaderPlayerComponent.scss';
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../../button/components/Button';
import { DONATE_LINK } from '../../../constants';
import { ICON_KEY } from '../../../icons/icons';

const ONAIR = 'onair!';
const M3U = 'https://azura.radioplato.by/public/1/playlist.m3u'
const PLS = 'https://azura.radioplato.by/public/1/playlist.pls'

const copyToClipboard = (text: string) => {
    const dummy = document.createElement('textarea');

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
};

export class HeaderPlayerComponent extends PureComponent {
    state = {
        trackName: '',
        trackArt: ''
    };
    subscription: Subscription | null = null;

    componentDidMount () {
        this.subscribeOnPlayerStateChange();
        this.setState({
            trackName: playerService.trackName,
            trackArt: playerService.trackArt
        });
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    onTrackChange (information: TrackInformation) {
        if (isMobileOnly) {
            this.setState({
                trackName: information.name,
                trackArt: information.art
            });
        } else {
            const tracktitle = document.querySelector('p.track-title');

            tracktitle?.classList.remove('shown')
            tracktitle?.classList.add('hidden');
    
            setTimeout(() => {
                tracktitle?.classList.add('shown');
                this.setState({
                    trackName: information.name,
                    trackArt: information.art
                });
            }, 1000)
            setTimeout(() => tracktitle?.classList.remove('hidden'), 2000);
        } 
    }

    subscribeOnPlayerStateChange () {
        this.subscription = playerService.subscribeOnTrackInformationChanges((information: TrackInformation) => this.onTrackChange(information));
    }

    handleTrackTitleClick () {
        const trackName = this.state.trackName;
        copyToClipboard(trackName);
        this.setState({ trackName: 'Copied!' });
        setTimeout(() => this.setState({ trackName }), 1000)
    }


    render () {
        const {
            trackName,
            trackArt
        } = this.state;

        // TODO: extract 'onair', 'playlists', 'volume-controls' components
        // think about extracting 'track-name'
        // finish the header's player
        // work on the fullscreen player

        return (
            <div className='header-player'>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${ trackArt })`,
                    }}
                ></div>
                <Button
                    type={BUTTON_TYPE.OUTLINE}
                    size={BUTTON_SIZE.LARGE}
                    icon={ICON_KEY.PLAY_FILLED}
                    className='play-button'
                ></Button>
                <div className='track-information-container'>
                    <div className='on-air'>
                        <span className='red-dot'></span>
                        <span className='title'>On Air</span>
                    </div>
                    <div className='track-name'>{trackName}</div>
                </div>
                <Button
                    type={BUTTON_TYPE.GHOST}
                    size={BUTTON_SIZE.LARGE}
                    icon={ICON_KEY.SPEAKER_MAXIMUM_REGULAR}
                ></Button>
            </div>
        );
    }
}

export default HeaderPlayerComponent;
