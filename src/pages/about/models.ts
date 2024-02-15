import { SimpleImage, CoverDto, StrapiImageAttributes, StrapiObject, StrapiResponse, StrapiList } from '../../components/shared/interfaces';

export interface AboutPageAttributes extends StrapiObject {
    Content: string;
    Image: AboutPageImageData;
    Slug: string;
    Title: string;
};

export type AboutPageImageData = {
    data: StrapiResponse<StrapiImageAttributes>[];
};

export type AboutPageEntry = StrapiResponse<AboutPageAttributes>;

export type AboutPageDto = StrapiList<AboutPageEntry>;

export interface AboutPageContent {
    description: string;
    title: string;
    aboutCover: SimpleImage;
};