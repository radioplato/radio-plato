import React, { RefObject, useEffect, useState } from 'react';

import moment from 'moment';

import { isMobileOnly } from 'react-device-detect';
import { Link, useLocation } from 'react-router-dom';

import { playerService } from '../../services/PlayerService';
import { scheduleService } from '../../../schedule/services/ScheduleService';

import TrackTitle from '../track-info/TrackTitleComponent';
import ScheduleLine from '../../../schedule/components/schedule-line/ScheduleLineComponent';

import { NowPlayingInformation, TrackInformation } from '../../models';
import { ScheduleCard } from '../../../schedule/models/schedule';
import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';
import { ICON_KEY } from '../../../icons/icons';

import './FooterPlayerComponent.scss';

function FooterPlayerComponent() {
    const location = useLocation();

    const [schedule, setSchedule] = useState<ScheduleCard[][]>(scheduleService.schedule);
    const [scheduleCard, setScheduleCard] = useState<ScheduleCard | undefined>();
    const [playing, setPlaying] = useState(playerService.playing);
    const [trackArt, setTrackArt] = useState(playerService.trackArt);
    const [nowPlayingInformation, setNowPlayingInformation] = useState<NowPlayingInformation>(playerService.nowPlaying);
    const [currentListeners, setCurrentListeners] = useState<string>(playerService.currentListeners);

    const panelRef: RefObject<HTMLDivElement> = React.createRef();

    useEffect(() => {
        const scheduleChangesSubscription = scheduleService.subscribeOnScheduleChanges((schedule: ScheduleCard[][]) => setSchedule(schedule));
        const trackInformationSubscription = playerService.subscribeOnTrackInformationChanges((information: TrackInformation) => {
            if (isMobileOnly) {
                setTrackArt(information.art);
            } else {
                const tracktitle = document.querySelector('p.track-title');

                tracktitle?.classList.remove('shown')
                tracktitle?.classList.add('hidden');

                setTimeout(() => {
                    tracktitle?.classList.add('shown');
                    setTrackArt(information.art);
                }, 1000)
                setTimeout(() => tracktitle?.classList.remove('hidden'), 2000);
            }
        });
        const nowPlayingInformationSubscription = playerService.subscribeOnNowPlayingInformationChanges((information: NowPlayingInformation) => setNowPlayingInformation(information));
        const listenersSubscription = playerService.subscribeOnListenersChanges((listeners: string) => setCurrentListeners(listeners));

        return () => {
            scheduleChangesSubscription?.unsubscribe();
            trackInformationSubscription?.unsubscribe();
            nowPlayingInformationSubscription?.unsubscribe();
            listenersSubscription?.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const weekday = moment().isoWeekday() - 1;

        setScheduleCard(schedule[weekday].find((scheduleCard) =>
            scheduleCard.azuracastID === nowPlayingInformation?.name
            && moment().isBetween(moment(scheduleCard.startDate), moment(scheduleCard.endDate))
        ));
    }, [schedule, nowPlayingInformation]);

    useEffect(() => {
        panelRef.current?.classList.remove('full');
    }, [location]);

    const togglePlayingMode = (event?: React.MouseEvent<Element, MouseEvent>) => {
        if (event) {
            console.log(event);
            event.preventDefault();
            event.stopPropagation();
        }

        playerService.playing = !playerService.playing;

        setPlaying(playerService.playing);
    }

    const togglePanel = () => {
        panelRef.current?.classList.toggle('full');
    }

    return (
        <div className='player'>
            <div ref={panelRef} className='main-panel' style={{
                backgroundImage: `url(${scheduleCard?.image?.url ?? trackArt})`,
            }}>
                <div className='content-container'>
                    <div className='controls-container'>
                        <Button
                            className='fullscreen-button'
                            type={BUTTON_TYPE.GHOST}
                            size={BUTTON_SIZE.LARGE}
                            icon={ICON_KEY.CHEVRON_REGULAR}
                            iconRotate={180}
                            title='minimize player'
                            onClick={togglePanel}
                        />
                    </div>
                    <div className='schedule-information-container'>
                        {
                            scheduleCard?.link
                            ? (
                                <Link className='schedule-title' to={`shows/${scheduleCard?.link}`}>{scheduleCard?.title}</Link>
                            )
                            : (
                                <div className='schedule-title'>{scheduleCard?.title}</div>
                            )
                        }
                        <div className='schedule-type'>{`${scheduleCard?.type ? scheduleCard?.type : ''} ${scheduleCard?.author ? 'by ' + scheduleCard?.author : ''}`}</div>
                    </div>
                    <div className='track-art-container'>
                        <div
                            className='track-art'
                            style={{
                                backgroundImage: `url(${trackArt})`,
                            }}
                        >
                        </div>
                    </div>
                    <TrackTitle className='main-panel-track-title' isTicker={false} showOnAir={false} />
                    <div className='main-panel-footer'>
                        <div className='broadcast-information-container'>
                            <div className='on-air'>
                                <span className='red-dot'></span>
                                <span className='title'>On Air</span>
                            </div>
                            <div className='listeners'>{`Listeners: ${currentListeners}`}</div>
                        </div>
                        <Button
                            className='play-button'
                            type={BUTTON_TYPE.OUTLINE}
                            size={BUTTON_SIZE.LARGE}
                            icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                            title={playing ? `pause` : 'play'}
                            onClick={togglePlayingMode}
                        />
                    </div>
                </div>
            </div>
            <div className='footer-panel' onClick={togglePanel}>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${trackArt})`,
                    }}
                ></div>
                <TrackTitle className='track-title-component' isTicker={true} showOnAir={true} copyNameOnClick={false}/>
                <Button
                    className='play-button'
                    type={BUTTON_TYPE.OUTLINE}
                    size={BUTTON_SIZE.LARGE}
                    icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                    title={playing ? `pause` : 'play'}
                    onClick={(event) => togglePlayingMode(event)}
                />
            </div>
        </div>
    );
}

export default FooterPlayerComponent;
