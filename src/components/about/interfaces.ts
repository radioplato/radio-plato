import { StrapiObjectDto, SimpleImage, CoverDto } from "../shared/interfaces";

export interface AboutDto extends StrapiObjectDto {
    Content: string;
    Image: CoverDto;
    Slug: string;
    Title: string;
}

export interface About {
    description: string;
    title: string;
    aboutCover: SimpleImage;
}