
import { SimpleImage, StrapiImageAttributes, StrapiList, StrapiObject, StrapiResponse } from '../../shared/interfaces';
import { ScheduleCard, ScheduleInformationList } from '../../shared/schedule/models/schedule';
import { SocialButton } from '../../shared/social-links/models';

export interface ShowAttributes extends StrapiObject {
    Archived: boolean;
    Author: string;
    Description: string;
    Excerpt: string;
    ShowCover: ShowImageData;
    Links: ShowLinksData;
    Schedules: ScheduleInformationList;
    Content: string;
    Slug: string;
    Title: string;
}

export type ShowImageData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export type ShowEntry = StrapiResponse<ShowAttributes>;

export type ShowList = StrapiList<ShowEntry[]>;

export type SocialLinks = {
    [key: string]: string | null;
};

export interface ShowLinksData extends SocialLinks {
    ApplePodcasts: string;
    Bandcamp: string;
    Castbox: string;
    Facebook: string;
    GooglePodcasts: string;
    Instagram: string;
    Mixcloud: string;
    Patreon: string;
    Soundcloud: string;
    Spotify: string;
    Telegram: string;
    Youtube: string;
}

export interface ShowCard {
    isArchived: boolean;
    author: string;
    excerpt: string;
    showCover: SimpleImage;
    slug: string;
    title: string;
}

export interface Show {
    description: string;
    title: string;
    slug: string;
    showCover: SimpleImage;
    socialButtons: SocialButton[];
    schedules: ScheduleCard[];
}