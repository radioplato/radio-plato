import { ShowEntry } from '../../../shows/models';
import { SimpleImage, StrapiResponse, StrapiImageAttributes, StrapiList } from '../../interfaces';
import { AZURA_SCHEDULE_TYPE } from '../enums';

export interface AzuraScheduleEntry {
    description: string;
    end: string;
    end_timestamp: number;
    id: number;
    is_now: boolean;
    name: string;
    start: string;
    start_timestamp: number;
    title: string;
    type: AZURA_SCHEDULE_TYPE;
}

export interface ScheduleInformationAttributes {
    AzuracastID: string;
    Description: string;
    Episodes?: any[];
    Image: ScheduleInformationImageData;
    Livestream: boolean;
    Show: ShowEntry;
    Title: string;
    Type: string;
}

export type ScheduleInformationImageData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export type ScheduleInformationEntry = StrapiResponse<ScheduleInformationAttributes>;

export type ScheduleInformationList = StrapiList<ScheduleInformationEntry[]>;

export interface ScheduleCard {
    title: string;
    description: string;
    link: string | null;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    image?: SimpleImage | null;
}