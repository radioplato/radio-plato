import React, { HTMLAttributes } from 'react'

import { Button, BUTTON_TYPE, BUTTON_SIZE } from '../../../button/components/Button';

import './StreamLinksComponent.scss'

const M3U = 'https://azura.radioplato.by/public/1/playlist.m3u'
const PLS = 'https://azura.radioplato.by/public/1/playlist.pls'

function StreamLinks({
    className
}: HTMLAttributes<HTMLElement>) {
    return (
        <div className={`${className} stream-links-container`}>
            <Button
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.SMALL}
                label='m3u'
                title={`'.m3u' playlist file`}
                href={M3U}
            ></Button>
            <div className='link-separator'></div>
            <Button
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.SMALL}
                label='pls'
                title={`'.pls' playlist file`}
                href={PLS}
            ></Button>
        </div>
    );
}

export default StreamLinks;