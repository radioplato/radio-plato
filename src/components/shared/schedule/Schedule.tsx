import React, { Component } from 'react'
import { Subscription } from 'rxjs';
import moment from 'moment';

import ScheduleShowline from './ScheduleShowline'

import { scheduleService } from './ScheduleService';

import { ScheduleShow } from './interfaces';
import { IndexesOfDay } from './enums';
import './Schedule.css'


const DAYS_OF_WEEK = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
];

const SCHEDULE = "SCHEDULE";

class Schedule extends Component {
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
            />
        );
    }

    selectDay = (day: IndexesOfDay) => {
        this.setState({
            selectedDay: day
        });
    };

    renderButtons = () => {
        const { selectedDay } = this.state;

        return DAYS_OF_WEEK.map((day, index) => (
            <button className={ `schedule-day-button ${ selectedDay === index ? "active" : ""}` }
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
            <div className='schedule-container'>
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
  
export default Schedule