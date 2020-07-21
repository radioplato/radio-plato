import { StrapiObjectDto, CoverDto, SimpleImage } from '../shared/interfaces';

export interface AdvertisementDto extends StrapiObjectDto {
    AdActive: boolean;
    AdEnd: string;
    AdImage: CoverDto;
    AdLink: string;
    AdPlacement: string;
    AdStart: string;
    AdText: string;
    AdTitle: string;
}

export interface Advertisement {
    isActive: boolean;
    endDate: string;
    image: SimpleImage;
    link: string;
    placement: string;
    startDate: string;
    text: string;
    title: string;
}