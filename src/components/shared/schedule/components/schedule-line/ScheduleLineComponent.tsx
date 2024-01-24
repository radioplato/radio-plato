import React from 'react'

import { Link } from 'react-router-dom';

import { ScheduleCard } from '../../models/schedule'

import './ScheduleLineComponent.scss'


interface ScheduleLineProperties {
    card?: ScheduleCard,
    isNow?: boolean
}

function ScheduleLine({card, isNow }: ScheduleLineProperties) {
    const interval = card?.startTime && card?.endTime ? `${card?.startTime} - ${card?.endTime}` : '';
    const href = card?.link ? card?.link : null;

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
                    {card && isNow && renderOnAir()}
                    <div
                        className='image'
                        style={{
                            backgroundImage: card?.image ? `url(${card?.image.url})` : '',
                        }}
                    ></div>
                </div>
                <div className='information-container'>
                    {
                        (interval || card?.periodicity) && (
                            <div className='time'>
                                {
                                    interval && (<span className='interval'>{interval}</span>)
                                }
                                {
                                    card?.periodicity && (<span className='periodicity'>{card?.periodicity}</span>)
                                }
                                <span className='utc'>UTC+3</span>
                            </div>
                        )
                    }
                    <div className='title'>{card?.title ? card?.title : ''}</div>
                    <div className='type'>{`${card?.type ? card?.type : ''} ${card?.author ? 'by ' + card?.author : ''}`}</div>
                    <div className='description'>{card?.description ? card?.description : ''}</div>
                </div>
            </div>
        </div>
    );

    return href ? (<Link className='schedule-line-wrapper' to={href}>{content}</Link>) : (<div className='schedule-line-wrapper'>{content}</div>);
}

export default ScheduleLine 