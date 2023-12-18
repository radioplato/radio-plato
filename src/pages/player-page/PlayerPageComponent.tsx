import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import { playerService } from '../../components/shared/player/services/PlayerService';
import { TrackInformation } from '../../components/shared/player/interfaces';

import VolumeControls from '../../components/shared/player/components/volume-controls/VolumeControlsComponent';
import TrackTitle from '../../components/shared/player/components/track-info/TrackTitleComponent';
import StreamLinks from '../../components/shared/player/components/playlists/StreamLinksComponent';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../components/shared/button/components/Button';
import { ICON_KEY } from '../../components/shared/icons/icons';

import './PlayerPageComponent.scss';

function PlayerPageComponent() {
    const history = useHistory();
    const [playing, setPlaying] = useState(playerService.playing);
    const [trackArt, setTrackArt] = useState(playerService.trackArt);

    useEffect(() => {
        const subscription = playerService.subscribeOnTrackInformationChanges((information: TrackInformation) => {
            if (isMobileOnly) {
                setTrackArt(information.art);
            } else {
                const tracktitle = document.querySelector('p.track-title');

                tracktitle?.classList.remove('shown')
                tracktitle?.classList.add('hidden');

                setTimeout(() => {
                    tracktitle?.classList.add('shown');
                    setTrackArt(information.art);
                }, 1000)
                setTimeout(() => tracktitle?.classList.remove('hidden'), 2000);
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    const togglePlayingMode = () => {
        playerService.playing = !playerService.playing;

        setPlaying(playerService.playing);
    }

    const navigateBack = () => {
        if (history.length > 2) {
            history.goBack();
        } else {
            history.push('/');
        }
    }

    return (
        <div className={`page-player-container ${isMobileOnly ? 'mobile' : 'desktop'}`}>
            <div className='left-section'>
                <TrackTitle className='page' isTicker={false} />
                <div className='player-primary-controls'>
                    <Button
                        className='play-button'
                        type={BUTTON_TYPE.OUTLINE}
                        size={BUTTON_SIZE.HUGE}
                        icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                        title={playing ? 'pause' : 'play'}
                        onClick={togglePlayingMode}
                    />
                    <VolumeControls className='volume-controls' />
                </div>
                <div className='player-secondary-controls'>
                    <StreamLinks className='stream-links' />
                    <Button
                        className='fullscreen-button'
                        type={BUTTON_TYPE.GHOST}
                        size={BUTTON_SIZE.BIG}
                        icon={ICON_KEY.MINIMIZE_REGULAR}
                        title='close fullscreen player'
                        onClick={navigateBack}
                    />
                </div>
            </div>
            <div className='right-section'>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${trackArt})`,
                    }}
                ></div>
            </div>
        </div>
    );
}

export default PlayerPageComponent;
