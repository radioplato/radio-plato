import React from 'react'

import { PlaylistShow } from './interfaces'

import './ScheduleShowline.css'


function ScheduleShowline({
    title,
    description,
    start,
    end 
}: PlaylistShow) {
    const startTime = `${ start.getHours() }:${ start.getMinutes() }`;
    const endTime = `${ end.getHours() }:${ end.getMinutes() }`;
    const interval = `${ startTime } - ${ endTime }`;

    return (
        <div className='show-title-container'>
            <div className='show-date'>
                <p>{ interval }</p>
            </div>
            <div className='show-title'>
                <p>{ title }</p>
            </div>
            <div className='show-desc'>
                <p>{ description }</p>
            </div>
        </div>
    )
  }
  export default ScheduleShowline 