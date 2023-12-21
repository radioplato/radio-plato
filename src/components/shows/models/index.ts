
import { CoverDto, SimpleImage, StrapiImageAttributes, StrapiList, StrapiObject, StrapiObjectDto, StrapiResponse } from '../../shared/interfaces';
import { SocialLinks } from '../../shared/social-links/models';

export interface ShowAttributes extends StrapiObject {
    Archived: boolean;
    Author: string;
    ShowCover: ShowImageData;
    Content: string;
    Excerpt: string;
    PublishAt: string;
    Slug: string;
    Title: string;
}

export type ShowImageData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export type ShowEntry = StrapiResponse<ShowAttributes>;

export type NewsList = StrapiList<ShowEntry[]>;

interface ShowLinkDto extends StrapiObjectDto {
    castbox?: string;
    facebook?: string;
    instagram?: string;
    itunes?: string;
    mixcloud?: string;
    spotify?: string;
    telegram?: string;
    vk?: string;
    googlepodcasts?: string;
    patreon?: string;
    soundcloud?: string;
    youtube?: string;
}

export interface ShowDto extends StrapiObjectDto {
    Description: string;
    Excerpt: string;
    ShowCover: CoverDto;
    ShowLink: ShowLinkDto;
    Slug: string;
    Title: string;
    MixcloudPlaylist: string;
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
    showLinks: SocialLinks;
    mixcloudPlaylist: string;
}

export interface ShowEpisode {
    title: string;
    image: string;
    url: string;
    date: string;
    slug: string;
}