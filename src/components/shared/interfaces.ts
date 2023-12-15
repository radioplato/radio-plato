export enum Socials {
    Castbox = "castbox",
    Itunes = "itunes",
    Mixcloud = "mixcloud",
    Spotify = "spotify",
    Facebook = "facebook",
    Vk = "vk",
    Email = "email",
    Instagram = "instagram",
    Telegram = "telegram",
    GooglePlay = "googlePlay",
    GooglePodcasts = "googlepodcasts",
    Patreon = "patreon",
    Soundcloud = "soundcloud",
    Bandcamp = "bandcamp",
    Youtube = "youtube",
}

export enum Locale {
    English = "en",
    Belorussian = "be-BY",
    Russian = "ru-RU",
}

export enum LocaleString {
    English = "EN",
    Belorussian = "BY",
    Russian = "RU",
}

export type SocialLinks = {
    [key in Socials]?: string;
};

export interface StrapiObjectDto {
    createdAt: string;
    id: string;
    updatedAt: string;
    __v: number;
    _id: number;
}

export interface StrapiLocalization {
    _id: string;
    id: string;
    locale: Locale;
    published_at: string;
}

export interface ImageDto {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    size: number;
    url: string;
    width: number;
}

export interface FormatsDto {
    thumbnail?: ImageDto;
}

export interface CoverDto extends StrapiObjectDto, ImageDto {
    alternativeText: string;
    caption: string;
    formats: FormatsDto;
    name: string;
    provider: string;
    related: string[];
}

export interface SimpleImage {
    alternativeText?: string;
    caption?: string;
    url?: string;
}

// New version of Strapi

export interface StrapiObject {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  }
  
  export interface StrapiMeta {
    pagination: StrapiPagination;
  }
  
  export interface StrapiPagination {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  }
  
  export interface StrapiImageObject {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    name: string;
    path?: string;
    size: number;
    url: string;
    width: number;
  }
  
  export interface StrapiImageAttributes extends StrapiObject, StrapiImageObject {
    alternativeText: string;
    caption: string;
    formats: {
      thumbnail?: StrapiImageObject;
    };
    previewUrl?: string;
    provider: string;
    provider_metadata?: string;
  }
  
  export interface StrapiCategoryAttributes {
    createdAt: string;
    slug: string;
    title: string;
    updatedAt: string;
  }
  
  export interface StrapiResponse<T> {
    id: number;
    attributes: T;
  }
  
  export interface StrapiList<T> {
    data: T;
    meta?: StrapiMeta;
  }
  
