import { Socials } from '../enums';

export type SocialLinks = {
    [key in Socials]?: string;
};