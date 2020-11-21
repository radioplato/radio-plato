import React from 'react'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom';

import { BrowserView, isMobileOnly } from 'react-device-detect';

import MenuButton from '../menu/menu-button/MenuButton';
import SocialLinksComponent from '../shared/SocialLinksComponent/SocialLinksComponent';
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent';
import { SocialLinks } from '../shared/interfaces';
import { PlayerTypes } from '../shared/enums';

import './Header.css'
import Icon from '@iconify/react';
import googlePlay from '@iconify/icons-cib/google-play';


const RADIO_PLATO = 'Radio Plato';
const DONATE = 'Donate';
const ANDROID_APP = 'Android App';

const HEADER_SOCIAL_LINKS: SocialLinks = {
    mixcloud: 'https://www.mixcloud.com/radioplato/',
    facebook: 'https://www.facebook.com/radioplato.by/',
    vk: 'https://vk.com/radioplato',
    email: 'mailto:hey@radioplato.by',
    instagram: 'https://www.instagram.com/radio_plato/',
    telegram: 'https://t.me/radioplato',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.radioplato'
}

function Header() {
    const className = `header-container ${ isMobileOnly ? 'mobile' : 'desktop' }`;

    return (
        <header className={ className }>
            { isMobileOnly && <MenuButton /> }
            <Link to='/' className='logo-text'>{ RADIO_PLATO }</Link>
            <BrowserView>
                <div className='social-container'>
                    <Switch>
                        <Route exact path='/' render={
                            props => (<SocialLinksComponent { ...props } socialLinks={ HEADER_SOCIAL_LINKS }/>)
                        }/>
                        <Route path='/' render={
                            props => (<PlayerComponent { ...props } playerType={ PlayerTypes.Header }/>)
                        }/>
                    </Switch>
                    
                    <a  className='android-link'
                        target='_blank'
                        href={ HEADER_SOCIAL_LINKS.googlePlay }
                        title={ `A link to Android App` }
                        aria-label={ `A link to Android App` }
                        rel='noopener noreferrer'
                    >
                        <Icon className='social-icon' icon={ googlePlay  } width='1.5em' color='white'/>
                        { ANDROID_APP }
                    </a>

                    <Link to='/donate' className='donate-link'>{ DONATE }</Link>
                </div>
            </BrowserView>
        </header>
    );
}
  
export default Header;