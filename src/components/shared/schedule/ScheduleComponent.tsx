import React, { Component } from 'react'

import { Subscription } from 'rxjs';

import { isMobileOnly } from 'react-device-detect';

import moment from 'moment';

import ScheduleShowline from './ScheduleShowline'

import { scheduleService } from './ScheduleService';

import { ScheduleShow } from './interfaces';
import { IndexesOfDay } from './enums';

import { withSeo } from '../wrappers/seo/Seo'
import { withScroll } from '../wrappers/scrollable/Scrollable';
import { BASIC_SEO_IMG } from '../../shared/constants';
import './ScheduleComponent.css'


const DAYS_OF_WEEK = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
];

const SCHEDULE = 'SCHEDULE';
const SCHEDULE_SEO_TITLE = 'Schedule'
const SCHEDULE_SEO_DESCRIPTION = 'We broadcast 24/7, here is what you will hear.'

class ScheduleComponent extends Component {
    subscription: Subscription | null = null;
    state = {
        schedule: scheduleService.schedule,
        selectedDay: moment().isoWeekday() - 1
    };

    componentDidMount () {
        this.subscribeOnScheduleChange();
    }

    subscribeOnScheduleChange () {
        this.subscription = scheduleService.subscribeOnScheduleChanges(
            (schedule: ScheduleShow[][]) => this.setState({ schedule })
        );
    }

    scheduleShowlineBuilder = (showline: ScheduleShow) => {
        return (
            <ScheduleShowline 
                showline={ showline }
                key={ `${ showline.title }-${ showline.startDate }-${ showline.endDate }` }
            />
        );
    }

    selectDay = (day: IndexesOfDay) => {
        this.setState({
            selectedDay: day
        });
    };

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    renderButtons = () => {
        const { selectedDay } = this.state;

        return DAYS_OF_WEEK.map((day, index) => (
            <button className={ `schedule-day-button ${ selectedDay === index ? 'active' : ''}` }
                    onClick={ () => this.selectDay(index) }
                    key={ `${ day.toLowerCase() }-${ index }`}
            >
                { day }
            </button>
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

    render () {
        return (
            <div className={ `schedule-container ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <div className='schedule-headline-container'>        
                    <div className='schedule-title'>
                        <p>{ SCHEDULE }</p>
                    </div>
                    <div className='schedule-day'>
                        { this.renderButtons() }
                    </div>
                </div>
                <div>
                    { this.renderDailySchedule() }
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