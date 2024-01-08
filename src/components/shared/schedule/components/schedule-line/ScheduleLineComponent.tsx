import moment from 'moment';
import React from 'react'

import { Link } from 'react-router-dom';

import { ScheduleCard } from '../../models/schedule'

import './ScheduleLineComponent.scss'


interface ScheduleLineProperties {
    scheduleCard: ScheduleCard,
    selectedDay: number
}

const FORMAT = 'HH:mm';

function scheduleCardWrapper(scheduleCard: ScheduleCard, selectedDay: number) {
    const {
        title,
        description,
        link,
        startTime,
        endTime
    } = scheduleCard;
    const interval = startTime && endTime ? `${startTime} - ${endTime}` : '';
    const href = link ? link : null;
    const isNow = moment().isoWeekday() - 1 === selectedDay && moment(moment().format(FORMAT), FORMAT).isBetween(moment(startTime, FORMAT), moment(endTime, FORMAT));

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
                    { isNow && renderOnAir() }
                    <div
                        className='image'
                        style={{
                            backgroundImage: scheduleCard.image ? `url(${scheduleCard.image.url})` : '',
                        }}
                    ></div>
                </div>
                <div className='information-container'>
                    <div className='time'>
                        <span className='interval'>{interval}</span>
                        <span className='utc'>UTC+3</span>
                    </div>
                    <div className='title'>{title ? title : ''}</div>
                    <div className='description'>{description ? description : ''}</div>
                </div>
            </div>
        </div>
    );

    return href ? (<Link to={href}>{content}</Link>) : (<div>{content}</div>);
}

const ScheduleLine = ({ scheduleCard, selectedDay }: ScheduleLineProperties) => scheduleCardWrapper(scheduleCard, selectedDay);

export default ScheduleLine 