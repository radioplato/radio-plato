import React, { useEffect, useState } from 'react'

import moment from 'moment';

import { scheduleService } from '../../services/ScheduleService';

import ScheduleLine from '../schedule-line/ScheduleLineComponent'
import { withScroll } from '../../../wrappers/scrollable/Scrollable';
import { withSeo } from '../../../wrappers/seo/Seo';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';
import { ScheduleCard } from '../../models/schedule';
import { BASIC_SEO_IMG } from '../../../constants';

import './ScheduleComponent.scss'
import { playerService } from '../../../player/services/PlayerService';
import { NowPlayingInformation } from '../../../player/models';


const DAYS_OF_WEEK = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
];

function ScheduleTableComponent() {
    const [schedule, setSchedule] = useState<ScheduleCard[][]>(scheduleService.schedule);
    const [selectedDay, setSelectedDay] = useState<number>(moment().isoWeekday() - 1);
    const [nowPlayingInformation, setNowPlayingInformation] = useState<NowPlayingInformation>(playerService.nowPlaying);

    useEffect(() => {
        const scheduleChangesSubscription = scheduleService.subscribeOnScheduleChanges((schedule: ScheduleCard[][]) => setSchedule(schedule));
        const nowPlayingInformationSubscription = playerService.subscribeOnNowPlayingInformationChanges((information: NowPlayingInformation) => setNowPlayingInformation(information));

        return () => {
            scheduleChangesSubscription?.unsubscribe();
            nowPlayingInformationSubscription?.unsubscribe();
        };
    }, []);

    const scheduleShowlineBuilder = (scheduleCard: ScheduleCard) => {
        const isNow = scheduleCard.azuracastID === nowPlayingInformation?.name
            && moment().isBetween(moment(scheduleCard.startDate), moment(scheduleCard.endDate));

        return (
            <ScheduleLine
                card={scheduleCard}
                isNow={isNow}
                key={`${selectedDay}-${scheduleCard.title}-${scheduleCard.startDate}-${scheduleCard.startTime}`}
            />
        );
    }

    const renderButtons = () => {
        return DAYS_OF_WEEK.map((day, index) => (
            <Button
                key={`${day}-${index}`}
                className={`schedule-day-button ${selectedDay === index ? 'selected' : ''}`}
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.SMALL}
                label={day}
                title={day}
                onClick={() => setSelectedDay(index)}
            ></Button>
        ))
    }

    const renderDailySchedule = () => {
        return schedule.length
            ? schedule[selectedDay].length
                ? schedule[selectedDay].map((playlistShow: ScheduleCard) => scheduleShowlineBuilder(playlistShow))
                : []
            : null;
    }

    return (
        <div className='schedule-container'>
            <div className='schedule-headline-container'>
                <div className='schedule-headline'>
                    <div className='schedule-title'>
                        <p>Schedule</p>
                    </div>
                    <div className='schedule-days'>
                        {renderButtons()}
                    </div>
                </div>
            </div>
            <div>
                {renderDailySchedule()}
            </div>
        </div>
    );
}

const SchedulePageComponent = () => withSeo({
    title: 'Schedule',
    description: 'We broadcast 24/7, here is what you will hear.',
    thumbnail: BASIC_SEO_IMG
}, withScroll(<ScheduleTableComponent />));

export { ScheduleTableComponent, SchedulePageComponent };