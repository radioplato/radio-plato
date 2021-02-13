
import { SocialLinks, StrapiObjectDto, CoverDto, SimpleImage } from '../shared/interfaces';

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
}

export interface ShowDto extends StrapiObjectDto {
    Description: string;
    Excerpt: string;
    ShowCover: CoverDto;
    ShowLink: ShowLinkDto;
    Slug: string;
    Title: string;
    Weight: number;
    MixcloudPlaylist: string;
}

export interface ShowCard {
    excerpt: string;
    showCover: SimpleImage;
    slug: string;
    title: string;
    weight: number;
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