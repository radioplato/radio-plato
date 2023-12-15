import React, { HTMLAttributes, useEffect, useState } from 'react'

import ReactSlider from 'react-slider';

import { playerService } from '../../services/PlayerService';

import { Button, BUTTON_TYPE, BUTTON_SIZE } from '../../../button/components/Button';
import { ICON_KEY } from '../../../icons/icons';
import { PlayerState } from '../../interfaces';

import './VolumeControlsComponent.scss'

function VolumeControls({
    className
}: HTMLAttributes<HTMLElement>) {
    const [ muted, setVolumeMode ] = useState(playerService.muted);
    const [ volume, setVolume ] = useState(Math.trunc(playerService.volume * 100));
    const [ volumeIconKey, setVolumeIconKey ] = useState(ICON_KEY.SPEAKER_MAXIMUM_REGULAR);

    useEffect(() => {
        setVolume(sliderDefaultValue());

        const subscription = playerService.subscribeOnPlayerStateChanges((data: PlayerState) => {
            setVolume(Math.trunc(data.volume * 100));
            setVolumeMode(data.muted);

            let key;

            if (data.muted) {
                key = ICON_KEY.SPEAKER_OFF_REGULAR;
            } else {
                key = data.volume < 0.3
                    ? ICON_KEY.SPEAKER_MINIMUM_REGULAR
                    : data.volume < 0.7
                        ? ICON_KEY.SPEAKER_MEDIUM_REGULAR
                        : ICON_KEY.SPEAKER_MAXIMUM_REGULAR;
            }

            setVolumeIconKey(key);
        });

        return () => subscription?.unsubscribe();
    }, []);
    
    const toggleVolumeMode = () => {
        playerService.muted = !playerService.muted;
        setVolumeMode(playerService.muted);
    }

    const changeVolume = (value: any) => {
        playerService.volume = value / 100;
        playerService.muted = false;

        setVolumeMode(playerService.muted);
    }

    const sliderDefaultValue = () => {
        const value = playerService.volume * 100;
        
        return Math.trunc(value);
    }

    return (
        <div className={`${className} volume-controls-container`}>
            <Button
                className='volume-mode-button'
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.BIG}
                icon={volumeIconKey}
                onClick={ toggleVolumeMode }
            />
            <ReactSlider
                className='horizontal-slider'
                thumbClassName='thumb'
                trackClassName='track'
                defaultValue={ sliderDefaultValue() }
                onChange={ value => changeVolume(value)}
                ariaLabel='volume slider'
                value={ volume }
            />
        </div>
    );
}

export default VolumeControls;