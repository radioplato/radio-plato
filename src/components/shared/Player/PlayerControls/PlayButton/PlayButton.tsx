import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-el/play';
import pauseIcon from '@iconify/icons-el/pause';

import { playerService } from '../../PlayerService';
import { PlayerProps } from '../../interfaces';
import { PlayerTypes } from '../../../enums';

import './PlayButton.css';


const SMALL_ICON = 10;
const LARGE_ICON = 35;

function PlayButton({ playerType }: PlayerProps) {
    const [ playing, setPlayingMode ] = useState(playerService.playing);

    const togglePlayingMode = () => {
        playerService.playing = !playerService.playing;
        setPlayingMode(playerService.playing);
    }

    const isMainPlayer = () => {
        return playerType === PlayerTypes.Main;
    }

    const renderIcon = (icon: object) => {
        const size = isMainPlayer() ? LARGE_ICON : SMALL_ICON;

        return <Icon icon={ icon } width={ size } height={ size }/>;
    }

    return (
        <button 
            className='play-button'
            aria-label='Play radio button'
            onClick={ togglePlayingMode }
        >
            { playing ? renderIcon(pauseIcon) : renderIcon(playIcon) }
        </button>
    );
}

export default PlayButton;