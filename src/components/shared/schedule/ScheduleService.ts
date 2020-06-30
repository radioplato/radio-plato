import { Subject } from 'rxjs'
import moment from 'moment';

import { ScheduleShow, ScheduleDto } from "./interfaces";
import { IndexesOfDay } from "./enums";
import { BACKEND_URL } from "../constants";

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

class ScheduleService {
    private _schedule: ScheduleShow[][] = [ [], [], [], [], [], [], [] ];
    private scheduleSubject: Subject<ScheduleShow[][]>;

    constructor () {
        this.scheduleSubject = new Subject();

        this.fetchSchedules();
    }

    set schedule (schedule: ScheduleShow[][]) {
        this._schedule = schedule;
        this.scheduleSubject.next(this.schedule);
    }

    get schedule () {
        return this._schedule;
    }

    async fetchSchedules () {
        await fetch(`${ BACKEND_URL }/schedules`)
            .then(response => response.json())
            .then(data => [].concat(...data.map((datum: ScheduleDto) => this.parseScheduleLine(datum))))
            .then(scheduleShows => this.organizeSchedule(scheduleShows));
    }

    subscribeOnScheduleChanges (onNext: Function) {
        return this.scheduleSubject.subscribe(data => onNext(data));
    }

    private parseScheduleLine (scheduleDto: ScheduleDto): ScheduleShow[] {
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

    private organizeSchedule (scheduleShows: ScheduleShow[]) {
        const schedule: ScheduleShow[][]  = [];

        for (let day = IndexesOfDay.Monday; day <= IndexesOfDay.Sunday; day++) {
            schedule[day] = [];

            scheduleShows.forEach(show => {
                this.shouldShowBeOnAir(show, day) && schedule[day].push(show)
            });

            schedule[day].sort(this.sortShowsByDate);
        }

        this.schedule = schedule;
    }

    private sortShowsByDate (first: ScheduleShow, second: ScheduleShow) {
        return +first.startTime.slice(0, 2) - +second.startTime.slice(0, 2);
    }

    private shouldShowBeOnAir (show: ScheduleShow, day: IndexesOfDay): boolean {
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
}

const scheduleService = new ScheduleService();

export { scheduleService };