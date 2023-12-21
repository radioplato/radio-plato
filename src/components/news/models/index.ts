import { CoverDto, Locale, SimpleImage, StrapiImageAttributes, StrapiList, StrapiLocalization, StrapiObject, StrapiObjectDto, StrapiResponse } from '../../shared/interfaces';

export interface NewsPostAttributes extends StrapiObject {
    Category: string;
    PostCover: NewsImageData;
    Content: string;
    Excerpt: string;
    PhotosBy: string;
    PublishAt: string;
    Slug: string;
    Title: string;
    WordsBy: string;
}

export type NewsImageData = {
    data: StrapiResponse<StrapiImageAttributes>;
};

export type NewsEntry = StrapiResponse<NewsPostAttributes>;

export type NewsList = StrapiList<NewsEntry[]>;

export interface NewsCard {
    excerpt: string;
    category: string;
    newsCover: SimpleImage;
    content?: string;
    slug?: string;
    link?: string;
    title: string;
    publishDate: string;
};

export interface NewsArticle extends NewsCard {
    content: string;
    photosBy?: string;
    wordsBy: string;
}
