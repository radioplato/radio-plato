import { Subject } from 'rxjs'
import moment from 'moment';

import { ScheduleShow, ScheduleDto } from './interfaces';
import { IndexesOfDay } from './enums';


const DATA_REQUEST_INTERVAL = 14400000;
const CURRENT_SHOW_REFRESH_INTERVAL = 300000;

enum PeriodicityTypes {
    SingleTime = 'SingleTime',
    Daily = 'Daily',
    Weekly = 'Weekly',
    BiWeekly = 'BiWeekly',
    EveryThirdWeek = 'Every3rdWeek',
    Monthly = 'Monthly'
}

const indexByDayName = new Map([
    [ 'Monday', IndexesOfDay.Monday ],
    [ 'Tuesday', IndexesOfDay.Tuesday ],
    [ 'Wednesday', IndexesOfDay.Wednesday ],
    [ 'Thursday', IndexesOfDay.Thursday ],
    [ 'Friday', IndexesOfDay.Friday ],
    [ 'Saturday', IndexesOfDay.Saturday ],
    [ 'Sunday', IndexesOfDay.Sunday ],
]);

class ScheduleService {
    private _schedule: ScheduleShow[][] = [ [], [], [], [], [], [], [] ];
    private _currentShow: ScheduleShow | undefined;
    private scheduleSubject: Subject<ScheduleShow[][]>;
    private currentShowSubject: Subject<ScheduleShow>;

    constructor () {
        this.scheduleSubject = new Subject();
        this.currentShowSubject = new Subject();

        this.fetchSchedules();
        this.updateCurrentShow();
        setInterval(this.fetchSchedules.bind(this), DATA_REQUEST_INTERVAL);
        setInterval(this.updateCurrentShow.bind(this), CURRENT_SHOW_REFRESH_INTERVAL);
    }

    set schedule (schedule: ScheduleShow[][]) {
        this._schedule = schedule;
        this.scheduleSubject.next(schedule);
    }

    get schedule () {
        return this._schedule;
    }

    get currentShow () {
        return this._currentShow;
    }

    set currentShow (show: ScheduleShow | undefined) {
        this._currentShow = show;
        this.currentShowSubject.next(show)
    }

    updateCurrentShow () {
        const weekday = moment().isoWeekday() - 1;
        const currentDate = new Date().toISOString().substr(0, 10);
        const start = (showline: ScheduleShow) => moment(`${ currentDate } ${ showline.startTime }`);
        const end = (showline: ScheduleShow) => moment(`${ currentDate } ${ showline.endTime }`);

        this._currentShow = this.schedule[weekday].find(showline => {
            return showline.type === 'Show' && moment().isBetween(start(showline), end(showline));
        });
    }

    async fetchSchedules () {
        await fetch(`${ process.env.REACT_APP_BACKEND_URL }/schedules`)
            .then(response => response.json())
            .then(data => [].concat(...data.map((datum: ScheduleDto) => this.parseScheduleLine(datum))))
            .then(scheduleShows => this.organizeSchedule(scheduleShows));
    }

    subscribeOnScheduleChanges (onNext: Function) {
        return this.scheduleSubject.subscribe(data => onNext(data));
    }

    subscribeOnCurrentShowChanges (onNext: Function) {
        return this.currentShowSubject.subscribe(data => onNext(data));
    }

    private parseScheduleLine (dto: ScheduleDto): ScheduleShow[] {
        return dto.OnAirDateTime.map(onAirDateTime => {
            const weekdays = [];

            for (const [ key, value ] of Object.entries(onAirDateTime)) {
                const dayIndex = indexByDayName.get(key);
                
                value && dayIndex !== undefined && weekdays.push(dayIndex);
            }
    
            return {
                title: dto.Title,
                description: dto.Description,
                type: dto.Type,
                hide: dto.Hide,
                link: dto.Link,
                startDate: onAirDateTime.StartDate,
                startTime: onAirDateTime.StartTime,
                endDate: onAirDateTime.EndDate,
                endTime: onAirDateTime.EndTime,
                periodicity: onAirDateTime.Periodicity,
                weekdays,
                image: dto ? {
                    alternativeText: dto.ShowImg?.alternativeText,
                    caption: dto.ShowImg?.caption,
                    url: dto.ShowImg?.url
                } : null
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