import moment from 'moment';
import React from 'react'

import { Link } from 'react-router-dom';

import { ScheduleCard } from '../../models/schedule'

import './ScheduleLineComponent.scss'


interface ScheduleLineProperties {
    scheduleCard: ScheduleCard,
    isNow?: boolean
}

function scheduleCardWrapper(scheduleCard: ScheduleCard, isNow = false) {
    const {
        title,
        description,
        type,
        link,
        author,
        startTime,
        endTime,
        periodicity
    } = scheduleCard;
    const interval = startTime && endTime ? `${startTime} - ${endTime}` : '';
    const href = link ? link : null;

    const renderOnAir = () => {
        return (
            <div className='on-air'>
                <span className='red-dot'></span>
                <span className='title'>On Air</span>
            </div>
        );
    }

    const content = (
        <div className='schedule-line-container'>
            <div className='schedule-line'>
                <div className='visual-container'>
                    {isNow && renderOnAir()}
                    <div
                        className='image'
                        style={{
                            backgroundImage: scheduleCard.image ? `url(${scheduleCard.image.url})` : '',
                        }}
                    ></div>
                </div>
                <div className='information-container'>
                    {
                        (interval || periodicity) && (
                            <div className='time'>
                                {
                                    interval && (<span className='interval'>{interval}</span>)
                                }
                                {
                                    periodicity && (<span className='periodicity'>{periodicity}</span>)
                                }
                                <span className='utc'>UTC+3</span>
                            </div>
                        )
                    }
                    <div className='title'>{title ? title : ''}</div>
                    <div className='type'>{`${type} ` + `${author ? 'by ' + author : ''}`}</div>
                    <div className='description'>{description ? description : ''}</div>
                </div>
            </div>
        </div>
    );

    return href ? (<Link to={href}>{content}</Link>) : (<div>{content}</div>);
}

const ScheduleLine = ({ scheduleCard, isNow }: ScheduleLineProperties) => scheduleCardWrapper(scheduleCard, isNow);

export default ScheduleLine 