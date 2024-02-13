import React, { MouseEvent } from 'react'

import { Link } from 'react-router-dom';

import { ScheduleCard } from '../../models/schedule'
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../../button/components/Button';

import './ScheduleLineComponent.scss'
import { ICON_KEY } from '../../../icons/icons';

interface ScheduleLineProperties {
    card?: ScheduleCard,
    isNow?: boolean,
    shouldShowEpisodesLink?: boolean,
}

function ScheduleLine({ card, isNow, shouldShowEpisodesLink }: ScheduleLineProperties) {
    const interval = card?.startTime && card?.endTime ? `${card?.startTime} - ${card?.endTime}` : '';
    const showLink = card?.slug ? `shows/${card?.slug}` : null;

    const renderOnAir = () => {
        return (
            <div className='on-air'>
                <span className='red-dot'></span>
                <span className='title'>On Air</span>
            </div>
        );
    }

    const onAllEpisodesClick = (event: MouseEvent) => {
        event.stopPropagation();
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
                            </div>
                        )
                    }
                    <div className='title'>{card?.title ? card?.title : ''}</div>
                    <div className='type'>{`${card?.type ? card?.type : ''} ${card?.author ? 'by ' + card?.author : ''}`}</div>
                    <div className='description'>{card?.description ? card?.description : ''}</div>
                </div>
                {
                    shouldShowEpisodesLink && card?.link
                        ? (
                            <div className='episodes-link-container'>
                                <Button
                                    className='episodes-link-button'
                                    href={card?.link}
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.SMALL}
                                    icon={ICON_KEY.ARROW_DIAGONAL_REGULAR}
                                    iconPosition={ICON_POSITION.RIGHT}
                                    label='All episodes'
                                    title='check recorded episodes'
                                    onClick={(event: MouseEvent) => onAllEpisodesClick(event)}
                                />
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    );

    return showLink ? (<Link className='schedule-line-wrapper' to={showLink}>{content}</Link>) : (<div className='schedule-line-wrapper'>{content}</div>);
}

export default ScheduleLine 