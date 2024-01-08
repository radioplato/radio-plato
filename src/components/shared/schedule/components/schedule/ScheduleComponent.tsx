import React, { useEffect, useState } from 'react'

import { isMobileOnly } from 'react-device-detect';

import { scheduleService } from '../../services/ScheduleService';

import ScheduleLine from '../schedule-line/ScheduleLineComponent'
import { withScroll } from '../../../wrappers/scrollable/Scrollable';
import { withSeo } from '../../../wrappers/seo/Seo';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';
import { ScheduleCard } from '../../models/schedule';
import { BASIC_SEO_IMG } from '../../../constants';

import './ScheduleComponent.scss'


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
    const [selectedDay, setSelectedDay] = useState<number>(0);

    useEffect(() => {
        const subscription = scheduleService.subscribeOnScheduleChanges((schedule: ScheduleCard[][]) => setSchedule(schedule));

        return () => subscription?.unsubscribe();
    }, []);

    const scheduleShowlineBuilder = (scheduleCard: ScheduleCard) => {
        return (
            <ScheduleLine
                scheduleCard={scheduleCard}
                selectedDay={selectedDay}
                key={`${selectedDay}-${scheduleCard.title}-${scheduleCard.startDate}-${scheduleCard.startTime}`}
            />
        );
    }

    const renderDropdown = () => {
        return (
            <select className='schedule-day-dropdown' value={selectedDay} onChange={(event) => setSelectedDay(Number(event.currentTarget.value))}>
                {
                    DAYS_OF_WEEK.map((day, index) => (
                        <option key={`${day.toLowerCase()}-${index}`}
                            value={index}
                        >
                            {day}
                        </option>
                    ))
                }
            </select>
        )
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
        return schedule.length && schedule[selectedDay].length
            ? schedule[selectedDay].map((playlistShow: ScheduleCard) => scheduleShowlineBuilder(playlistShow))
            : [];
    }

    return (
        <div className={`schedule-container ${isMobileOnly ? 'mobile' : 'desktop'}`}>
            <div className='schedule-headline-container'>
                <div className='schedule-headline'>
                    <div className='schedule-title'>
                        <p>Schedule</p>
                    </div>
                    {
                        isMobileOnly
                            ? (
                                <div>
                                    {renderDropdown()}
                                </div>
                            )
                            : (
                                <div className='schedule-days'>
                                    {renderButtons()}
                                </div>
                            )
                    }
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