import React, { useState } from 'react';

import ReactSlider from 'react-slider';
import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-el/play';
import pauseIcon from '@iconify/icons-el/pause';
import bxsVolumeFull from '@iconify/icons-bx/bxs-volume-full';
import bxsVolumeMute from '@iconify/icons-bx/bxs-volume-mute';

import { playerService } from '../PlayerService';

import './PlayerControls.css';

const PauseIcon = <Icon icon={ pauseIcon } width={ 35 } height={ 35 }/>;
const PlayIcon = <Icon icon={ playIcon } width={ 35 } height={ 35 }/>;
const FullVolumeIcon = <Icon icon={ bxsVolumeFull } width={ 16 } height={ 16 } color="#ffffff"/>;
const MuteVolumeIcon = <Icon icon={ bxsVolumeMute } width={ 16 } height={ 16 } color="#ffffff"/>;

function PlayerControls() {
    const [ playing, setPlayingMode ] = useState(playerService.playing);
    const [ muted, setVolumeMode ] = useState(playerService.muted);

    const togglePlayingMode = () => {
        playerService.playing = !playerService.playing;
        setPlayingMode(playerService.playing);
    }

    const toggleVolumeMode = () => {
        playerService.muted = !playerService.muted;
        setVolumeMode(playerService.muted);
    }

    const changeVolume = (value: any) => {
        playerService.volume = value / 100;
    }

    return (
        <div className="controls-container">
            <button 
                className="control-button"
                onClick={ togglePlayingMode }
            >
                { playing ? PauseIcon : PlayIcon }
            </button>
            <div className="volume-controls">
                <button 
                    className="volume-mode-button"
                    onClick={ toggleVolumeMode }
                >
                    { muted ? FullVolumeIcon : MuteVolumeIcon }
                </button>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                    defaultValue={ 100 }
                    onChange={ value => changeVolume(value)}
                />
            </div>
        </div>
    );
}

export default PlayerControls;