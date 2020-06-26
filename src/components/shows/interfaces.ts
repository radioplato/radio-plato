
import { SocialLinks, StrapiObjectDto, CoverDto } from "../shared/interfaces";

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

export interface ShowCover {
    alternativeText: string;
    caption: string;
    url: string;
}

export interface ShowCard {
    excerpt: string;
    showCover: ShowCover;
    slug: string;
    title: string;
}

export interface Show {
    description: string;
    title: string;
    showCover: ShowCover;
    showLinks: SocialLinks;
}

export interface ShowEpisode {
    title: string;
    image: string;
    url: string;
    date: string;
    slug: string;
}