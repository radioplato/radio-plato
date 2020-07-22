import React, { useState } from 'react';

import ReactSlider from 'react-slider';
import { Icon } from '@iconify/react';
import bxsVolumeFull from '@iconify/icons-bx/bxs-volume-full';
import bxsVolumeMute from '@iconify/icons-bx/bxs-volume-mute';

import { playerService } from '../../PlayerService';

import './VolumeControls.css';

const FullVolumeIcon = <Icon icon={ bxsVolumeFull } width={ 16 } height={ 16 } color='#ffffff'/>;
const MuteVolumeIcon = <Icon icon={ bxsVolumeMute } width={ 16 } height={ 16 } color='#ffffff'/>;

function VolumeControls() {
    const [ muted, setVolumeMode ] = useState(playerService.muted);
    
    const toggleVolumeMode = () => {
        playerService.muted = !playerService.muted;
        setVolumeMode(playerService.muted);
    }

    const changeVolume = (value: any) => {
        playerService.volume = value / 100;
    }

    const sliderDefaultValue = () => {
        const value = playerService.volume * 100;
        
        return Math.trunc(value);
    }

    return (
        <div className='volume-controls'>
            <button 
                className='volume-mode-button'
                aria-label='Toggle volume button'
                onClick={ toggleVolumeMode }
            >
                { muted ? FullVolumeIcon : MuteVolumeIcon }
            </button>
            <ReactSlider
                className='horizontal-slider'
                thumbClassName='thumb'
                trackClassName='track'
                defaultValue={ sliderDefaultValue() }
                onChange={ value => changeVolume(value)}
            />
        </div>
    );
}

export default VolumeControls;