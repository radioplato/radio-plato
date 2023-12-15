import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';

import { playerService } from '../../services/PlayerService';
import { TrackInformation } from '../../interfaces';

import VolumeControls from '../volume-controls/VolumeControlsComponent';
import TrackTitle from '../track-info/TrackTitleComponent';
import StreamLinks from '../playlists/StreamLinksComponent';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';
import { ICON_KEY } from '../../../icons/icons';

import './HeaderPlayerComponent.scss';

function HeaderPlayerComponent() {
    const history = useHistory();
    const [ playing, setPlaying ] = useState(playerService.playing);
    const [ trackArt, setTrackArt ] = useState(playerService.trackArt);

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

    const navigateToPlayerPage = () => {
        history.push('/player');
    }

    return (
        <div className='header-player'>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${trackArt})`,
                    }}
                ></div>
                <Button
                    className='play-button'
                    type={BUTTON_TYPE.OUTLINE}
                    size={BUTTON_SIZE.BIG}
                    icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                    onClick={togglePlayingMode}
                />
                <TrackTitle className='header' isTicker={true} />
                <VolumeControls className='volume-controls' />
                <StreamLinks className='stream-links' />
                <Button
                    className='fullscreen-button'
                    type={BUTTON_TYPE.GHOST}
                    size={BUTTON_SIZE.BIG}
                    icon={ICON_KEY.MAXIMIZE_REGULAR}
                    onClick={navigateToPlayerPage}
                />
            </div>
    );
}

export default HeaderPlayerComponent;
