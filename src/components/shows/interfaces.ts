
import { SocialLinks } from "../shared/interfaces";

interface StrapiObjectDto {
    createdAt: string;
    id: string;
    updatedAt: string;
    __v: number;
    _id: number;
}

interface ImageDto {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    size: number;
    url: string;
    width: number;
}

interface FormatsDto {
    thumbnail?: ImageDto;
}


interface ShowCoverDto extends StrapiObjectDto, ImageDto {
    alternativeText: string;
    caption: string;
    formats: FormatsDto;
    name: string;
    provider: string;
    related: string[];
}

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
    ShowCover: ShowCoverDto;
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