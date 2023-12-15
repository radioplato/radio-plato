import { StrapiObjectDto, CoverDto, SimpleImage, StrapiLocalization, Locale } from "../../shared/interfaces";

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
    locale: Locale;
    localizations: StrapiLocalization[];
}
