import React from 'react'

import { Icon } from '@iconify/react';
import mixcloudIcon from '@iconify/icons-cib/mixcloud';
import spotifyIcon from '@iconify/icons-cib/spotify';
import itunesIcon from '@iconify/icons-ps/itunes';
import castboxIcon from '@iconify/icons-simple-icons/castbox';
import facebookIcon from '@iconify/icons-cib/facebook';
import mailRu from '@iconify/icons-cib/mail-ru';
import instagramIcon from '@iconify/icons-cib/instagram';
import telegramIcon from '@iconify/icons-cib/telegram';
import soundcloudIcon from '@iconify/icons-cib/soundcloud';
import googlepodcastsIcon from '@iconify/icons-cib/google-podcasts';
import patreonIcon from '@iconify/icons-cib/patreon';
import bandcampIcon from '@iconify/icons-cib/bandcamp';
import youtubeIcon from '@iconify/icons-cib/youtube';

import { Socials } from '../../enums';
import { SocialLinks } from '../../models';

import './SocialLinksComponent.scss'

const SOCIAL_ICONS = new Map<string, object>([
    [ Socials.Mixcloud, mixcloudIcon ],
    [ Socials.Spotify, spotifyIcon ],
    [ Socials.Itunes, itunesIcon ],
    [ Socials.Castbox, castboxIcon ],
    [ Socials.Facebook, facebookIcon ],
    [ Socials.Email, mailRu ],
    [ Socials.Instagram, instagramIcon ],
    [ Socials.Telegram, telegramIcon ],
    [ Socials.Soundcloud, soundcloudIcon ],
    [ Socials.GooglePodcasts, googlepodcastsIcon ],
    [ Socials.Patreon, patreonIcon ],
    [ Socials.Bandcamp, bandcampIcon ],
    [ Socials.Youtube, youtubeIcon ],
]);

interface SocialLinksProperties {
    socialLinks: SocialLinks;
}

function buildSocialLink (service: string, href: string | undefined) {
    const key = `${ service }-${ new Date().getTime() }`;
    const icon = SOCIAL_ICONS.get(service);

    return href && icon ? (
        <a  className='social-link'
            target='_blank'
            key={ key }
            href={ href }
            title={ `A link to ${ service }` }
            aria-label={ `A link to ${ service }` }
            rel='noopener noreferrer'
        >
            <Icon className='social-icon' icon={ icon } width='1.5em' color='white'/>
        </a>
    ) : (null);
}

function SocialLinksComponent({ socialLinks }: SocialLinksProperties) {
    const linkElements = Object.entries(socialLinks).map(entry => buildSocialLink(entry[0], entry[1]));

    return (
        <div className='social-icons'>
            { linkElements }
        </div>
    );
}

export default SocialLinksComponent;