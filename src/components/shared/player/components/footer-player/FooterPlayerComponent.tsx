import React, { RefObject, useEffect, useState } from 'react';

import moment from 'moment';

import { isMobileOnly } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

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

        return () => {
            scheduleChangesSubscription?.unsubscribe();
            trackInformationSubscription?.unsubscribe();
            nowPlayingInformationSubscription?.unsubscribe();
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

    const togglePlayingMode = () => {
        playerService.playing = !playerService.playing;

        setPlaying(playerService.playing);
    }

    const togglePanel = () => {
        document.querySelector('.header-container.mobile')?.classList.toggle('bring-back');
        panelRef.current?.classList.toggle('full');
    }

    return (
        <div className='player'>
            <div ref={panelRef} className='main-panel' style={{
                backgroundImage: `url(${trackArt})`,
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
                    <div className='track-art-container'>
                        <div
                            className='track-art'
                            style={{
                                backgroundImage: `url(${trackArt})`,
                            }}
                            onClick={togglePanel}
                        >
                        </div>
                    </div>
                    <TrackTitle className='track-title-component' isTicker={false} showOnAir={false} />
                    <Button
                        className='play-button'
                        type={BUTTON_TYPE.OUTLINE}
                        size={BUTTON_SIZE.ENORMOUS}
                        icon={playing ? ICON_KEY.PAUSE_FILLED : ICON_KEY.PLAY_FILLED}
                        title={playing ? 'pause' : 'play'}
                        onClick={togglePlayingMode}
                    />
                    <ScheduleLine card={scheduleCard} isNow={true} />
                </div>
            </div>
            <div className='footer-panel'>
                <div
                    className='track-art'
                    style={{
                        backgroundImage: `url(${trackArt})`,
                    }}
                    onClick={togglePanel}
                ></div>
                <TrackTitle className='track-title-component' isTicker={true} showOnAir={true} />
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
    );
}

export default FooterPlayerComponent;
