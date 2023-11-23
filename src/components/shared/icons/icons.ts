import type { FunctionComponent } from 'react';

// Social icons
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

// Utility system icons
import { ReactComponent as ArrowDiagonalFilled } from './assets/system/arrow-diagonal-filled.svg';
import { ReactComponent as ArrowDiagonalRegular } from './assets/system/arrow-diagonal-regular.svg';
import { ReactComponent as ArrowFilled } from './assets/system/arrow-filled.svg';
import { ReactComponent as ArrowRegular } from './assets/system/arrow-regular.svg';
import { ReactComponent as CaretFilled } from './assets/system/caret-filled.svg';
import { ReactComponent as CaretRegular } from './assets/system/caret-regular.svg';
import { ReactComponent as ChatFilled } from './assets/system/chat-filled.svg';
import { ReactComponent as ChatRegular } from './assets/system/chat-regular.svg';
import { ReactComponent as CheckmarkFilled } from './assets/system/checkmark-filled.svg';
import { ReactComponent as CheckmarkRegular } from './assets/system/checkmark-regular.svg';
import { ReactComponent as ChevronFilled } from './assets/system/chevron-filled.svg';
import { ReactComponent as ChevronRegular } from './assets/system/chevron-regular.svg';
import { ReactComponent as DeleteFilled } from './assets/system/delete-filled.svg';
import { ReactComponent as DeleteRegular } from './assets/system/delete-regular.svg';
import { ReactComponent as DismissFilled } from './assets/system/dismiss-filled.svg';
import { ReactComponent as DismissRegular } from './assets/system/dismiss-regular.svg';
import { ReactComponent as HeartFilled } from './assets/system/heart-filled.svg';
import { ReactComponent as HeartRegular } from './assets/system/heart-regular.svg';
import { ReactComponent as MaximizeFilled } from './assets/system/maximize-filled.svg';
import { ReactComponent as MaximizeRegular } from './assets/system/maximize-regular.svg';
import { ReactComponent as MinimizeFilled } from './assets/system/minimize-filled.svg';
import { ReactComponent as MinimizeRegular } from './assets/system/minimize-regular.svg';
import { ReactComponent as NavigationHorizontalFilled } from './assets/system/navigation-horizontal-filled.svg';
import { ReactComponent as NavigationHorizontalRegular } from './assets/system/navigation-horizontal-regular.svg';
import { ReactComponent as NavigationVerticalFilled } from './assets/system/navigation-vertical-filled.svg';
import { ReactComponent as NavigationVerticalRegular } from './assets/system/navigation-vertical-regular.svg';
import { ReactComponent as PauseFilled } from './assets/system/pause-filled.svg';
import { ReactComponent as PauseRegular } from './assets/system/pause-regular.svg';
import { ReactComponent as PlaceholderFilled } from './assets/system/placeholder-filled.svg';
import { ReactComponent as PlaceholderRegular } from './assets/system/placeholder-regular.svg';
import { ReactComponent as PlayFilled } from './assets/system/play-filled.svg';
import { ReactComponent as PlayRegular } from './assets/system/play-regular.svg';
import { ReactComponent as PlusFilled } from './assets/system/plus-filled.svg';
import { ReactComponent as PlusRegular } from './assets/system/plus-regular.svg';
import { ReactComponent as SpeakerMaximumFilled } from './assets/system/speaker-maximum-filled.svg';
import { ReactComponent as SpeakerMaximumRegular } from './assets/system/speaker-maximum-regular.svg';
import { ReactComponent as SpeakerMediumFilled } from './assets/system/speaker-medium-filled.svg';
import { ReactComponent as SpeakerMediumRegular } from './assets/system/speaker-medium-regular.svg';
import { ReactComponent as SpeakerMinimumFilled } from './assets/system/speaker-minimum-filled.svg';
import { ReactComponent as SpeakerMinimumRegular } from './assets/system/speaker-minimum-regular.svg';
import { ReactComponent as SpeakerOffFiled } from './assets/system/speaker-off-filled.svg';
import { ReactComponent as SpeakerOffRegular } from './assets/system/speaker-off-regular.svg';

