import React from 'react'

import { Icon } from '@iconify/react';
import mixcloudIcon from '@iconify/icons-cib/mixcloud';
import spotifyIcon from '@iconify/icons-cib/spotify';
import itunesIcon from '@iconify/icons-ps/itunes';
import castboxIcon from '@iconify/icons-simple-icons/castbox';
import facebookIcon from '@iconify/icons-cib/facebook';
import vkIcon from '@iconify/icons-cib/vk';
import mailRu from '@iconify/icons-cib/mail-ru';
import instagramIcon from '@iconify/icons-cib/instagram';
import telegramIcon from '@iconify/icons-cib/telegram';

import { SocialLinks, Socials } from '../interfaces';

import './SocialLinksComponent.css'

const SOCIAL_ICONS = new Map<string, object>([
    [ Socials.Mixcloud, mixcloudIcon ],
    [ Socials.Spotify, spotifyIcon ],
    [ Socials.Itunes, itunesIcon ],
    [ Socials.Castbox, castboxIcon ],
    [ Socials.Facebook, facebookIcon ],
    [ Socials.Vk, vkIcon ],
    [ Socials.Email, mailRu ],
    [ Socials.Instagram, instagramIcon ],
    [ Socials.Telegram, telegramIcon ],
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