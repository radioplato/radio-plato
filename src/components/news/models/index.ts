import { SimpleImage, StrapiImageAttributes, StrapiList, StrapiObject, StrapiResponse } from '../../shared/interfaces';
import { Locale } from '../enums';

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
    localizations?: StrapiList<NewsEntry[]>;
    locale: Locale;
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

export interface NewsArticleLocalization {
    locale: Locale;
    label?: string;
    title: string;
    excerpt: string;
    content: string;
}

export interface NewsArticle extends NewsCard {
    locale: Locale;
    localizations: NewsArticleLocalization[];
}
