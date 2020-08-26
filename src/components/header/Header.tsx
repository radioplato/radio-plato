import React from 'react'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom';

import { BrowserView } from 'react-device-detect';

import SocialLinksComponent from '../shared/SocialLinksComponent/SocialLinksComponent';
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent';
import { SocialLinks } from '../shared/interfaces';
import { PlayerTypes } from '../shared/enums';

import './Header.css'


const RADIO_PLATO = 'Radio Plato';
const DONATE = 'Donate';

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
    return (
        <header className='header-container'>
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
                    <Link to='/donate' className='donate-link'>{ DONATE }</Link>
                </div>
            </BrowserView>
        </header>
    );
}
  
export default Header;