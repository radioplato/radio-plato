import { StrapiObjectDto, CoverDto, SimpleImage } from "../shared/interfaces";

export interface IndexGalleryDto extends StrapiObjectDto {
    PhotoExhibition: boolean;
    PhotoExhibitionAuthor: string;
    PhotoExhibitionDescription: string;
    PhotoExhibitionLink: string;
    PhotoExhibitionMedia: CoverDto[];
    PhotoExhibitionTitle: string;
    RegularGallery: CoverDto[];
    Video: boolean;
    VideoEmbedCode: string;
}

export interface IndexGallery {
    photoExhibition: boolean;
    photoExhibitionAuthor: string;
    photoExhibitionDescription: string;
    photoExhibitionLink: string;
    photoExhibitionMedia: SimpleImage[];
    photoExhibitionTitle: string;
    regularGallery: SimpleImage[];
    video: boolean;
    videoEmbedCode: string;
}