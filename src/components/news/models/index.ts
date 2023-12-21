import { CoverDto, Locale, SimpleImage, StrapiImageAttributes, StrapiList, StrapiLocalization, StrapiObject, StrapiObjectDto, StrapiResponse } from '../../shared/interfaces';
import { LOCALE } from '../enums';

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

export type NewsPost = StrapiResponse<NewsPostAttributes>;

export type NewsList = StrapiList<NewsPost[]>;

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

export interface NewsDto extends StrapiObjectDto {
    localizations: StrapiLocalization[];
    Category: string;
    Content: string;
    Excerpt: string;
    PhotosBy?: string;
    PostCover: CoverDto;
    Slug: string;
    Title: string;
    WordsBy: string;
    publish_at: string;
    locale: Locale;
}

export interface NewsArticle extends NewsCard {
    content: string;
    photosBy?: string;
    wordsBy: string;
}
