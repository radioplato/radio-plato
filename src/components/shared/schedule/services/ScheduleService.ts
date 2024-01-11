import { Subject } from 'rxjs'
import moment from 'moment';

import { ScheduleCard, AzuraScheduleEntry, ScheduleInformationList } from '../models/schedule';
import qs from 'qs';


const DATA_REQUEST_INTERVAL = 14400000;
const CURRENT_SHOW_REFRESH_INTERVAL = 60000;

class ScheduleService {
    private _schedule: ScheduleCard[][] = [ [], [], [], [], [], [], [] ];
    private scheduleSubject: Subject<ScheduleCard[][]>;

    private azuraSchedule: AzuraScheduleEntry[] = [];
    private scheduleInformationList: ScheduleInformationList | null = null;

    constructor () {
        this.scheduleSubject = new Subject();

        this.loadAzuraSchedule()
            .then(() => this.loadScheduleInformation())
            .then(() => this.createSchedule());
    }

    set schedule (schedule: ScheduleCard[][]) {
        this._schedule = schedule;
        this.scheduleSubject.next(schedule);
    }

    get schedule () {
        return this._schedule;
    }

    async loadAzuraSchedule() {
        const currentDate = moment();
        const weekStart = currentDate.clone().startOf('week');
        const weekEnd = currentDate.clone().endOf('week');

        return await fetch(`${process.env.REACT_APP_AZURA_URL}/api/station/1/schedule?start=${weekStart.format('YYYY-MM-DD')}&end=${weekEnd.format('YYYY-MM-DD')}`)
            .then(response => response.json())
            .then(data => {
                this.azuraSchedule = data
                    .sort((a: AzuraScheduleEntry, b: AzuraScheduleEntry) => moment(a.start).valueOf() - moment(b.start).valueOf())
                    .filter((scheduleEntry: AzuraScheduleEntry) => moment(scheduleEntry.start).isBetween(weekStart, weekEnd));
            });
    }

    async loadScheduleInformation() {
        const query = qs.stringify({
            populate: '*',
            pagination: {
                limit: 999
            }
        });

        return await fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/schedules?${query}`)
            .then(response => response.json())
            .then(data => (this.scheduleInformationList = data));
    }

    subscribeOnScheduleChanges (onNext: Function) {
        return this.scheduleSubject.subscribe(data => onNext(data));
    }

    private createSchedule() {
        if (this.azuraSchedule.length) {
            const newSchedule: ScheduleCard[][] = [ [], [], [], [], [], [], [] ];

            this.azuraSchedule.forEach((scheduleEntry) => {
                const weekdayIndex = moment(scheduleEntry.start).isoWeekday();
                const scheduleInformation = this.scheduleInformationList?.data
                    .find((scheduleInformationEntry) => scheduleInformationEntry.attributes.AzuracastID === scheduleEntry.name);

                if (scheduleInformation) {
                    const scheduleCard = {
                        azuracastID: scheduleInformation.attributes.AzuracastID,
                        title: scheduleInformation.attributes.Title,
                        description: scheduleInformation.attributes.Description,
                        link: scheduleInformation.attributes.Show.data
                            ? scheduleInformation.attributes.Show.data.attributes.Slug
                            : null,
                        type: scheduleInformation.attributes.Type,
                        author: scheduleInformation.attributes.Show.data
                            ? scheduleInformation.attributes.Show.data.attributes.Author
                            : null,
                        startDate: scheduleEntry.start,
                        startTime: moment(scheduleEntry.start).format('HH:mm'),
                        endDate: scheduleEntry.end,
                        endTime: moment(scheduleEntry.end).format('HH:mm'),
                        image: {
                            alternativeText: scheduleInformation.attributes.Image.data.attributes.alternativeText,
                            caption: scheduleInformation.attributes.Image.data.attributes.caption,
                            url: scheduleInformation.attributes.Image.data.attributes.url
                        },
                    };

                    newSchedule[weekdayIndex - 1].push(scheduleCard);
                }
            });

            this.schedule = newSchedule;
        }
    }
}

const scheduleService = new ScheduleService();

export { scheduleService };