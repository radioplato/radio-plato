import React, { RefObject, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';

import { playerService } from '../../services/PlayerService';
import { TrackInformation } from '../../models';

import TrackTitle from '../track-info/TrackTitleComponent';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';
import { ICON_KEY } from '../../../icons/icons';

import './FooterPlayerComponent.scss';
import VolumeControls from '../volume-controls/VolumeControlsComponent';
import StreamLinks from '../playlists/StreamLinksComponent';

function FooterPlayerComponent() {
    const history = useHistory();
    const [playing, setPlaying] = useState(playerService.playing);
    const [trackArt, setTrackArt] = useState(playerService.trackArt);

    const panelRef: RefObject<HTMLDivElement> = React.createRef();

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

    const togglePanel = () => {
        panelRef.current?.classList.toggle('full');
    }

    return (
        <div className='player'>
            <div ref={panelRef} className='main-panel'>
                <div className='track-art-container'>
                    <div
                        className='track-art'
                        style={{
                            backgroundImage: `url(${trackArt})`,
                        }}
                        onClick={togglePanel}
                    ></div>
                </div>
                <div className='controls-container'>
                    <VolumeControls className='volume-controls' />
                    <div className='other-controls'>
                        <StreamLinks className='stream-links' />
                        <Button
                            className='fullscreen-button'
                            type={BUTTON_TYPE.GHOST}
                            size={BUTTON_SIZE.LARGE}
                            icon={ICON_KEY.MINIMIZE_REGULAR}
                            title='minimize player'
                            onClick={togglePanel}
                        />
                    </div>
                </div>
            </div>
            <div className='footer-panel'>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${trackArt})`,
                    }}
                    onClick={togglePanel}
                ></div>
                <TrackTitle className='track-title-component' isTicker={true} />
                <Button
                    className='play-button'
                    type={BUTTON_TYPE.OUTLINE}
                    size={BUTTON_SIZE.LARGE}
                    icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                    title={playing ? `pause` : 'play'}
                    onClick={togglePlayingMode}
                />
            </div>
        </div>
    );
}

export default FooterPlayerComponent;
