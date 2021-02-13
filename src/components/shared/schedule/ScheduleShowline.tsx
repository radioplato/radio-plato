import moment from 'moment';
import React from 'react'

import { BrowserView, isMobileOnly } from 'react-device-detect';
import { Link } from 'react-router-dom';

import { ScheduleShow } from './interfaces'

import './ScheduleShowline.css'


interface ScheduleShowlineProperties {
    showline: ScheduleShow,
    selectedDay: number
}

const FORMAT = 'HH:mm:ss';

function showlineWrapper (showline: ScheduleShow, selectedDay: number) {
    const {
        title,
        description,
        link,
        startTime,
        endTime
    } = showline;
    const interval = startTime && endTime ? `${ startTime.slice(0, 5) } - ${ endTime.slice(0, 5) }` : '';
    const href = link ? link : null;
    const isNow = moment().isoWeekday() - 1 === selectedDay && moment(moment().format(FORMAT), FORMAT).isBetween(moment(startTime, FORMAT), moment(endTime, FORMAT));
    const content = (
        <div className={ `show-title-container ${ isMobileOnly ? 'mobile' : 'desktop' } ${ isNow && 'white' }` }>
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

const ScheduleShowline = ({ showline, selectedDay }: ScheduleShowlineProperties) => showlineWrapper(showline, selectedDay);

export default ScheduleShowline 