import { ReactComponent as GooglePlay } from './assets/google-play.svg';

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

    ARROW_DIAGONAL_FILLED = 'arrow-diagonal-filled',
    ARROW_DIAGONAL_REGULAR = 'arrow-diagonal-regular',
    ARROW_FILLED = 'arrow-filled',
    ARROW_REGULAR = 'arrow-regular',
    CARET_FILLED = 'caret-filled',
    CARET_REGULAR = 'caret-regular',
    CHAT_FILLED = 'chat-filled',
    CHAT_REGULAR= 'chat-regular',
    CHECKMARK_FILLED= 'checkmark-filled',
    CHECKMARK_REGULAR= 'checkmark-regular',
    CHEVRON_FILLED= 'chevron-filled',
    CHEVRON_REGULAR= 'chevron-regular',
    DELETE_FILLED= 'delete-filled',
    DELETE_REGULAR= 'delete-regular',
    DISMISS_FILLED= 'dismiss-filled',
    DISMISS_REGULAR= 'dismiss-regular',
    HEART_FILLED= 'heart-filled',
    HEART_REGULAR= 'heart-regular',
    MAXIMIZE_FILLED= 'maximize-filled',
    MAXIMIZE_REGULAR= 'maximize-regular',
    MINIMIZE_FILLED= 'minimize-filled',
    MINIMIZE_REGULAR= 'minimize-regular',
    NAVIGATION_HORIZONTAL_FILLED= 'navigation-horizontal-filled',
    NAVIGATION_HORIZONTAL_REGULAR= 'navigation-horizontal-regular',
    NAVIGATION_VERTICAL_FILLED= 'navigation-vertical-filled',
    NAVIGATION_VERTICAL_REGULAR= 'navigation-vertical-regular',
    PAUSE_FILLED= 'pause-filled',
    PAUSE_REGULAR= 'pause-regular',
    PLACEHOLDER_FILLED= 'placeholder-filled',
    PLACEHOLDER_REGULAR= 'placeholder-regular',
    PLAY_FILLED= 'play-filled',
    PLAY_REGULAR= 'play-regular',
    PLUS_FILLED= 'plus-filled',
    PLUS_REGULAR= 'plus-regular',
    SPEAKER_MAXIMUM_FILLED= 'speaker-maximum-filled',
    SPEAKER_MAXIMUM_REGULAR= 'speaker-maximum-regular',
    SPEAKER_MEDIUM_FILLED= 'speaker-medium-filled',
    SPEAKER_MEDIUM_REGULAR= 'speaker-medium-regular',
    SPEAKER_MINIMUM_FILLED= 'speaker-minimum-filled',
    SPEAKER_MINIMUM_REGULAR= 'speaker-minimum-regular',
    SPEAKER_OFF_FILLED= 'speaker-off-filled',
    SPEAKER_OFF_REGULAR= 'speaker-off-regular',

    GOOGLE_PLAY = 'google-play'
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

    [ ICON_KEY.ARROW_DIAGONAL_FILLED, ArrowDiagonalFilled ],
    [ ICON_KEY.ARROW_DIAGONAL_REGULAR, ArrowDiagonalRegular],
    [ ICON_KEY.ARROW_FILLED, ArrowFilled],
    [ ICON_KEY.ARROW_REGULAR, ArrowRegular],
    [ ICON_KEY.CARET_FILLED, CaretFilled],
    [ ICON_KEY.CARET_REGULAR, CaretRegular],
    [ ICON_KEY.CHAT_FILLED, ChatFilled],
    [ ICON_KEY.CHAT_REGULAR, ChatRegular],
    [ ICON_KEY.CHECKMARK_FILLED, CheckmarkFilled],
    [ ICON_KEY.CHECKMARK_REGULAR, CheckmarkRegular],
    [ ICON_KEY.CHEVRON_FILLED, ChevronFilled],
    [ ICON_KEY.CHEVRON_REGULAR, ChevronRegular],
    [ ICON_KEY.DELETE_FILLED, DeleteFilled],
    [ ICON_KEY.DELETE_REGULAR, DeleteRegular],
    [ ICON_KEY.DISMISS_FILLED, DismissFilled],
    [ ICON_KEY.DISMISS_REGULAR, DismissRegular],
    [ ICON_KEY.HEART_FILLED, HeartFilled],
    [ ICON_KEY.HEART_REGULAR, HeartRegular],
    [ ICON_KEY.MAXIMIZE_FILLED, MaximizeFilled],
    [ ICON_KEY.MAXIMIZE_REGULAR, MaximizeRegular],
    [ ICON_KEY.MINIMIZE_FILLED, MinimizeFilled],
    [ ICON_KEY.MINIMIZE_REGULAR, MinimizeRegular],
    [ ICON_KEY.NAVIGATION_HORIZONTAL_FILLED, NavigationHorizontalFilled],
    [ ICON_KEY.NAVIGATION_HORIZONTAL_REGULAR, NavigationHorizontalRegular],
    [ ICON_KEY.NAVIGATION_VERTICAL_FILLED, NavigationVerticalFilled],
    [ ICON_KEY.NAVIGATION_VERTICAL_REGULAR, NavigationVerticalRegular],
    [ ICON_KEY.PAUSE_FILLED, PauseFilled],
    [ ICON_KEY.PAUSE_REGULAR, PauseRegular],
    [ ICON_KEY.PLACEHOLDER_FILLED, PlaceholderFilled],
    [ ICON_KEY.PLACEHOLDER_REGULAR, PlaceholderRegular],
    [ ICON_KEY.PLAY_FILLED, PlayFilled],
    [ ICON_KEY.PLAY_REGULAR, PlayRegular],
    [ ICON_KEY.PLUS_FILLED, PlusFilled],
    [ ICON_KEY.PLUS_REGULAR, PlusRegular],
    [ ICON_KEY.SPEAKER_MAXIMUM_FILLED, SpeakerMaximumFilled],
    [ ICON_KEY.SPEAKER_MAXIMUM_REGULAR, SpeakerMaximumRegular],
    [ ICON_KEY.SPEAKER_MEDIUM_FILLED, SpeakerMediumFilled],
    [ ICON_KEY.SPEAKER_MEDIUM_REGULAR, SpeakerMediumRegular],
    [ ICON_KEY.SPEAKER_MINIMUM_FILLED, SpeakerMinimumFilled],
    [ ICON_KEY.SPEAKER_MINIMUM_REGULAR, SpeakerMinimumRegular],
    [ ICON_KEY.SPEAKER_OFF_FILLED, SpeakerOffFiled],
    [ ICON_KEY.SPEAKER_OFF_REGULAR, SpeakerOffRegular],

    [ ICON_KEY.GOOGLE_PLAY, GooglePlay ]
]);

export function getIcon(key: ICON_KEY): SVGIcon {
    return mapKeyToIcon.get(key) ?? PlaceholderRegular;
}
