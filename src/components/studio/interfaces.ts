import { StrapiObjectDto, SimpleImage, CoverDto } from "../shared/interfaces";
import { ProjectTag } from "./enums";

export interface StudioHeaderDto extends StrapiObjectDto {
    Description: string;
    Image: CoverDto;
    Slug?: string;
    Title: string;
}

export interface StudioHeader {
    description: string;
    title: string;
    studioImage: SimpleImage;
}

export interface PortfolioMedia extends StrapiObjectDto {
    alternativeText: string;
    caption: string;
    ext: string;
    hash: string;
    height: string | number | null;
    mime: string;
    name: string;
    previewUrl: string;
    provider: string;
    provider_metadata: {
        public_id: string;
        resource_type: string;
    };
    related: string[];
    size: number;
    url: string;
    width: string | number | null;
}

export interface PortfolioTagDto {
    Animation: boolean;
    Commercials: boolean;
    Foley: boolean;
    Jingles: boolean;
    Mobile: boolean;
    PodcastsVoice: boolean;
    id: string;
    __v: number;
    _id: string;
}

export interface PortfolioDto extends StrapiObjectDto {
    Description: string;
    Image: CoverDto;
    Tag: PortfolioTagDto;
    Title: string;
    Video: PortfolioMedia;
}

export interface Project {
    description: string;
    image: SimpleImage;
    tags: ProjectTag[];
    title: string;
    video: PortfolioMedia;
    id: string;
}