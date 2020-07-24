import { StrapiObjectDto, CoverDto, SimpleImage } from '../shared/interfaces';

export interface NewsDto extends StrapiObjectDto {
    Category: string;
    Content: string;
    Excerpt: string;
    PhotosBy?: string;
    PublishDate: string;
    PostCover: CoverDto;
    Slug: string;
    Title: string;
    WordsBy: string;
}

export interface NewsCard {
    excerpt: string;
    category: string;
    newsCover: SimpleImage;
    slug?: string;
    link?: string;
    title: string;
    publishDate: string;
}

export interface News extends NewsCard {
    content: string;
    photosBy?: string;
    wordsBy: string;
}