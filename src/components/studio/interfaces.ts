import { StrapiObjectDto, SimpleImage, CoverDto } from "../shared/interfaces";

export interface StudioHeaderDto extends StrapiObjectDto {
    Decription: string;
    Image: CoverDto;
    Slug?: string;
    Title: string;
}

export interface StudioHeader {
    description: string;
    title: string;
    studioImage: SimpleImage;
}
