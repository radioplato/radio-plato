import { ShowEntry, ShowList } from '../../../shows/models';
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

export interface ScheduleConnectedShow {
    data: ShowEntry | null;
}

export interface ScheduleInformationAttributes {
    AzuracastID: string;
    Description: string;
    Episodes?: string;
    Image: ScheduleInformationImageData;
    Livestream: boolean;
    Show: ScheduleConnectedShow;
    Periodicity: string | null;
    Title: string;
    Type: string;
}

export type ScheduleInformationImageData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export type ScheduleInformationEntry = StrapiResponse<ScheduleInformationAttributes>;

export type ScheduleInformationList = StrapiList<ScheduleInformationEntry[]>;

export interface ScheduleCard {
    azuracastID: string;
    title: string;
    description: string;
    type: string;
    author?: string | null;
    link: string;
    slug: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    periodicity?: string | null;
    image?: SimpleImage | null;
}