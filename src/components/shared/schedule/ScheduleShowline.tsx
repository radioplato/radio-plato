import React from 'react'

import { BrowserView, isMobile } from 'react-device-detect';

import { ScheduleShow } from './interfaces'

import './ScheduleShowline.css'


interface ScheduleShowlineProperties {
    showline: ScheduleShow
}

function ScheduleShowline({ showline }: ScheduleShowlineProperties) {
    const {
        title,
        description,
        link,
        startTime,
        endTime
    } = showline;
    const interval = startTime && endTime ? `${ startTime.slice(0, 5) } - ${ endTime.slice(0, 5) }` : '';
    const href = link ? link : '';
    const className = `show-title-container ${ isMobile ? 'mobile' : 'desktop' }`;

    return (
        <a href={ href }>
            <div className={ className }>
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
        </a>
    )
  }
  export default ScheduleShowline 