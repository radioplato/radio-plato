
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
}

export interface ShowDto extends StrapiObjectDto {
    Description: string;
    Excerpt: string;
    ShowCover: CoverDto;
    ShowLink: ShowLinkDto;
    Slug: string;
    Title: string;
}

export interface ShowCard {
    excerpt: string;
    showCover: SimpleImage;
    slug: string;
    title: string;
}

export interface Show {
    description: string;
    title: string;
    showCover: SimpleImage;
    showLinks: SocialLinks;
}

export interface ShowEpisode {
    title: string;
    image: string;
    url: string;
    date: string;
    slug: string;
}