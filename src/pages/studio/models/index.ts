
import { SimpleImage, StrapiImageAttributes, StrapiResponse } from '../../../components/shared/interfaces';
import { ProjectTag } from '../enums';

export interface PortfolioAttributes {
    Description: string;
    Image: PortfolioMediaData;
    PortfolioItem: PortfolioItemData[];
    Slug: string;
    Title: string;
}

export type PortfolioMediaData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export interface PortfolioItemData {
    Description: string;
    Image: PortfolioMediaData;
    Tag: PortfolioItemTagData;
    Title: string;
    Video: PortfolioMediaData;
    id: number;
}

export interface PortfolioItemTagData {
    id: number;
    Animation: boolean;
    Commercials: boolean;
    Foley: boolean;
    Jingles: boolean;
    Mobile: boolean;
    PodcastsVoice: boolean;
}

export type PorfolioEntry = StrapiResponse<PortfolioAttributes>;

export interface Project {
    description: string;
    image: StrapiImageAttributes;
    tags: ProjectTag[];
    title: string;
    video: StrapiImageAttributes;
    id: string;
}

export interface Portfolio {
    description: string;
    title: string;
    studioImage: SimpleImage;
    projects: Project[];
}