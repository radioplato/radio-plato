import { StrapiObjectDto, ImageDto, FormatsDto } from "../shared/interfaces";

interface DonateCoverDto extends StrapiObjectDto, ImageDto {
    alternativeText: string;
    caption: string;
    formats: FormatsDto;
    name: string;
    provider: string;
    related: string[];
}

export interface DonateDto extends StrapiObjectDto {
    Content: string;
    Image: DonateCoverDto;
    Slug: string;
    Title: string;
}


export interface DonateCover {
    alternativeText: string;
    caption: string;
    url: string;
}

export interface Donate {
    description: string;
    title: string;
    donateCover: DonateCover;
}