import React from 'react'

import { BrowserView, isMobileOnly } from 'react-device-detect';
import { Link } from 'react-router-dom';

import { ScheduleShow } from './interfaces'

import './ScheduleShowline.css'


interface ScheduleShowlineProperties {
    showline: ScheduleShow
}

function showlineWrapper (showline: ScheduleShow) {
    const {
        title,
        description,
        link,
        startTime,
        endTime
    } = showline;
    const interval = startTime && endTime ? `${ startTime.slice(0, 5) } - ${ endTime.slice(0, 5) }` : '';
    const href = link ? link : null;

    const content = (
        <div className={ `show-title-container ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
            <div className='show-date'>
                <p>{ interval }</p>
            </div>
            <div className='show-title'>
                <p>{ title ? title : '' }</p>
            </div>
            <BrowserView>
                <div className='show-desc'>
                    <p>{ description ? description : '' }</p>
                </div>
            </BrowserView>
        </div>
    );

    return href ? (<Link to={ href }>{ content }</Link>) : (<div>{ content }</div>);
}

const ScheduleShowline = ({ showline }: ScheduleShowlineProperties) => showlineWrapper(showline);

export default ScheduleShowline 