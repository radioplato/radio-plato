import React, { Component } from 'react'

import { Subscription } from 'rxjs';

import { isMobileOnly } from 'react-device-detect';

import moment from 'moment';

import { scheduleService } from '../../ScheduleService';

import ScheduleLine from '../schedule-line/ScheduleLineComponent'
import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';

import { ScheduleShow } from '../../interfaces';
import { IndexesOfDay } from '../../enums';

import { withSeo } from '../../../wrappers/seo/Seo'
import { withScroll } from '../../../wrappers/scrollable/Scrollable';
import { BASIC_SEO_IMG } from '../../../constants';

import './ScheduleComponent.scss'


const DAYS_OF_WEEK = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
];

const SCHEDULE_SEO_TITLE = 'Schedule'
const SCHEDULE_SEO_DESCRIPTION = 'We broadcast 24/7, here is what you will hear.'

class ScheduleComponent extends Component {
    scheduleSubscription: Subscription | null = null;
    currentShowSubscription: Subscription | null = null;
    state = {
        schedule: scheduleService.schedule,
        selectedDay: moment().isoWeekday() - 1
    };

    componentDidMount() {
        this.subscribeOnScheduleChanges();
        this.subscribeOnCurrentShowChanges();
    }

    subscribeOnScheduleChanges() {
        this.scheduleSubscription = scheduleService.subscribeOnScheduleChanges(
            (schedule: ScheduleShow[][]) => this.setState({ schedule })
        );
    }

    subscribeOnCurrentShowChanges() {
        this.currentShowSubscription = scheduleService.subscribeOnCurrentShowChanges(
            () => this.setState(this.state)
        );
    }

    scheduleShowlineBuilder = (showline: ScheduleShow) => {
        return (
            <ScheduleLine
                showline={showline}
                selectedDay={this.state.selectedDay}
                key={`${this.state.selectedDay}-${showline.title}-${showline.startDate}-${showline.startTime}`}
            />
        );
    }

    selectDay = (day: IndexesOfDay) => {
        this.setState({
            selectedDay: day
        });
    };

    handleDropdownChoise = (event: any) => {
        this.selectDay(event.currentTarget.value)
    }

    componentWillUnmount() {
        this.scheduleSubscription?.unsubscribe();
        this.currentShowSubscription?.unsubscribe();
    }

    renderDropdown = () => {
        const { selectedDay } = this.state;

        return (
            <select className='schedule-day-dropdown' value={selectedDay} onChange={this.handleDropdownChoise}>
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

    renderButtons = () => {
        const { selectedDay } = this.state;

        return DAYS_OF_WEEK.map((day, index) => (
            <Button
                key={`${day.toLowerCase()}-${index}`}
                className={`schedule-day-button ${selectedDay === index ? 'selected' : ''}`}
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.SMALL}
                label={day}
                onClick={() => this.selectDay(index)}
            ></Button>
        ))
    }

    renderDailySchedule = () => {
        const {
            schedule,
            selectedDay
        } = this.state;

        return schedule[selectedDay].length ?
            schedule[selectedDay].map((playlistShow: ScheduleShow) => this.scheduleShowlineBuilder(playlistShow)) :
            [];
    }

    render() {
        return (
            <div className={`schedule-container ${isMobileOnly ? 'mobile' : 'desktop'}`}>
                <div className='schedule-headline-container'>
                    <div className='schedule-headline'>
                        <div className='schedule-title'>
                            <p>Schedule</p>
                        </div>
                        {
                            isMobileOnly
                                ? (<div>
                                    {this.renderDropdown()}
                                </div>)
                                : (<div className='schedule-days'>
                                    {this.renderButtons()}
                                </div>)
                        }
                    </div>
                </div>
                <div>
                    {this.renderDailySchedule()}
                </div>
            </div>
        )
    }
}

const SchedulePageComponent = () => withSeo({
    title: SCHEDULE_SEO_TITLE,
    description: SCHEDULE_SEO_DESCRIPTION,
    thumbnail: BASIC_SEO_IMG
}, withScroll(<ScheduleComponent />));

export { ScheduleComponent, SchedulePageComponent };