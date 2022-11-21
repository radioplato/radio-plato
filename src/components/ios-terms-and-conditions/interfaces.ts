import { StrapiObjectDto } from '../shared/interfaces';

export interface iOStcDto extends StrapiObjectDto {
    text: string;
    tlug: string;
    title: string;
}

export interface iOStc {
    text: string;
    title: string;
}