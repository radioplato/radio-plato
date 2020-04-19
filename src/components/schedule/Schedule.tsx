import React, { Component } from 'react'
import moment from 'moment';


import ScheduleShowline from './ScheduleShowline'
import { PlaylistShow } from './interfaces';
import { DATA } from './constants';
import './Schedule.css'


enum IndexesOfDay {
    Monday = 0,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};

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
    state = {
        schedule: [],
        today: IndexesOfDay.Monday
    };

    scheduleShowlineBuilder = (showline: PlaylistShow) => {
        const {
            title,
            description,
            start,
            end
        } = showline;

        return (
            <ScheduleShowline 
                title={ title }
                description={ description }
                start={ start }
                end={ end }
            />
        );
    }

    componentDidMount () {
        this.selectDay(moment().isoWeekday() - 1);
    }

    showDay = (day: IndexesOfDay) => {
        return DATA[day].map((playlistShow: PlaylistShow) => this.scheduleShowlineBuilder(playlistShow));
    };

    selectDay = (day: IndexesOfDay) => {
        this.setState({
            schedule: this.showDay(day)
        });
    };

    renderButtons = () => {
        return DAYS_OF_WEEK.map((day, index) => (
            <button className='schedule-day-button' onClick={ () => this.selectDay(index) }>
                { day }
            </button>
        ))
    }

    render () {
        const {
            schedule
        } = this.state;

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
                    { schedule }
                </div>
            </div>
        )
    }
}
  
export default Schedule