import React from 'react'

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

    return (
        <a href={ href }>
            <div className='show-title-container'>
                <div className='show-date'>
                    <p>{ interval }</p>
                </div>
                <div className='show-title'>
                    <p>{ title ? title : '' }</p>
                </div>
                <div className='show-desc'>
                    <p>{ description ? description : '' }</p>
                </div>
            </div>
        </a>
    )
  }
  export default ScheduleShowline 