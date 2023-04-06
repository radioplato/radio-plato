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
    scheduleSubscription: Subscription | null = null;
    currentShowSubscription: Subscription | null = null;
    state = {
        schedule: scheduleService.schedule,
        selectedDay: moment().isoWeekday() - 1
    };

    componentDidMount () {
        this.subscribeOnScheduleChanges();
        this.subscribeOnCurrentShowChanges();
    }

    subscribeOnScheduleChanges () {
        this.scheduleSubscription = scheduleService.subscribeOnScheduleChanges(
            (schedule: ScheduleShow[][]) => this.setState({ schedule })
        );
    }

    subscribeOnCurrentShowChanges () {
        this.currentShowSubscription = scheduleService.subscribeOnCurrentShowChanges(
            () => this.setState(this.state)
        );
    }

    scheduleShowlineBuilder = (showline: ScheduleShow) => {
        return (
            <ScheduleShowline
                showline={ showline }
                selectedDay={ this.state.selectedDay }
                key={ `${ this.state.selectedDay }-${ showline.title }-${ showline.startDate }-${ showline.startTime }` }
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

    componentWillUnmount () {
        this.scheduleSubscription?.unsubscribe();
        this.currentShowSubscription?.unsubscribe();
    }

    renderDropdown = () => {
        const { selectedDay } = this.state;

        return (
            <select value={ selectedDay } onChange={ this.handleDropdownChoise }> 
                { DAYS_OF_WEEK.map((day, index) => (
                    <option key={ `${ day.toLowerCase() }-${ index }` }
                            value={ index }
                    >
                        { day }
                    </option>
                )) }
            </select>
        )
    }

    renderButtons = () => {
        const { selectedDay } = this.state;

        return DAYS_OF_WEEK.map((day, index) => (
            <button className={ `schedule-day-button ${ selectedDay === index ? 'active' : ''}` }
                    onClick={ () => this.selectDay(index) }
                    key={ `${ day.toLowerCase() }-${ index }` }
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
                        <p className='utc'>UTC+3</p>
                    </div>
                    {
                        isMobileOnly
                            ? (<div>
                                { this.renderDropdown() }
                            </div>)
                            : (<div className='schedule-day'>
                                { this.renderButtons() }
                            </div>)
                    }
                    
                    
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