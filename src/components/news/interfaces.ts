import { StrapiObjectDto, CoverDto } from "../shared/interfaces";

export interface NewsDto extends StrapiObjectDto {
    Category: string;
    Content: string;
    Excerpt: string;
    PhotosBy: string;
    PostCover: CoverDto;
    Slug: string;
    Title: string;
    WordsBy: string;
}

export interface NewsCover {
    alternativeText: string;
    caption: string;
    url: string;
}

export interface NewsCard {
    excerpt: string;
    newsCover: NewsCover;
    slug: string;
    title: string;
}