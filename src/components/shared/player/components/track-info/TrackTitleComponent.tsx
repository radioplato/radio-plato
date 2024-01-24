import React, { HTMLAttributes, useEffect, useState } from 'react'

import { playerService } from '../../services/PlayerService';

import { PLAYER_CONNECTING, PLAYER_COPIED } from '../../constants';
import { TrackInformation } from '../../models';

import './TrackTitleComponent.scss'

const copyToClipboard = (text: string) => {
    const dummy = document.createElement('textarea');

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
};

interface TrackTitleProperties extends HTMLAttributes<HTMLElement> {
    isTicker?: boolean;
    showOnAir?: boolean;
}

function TrackTitle({
    isTicker,
    showOnAir,
    className
}: TrackTitleProperties) {
    const [trackName, setTrackName] = useState(playerService.trackName);

    useEffect(() => {
        const subscription = playerService.subscribeOnTrackInformationChanges((data: TrackInformation) => {
            const tracktitle = document.querySelector('.track-name-container');

            tracktitle?.classList.remove('shown')
            tracktitle?.classList.add('hidden');

            setTimeout(() => {
                tracktitle?.classList.add('shown');
                setTrackName(data.name);
            }, 1000)
            setTimeout(() => tracktitle?.classList.remove('hidden'), 2000);
        });

        return () => subscription?.unsubscribe();
    }, []);

    const handleTrackTitleClick = () => {
        const memoizedTrackName = trackName;

        copyToClipboard(trackName);
        setTrackName(PLAYER_COPIED);
        setTimeout(() => setTrackName(memoizedTrackName), 1000)
    }

    const renderTicker = () => {
        return (
            <div className='ticker-wrapper'>
                <div className='ticker'>
                    <span className='first-set'>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                    </span>
                    <span className='second-set'>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                        <span className='item'>{trackName}</span>
                    </span>
                </div>
                <div className='ticker-overlay' onClick={handleTrackTitleClick}></div>
            </div>
        );
    }

    const renderStatic = () => {
        return (
            <div className='static-name'>{trackName}</div>
        )
    }

    return (
        <div className={`track-information-container ${className}`}>
            {
                showOnAir
                    ? (
                        <div className='on-air'>
                            <span className='red-dot'></span>
                            <span className='title'>On Air</span>
                        </div>
                    )
                    : null
            }

            <div className='track-name-container'>
                {
                    isTicker
                        && trackName !== PLAYER_CONNECTING
                        && trackName !== PLAYER_COPIED
                        ? renderTicker()
                        : renderStatic()
                }
            </div>
        </div>
    );
}

export default TrackTitle;