import { MenuButton, SocialButton } from "../interfaces";

export const MENU_BUTTONS: MenuButton[] = [
    {
        label: 'News',
        route: '/news',
        className: 'news-button'
    },
    {
        label: 'Shows',
        route: '/shows',
        className: 'shows-button'
    },
    {
        label: 'Schedule',
        route: '/schedule',
        className: 'schedule-button'
    },
    {
        label: 'Studio',
        route: '/studio',
        className: 'studio-button'
    },
    {
        label: 'About',
        route: '/about',
        className: 'about-button'
    },
];

export const SOCIAL_BUTTONS: SocialButton[] = [
    {
        key: 'soundcloud',
        link: 'https://soundcloud.com/radioplato',
    },
    {
        key: 'bandcamp',
        link: 'https://radioplato.bandcamp.com',
    },
    {
        key: 'spotify',
        link: 'https://open.spotify.com/user/llh1ub9gwdw5cpczlzz8mu27b',
    },
    {
        key: 'youtube',
        link: 'https://www.youtube.com/@radioplato',
    },
    {
        key: 'email',
        link: 'mailto:hey@radioplato.by',
    },
    {
        key: 'instagram',
        link: 'https://www.instagram.com/radio_plato',
    },
    {
        key: 'telegram',
        link: 'https://t.me/radioplato',
    },
    {
        key: 'facebook',
        link: 'https://www.facebook.com/radioplato.by',
    },
];

