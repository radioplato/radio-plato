export enum Socials {
    Castbox = 'castbox',
    Itunes = 'itunes',
    Mixcloud = 'mixcloud',
    Spotify = 'spotify',
    Facebook = 'facebook',
    Vk = 'vk',
    Email = 'email',
    Instagram = 'instagram',
    Telegram = 'telegram',
    GooglePlay = 'googlePlay',  
}

export type SocialLinks = {
    [key in Socials]?: string;
}