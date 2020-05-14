import { StrapiObjectDto, ImageDto, FormatsDto } from "../shared/interfaces";

interface AboutCoverDto extends StrapiObjectDto, ImageDto {
    alternativeText: string;
    caption: string;
    formats: FormatsDto;
    name: string;
    provider: string;
    related: string[];
}

export interface AboutDto extends StrapiObjectDto {
    Content: string;
    Image: AboutCoverDto;
    Slug: string;
    Title: string;
}


export interface AboutCover {
    alternativeText: string;
    caption: string;
    url: string;
}

export interface About {
    description: string;
    title: string;
    aboutCover: AboutCover;
}