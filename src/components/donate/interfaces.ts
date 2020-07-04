import { StrapiObjectDto, SimpleImage, CoverDto } from "../shared/interfaces";

export interface DonateDto extends StrapiObjectDto {
    Content: string;
    Image: CoverDto;
    Slug: string;
    Title: string;
}

export interface Donate {
    description: string;
    title: string;
    donateCover: SimpleImage;
}