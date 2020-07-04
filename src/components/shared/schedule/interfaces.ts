import { StrapiObjectDto, CoverDto, SimpleImage } from "../interfaces";


export interface ScheduleDto extends StrapiObjectDto{
    Type: string;
    Hide: boolean;
    Title: string;
    Description: string;
    Link?: string;
    ShowImg?: CoverDto;
    OnAirDateTime: ScheduleDateTimeDto[];
}

export interface ScheduleDateTimeDto extends StrapiObjectDto{
    Periodicity: string;
    StartDate: string;
    StartTime: string;
    EndDate: string;
    EndTime: string;
    Monday?: boolean;
    Tuesday?: boolean;
    Wednesday?: boolean;
    Thursday?: boolean;
    Friday?: boolean;
    Saturday?: boolean;
    Sunday?: boolean;
}

export interface ScheduleShow {
    title: string;
    description: string;
    type: string;
    hide: boolean;
    link?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    periodicity: string;
    weekdays: number[];
    image?: SimpleImage | null;
}
