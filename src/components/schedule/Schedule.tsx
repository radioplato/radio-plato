import React, { Component } from 'react'
import moment from 'moment';

import ScheduleShowline from './ScheduleShowline'
import { ScheduleShow, ScheduleDto } from './interfaces';
import { BACKEND_URL } from '../shared/constants';
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

enum PeriodicityTypes {
    SingleTime = "SingleTime",
    Daily = "Daily",
    Weekly = "Weekly",
    BiWeekly = "BiWeekly",
    EveryThirdWeek = "Every3rdWeek",
    Monthly = "Monthly"
}

const indexByDayName = new Map([
    [ "Monday", IndexesOfDay.Monday ],
    [ "Tuesday", IndexesOfDay.Tuesday ],
    [ "Wednesday", IndexesOfDay.Wednesday ],
    [ "Thursday", IndexesOfDay.Thursday ],
    [ "Friday", IndexesOfDay.Friday ],
    [ "Saturday", IndexesOfDay.Saturday ],
    [ "Sunday", IndexesOfDay.Sunday ],
]);

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
        schedule: [ [], [], [], [], [], [], [] ],
        dailySchedule: [],
        selectedDay: null
    };

    scheduleShowlineBuilder = (showline: ScheduleShow) => {
        return (
            <ScheduleShowline 
                showline={ showline }
            />
        );
    }

    async componentDidMount () {
        await this.fetchSchedules();
        this.selectDay(moment().isoWeekday() - 1);
    }

    async fetchSchedules () {
        await fetch(`${ BACKEND_URL }/schedules`)
            .then(response => response.json())
            .then(data => [].concat(...data.map((datum: ScheduleDto) => this.parseScheduleLine(datum))))
            .then(scheduleShows => this.organizeSchedule(scheduleShows));
    }

    parseScheduleLine (scheduleDto: ScheduleDto): ScheduleShow[] {
        return scheduleDto.OnAirDateTime.map(onAirDateTime => {
            const weekdays = [];

            for (const [ key, value ] of Object.entries(onAirDateTime)) {
                const dayIndex = indexByDayName.get(key);
                
                value && dayIndex !== undefined && weekdays.push(dayIndex);
            }
    
            return {
                title: scheduleDto.Title,
                description: scheduleDto.Description,
                type: scheduleDto.Type,
                hide: scheduleDto.Hide,
                link: scheduleDto.Link,
                startDate: onAirDateTime.StartDate,
                startTime: onAirDateTime.StartTime,
                endDate: onAirDateTime.EndDate,
                endTime: onAirDateTime.EndTime,
                periodicity: onAirDateTime.Periodicity,
                weekdays
            };
        });
    }

    organizeSchedule (scheduleShows: ScheduleShow[]) {
        const schedule: ScheduleShow[][]  = [];

        for (let day = IndexesOfDay.Monday; day <= IndexesOfDay.Sunday; day++) {
            schedule[day] = [];

            scheduleShows.forEach(show => {
                this.shouldShowBeOnAir(show, day) && schedule[day].push(show)
            });

            schedule[day].sort(this.sortShowsByDate);
        }

        this.setState({
            schedule
        });
    }

    sortShowsByDate (first: ScheduleShow, second: ScheduleShow) {
        return +first.startTime.slice(0, 2) - +second.startTime.slice(0, 2);
    }

    shouldShowBeOnAir (show: ScheduleShow, day: IndexesOfDay): boolean {
        if (show.hide) {
            return false;
        }

        const showStartDate = moment(show.startDate);
        const dateOfDay = moment().add(moment().isoWeekday() - day + 1, 'days');
        const weeksPassed = +(moment().week() - showStartDate.week());

        switch (show.periodicity) {
            case PeriodicityTypes.Daily: 
                return show.weekdays.includes(day);
            case PeriodicityTypes.Weekly:
                return show.weekdays.includes(day);
            case PeriodicityTypes.BiWeekly:
                return show.weekdays.includes(day) && weeksPassed % 2 === 0;
            case PeriodicityTypes.EveryThirdWeek:
                return show.weekdays.includes(day) && weeksPassed % 3 === 0;
            case PeriodicityTypes.SingleTime:
                return showStartDate.startOf('day').isSame(dateOfDay.startOf('day'));
            default: return false;
        }
    }

    showDay = (day: IndexesOfDay) => {
        const { schedule } = this.state;

        return schedule[day].length ?
            schedule[day].map((playlistShow: ScheduleShow) => this.scheduleShowlineBuilder(playlistShow)) :
            [];
    };

    selectDay = (day: IndexesOfDay) => {
        this.setState({
            selectedDay: day,
            dailySchedule: this.showDay(day)
        });
    };

    renderButtons = () => {
        const { selectedDay } = this.state;

        return DAYS_OF_WEEK.map((day, index) => (
            <button className={ `schedule-day-button ${ selectedDay === index ? "active" : ""}` }
                    onClick={ () => this.selectDay(index) }
            >
                { day }
            </button>
        ))
    }

    render () {
        const { dailySchedule } = this.state;

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
                    { dailySchedule }
                </div>
            </div>
        )
    }
}
  
export default Schedule