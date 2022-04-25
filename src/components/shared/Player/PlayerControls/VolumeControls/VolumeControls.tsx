import React, { useEffect, useState } from 'react';

import ReactSlider from 'react-slider';
import { Icon } from '@iconify/react';
import bxsVolumeFull from '@iconify/icons-bx/bxs-volume-full';
import bxsVolumeMute from '@iconify/icons-bx/bxs-volume-mute';

import { isMobileOnly } from 'react-device-detect';

import { playerService } from '../../PlayerService';

import './VolumeControls.css';
import { PlayerState } from '../../interfaces';

const FullVolumeIcon = <Icon icon={ bxsVolumeFull } width={ 16 } height={ 16 } color='#ffffff'/>;
const MuteVolumeIcon = <Icon icon={ bxsVolumeMute } width={ 16 } height={ 16 } color='#ffffff'/>;
const device = isMobileOnly ? 'mobile' : 'desktop';

function VolumeControls() {
    const [ muted, setVolumeMode ] = useState(playerService.muted);
    const [ volume, setVolume ] = useState(Math.trunc(playerService.volume * 100));

    useEffect(() => {
        setVolume(sliderDefaultValue());

        const subscription = playerService.subscribeOnPlayerStateChanges((data: PlayerState) => {
            setVolume(Math.trunc(data.volume * 100));
            setVolumeMode(data.muted);
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
        <div className='volume-controls'>
            <button 
                className={ `volume-mode-button ${ device }` }
                aria-label='Toggle volume button'
                onClick={ toggleVolumeMode }
            >
                { muted ? MuteVolumeIcon : FullVolumeIcon }
            </button>
            <ReactSlider
                className={ `horizontal-slider ${ device }` }
                thumbClassName={ `thumb ${ device }` }
                trackClassName='track'
                defaultValue={ sliderDefaultValue() }
                onChange={ value => changeVolume(value)}
                ariaLabel='Volume slider'
                value={ volume }
            />
        </div>
    );
}

export default VolumeControls;