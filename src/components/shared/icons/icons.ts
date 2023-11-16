import type { FunctionComponent } from 'react';

import { ReactComponent as ApplePodcasts } from './assets/socials/apple-podcasts.svg';
import { ReactComponent as Bandcamp } from './assets/socials/bandcamp.svg';
import { ReactComponent as Castbox } from './assets/socials/castbox.svg';
import { ReactComponent as Email } from './assets/socials/email.svg';
import { ReactComponent as Facebook } from './assets/socials/facebook.svg';
import { ReactComponent as GooglePodcasts } from './assets/socials/google-podcasts.svg';
import { ReactComponent as Instagram } from './assets/socials/instagram.svg';
import { ReactComponent as Mixcloud } from './assets/socials/mixcloud.svg';
import { ReactComponent as Patreon } from './assets/socials/patreon.svg';
import { ReactComponent as Soundcloud } from './assets/socials/soundcloud.svg';
import { ReactComponent as Spotify } from './assets/socials/spotify.svg';
import { ReactComponent as Telegram } from './assets/socials/telegram.svg';
import { ReactComponent as Youtube } from './assets/socials/youtube.svg';

import { ReactComponent as Placeholder } from './assets/placeholder.svg';

type SVGIcon = FunctionComponent<React.SVGProps<SVGSVGElement>>;

export enum ICON_KEY {
    APPLE_PODCASTS = 'apple-podcasts',
    BANDCAMP = 'bandcamp',
    CASTBOX = 'castbox',
    EMAIL = 'email',
    FACEBOOK = 'facebook',
    GOOGLE_PODCASTS = 'google-podcasts',
    INSTAGRAM = 'instagram',
    MIXCLOUD = 'mixcloud',
    PATREON = 'patreon',
    SOUNDCLOUD = 'soundcloud',
    SPOTIFY = 'spotify',
    TELEGRAM = 'telegram',
    YOUTUBE = 'youtube',

    PLACEHOLDER = 'placeholder'
}

const mapKeyToIcon = new Map<string, SVGIcon>([
    [ ICON_KEY.APPLE_PODCASTS, ApplePodcasts ],
    [ ICON_KEY.BANDCAMP, Bandcamp ],
    [ ICON_KEY.CASTBOX, Castbox ],
    [ ICON_KEY.EMAIL, Email ],
    [ ICON_KEY.FACEBOOK, Facebook ],
    [ ICON_KEY.GOOGLE_PODCASTS, GooglePodcasts ],
    [ ICON_KEY.INSTAGRAM, Instagram ],
    [ ICON_KEY.MIXCLOUD, Mixcloud ],
    [ ICON_KEY.PATREON, Patreon ],
    [ ICON_KEY.SOUNDCLOUD, Soundcloud ],
    [ ICON_KEY.SPOTIFY, Spotify ],
    [ ICON_KEY.TELEGRAM, Telegram ],
    [ ICON_KEY.YOUTUBE, Youtube ],

    [ ICON_KEY.PLACEHOLDER, Placeholder ],
]);

export function getIcon(key: ICON_KEY): SVGIcon {
    return mapKeyToIcon.get(key) ?? Placeholder;
}
