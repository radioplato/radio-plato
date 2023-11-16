import React, { Component } from 'react'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom';

import { BrowserView, isMobileOnly } from 'react-device-detect';
import googlePlay from '@iconify/icons-cib/google-play';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import Icon from '@iconify/react';

import MenuButton from '../menu/components/menu-button/MenuButton';
import SocialLinksComponent from '../shared/SocialLinksComponent/SocialLinksComponent';
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent';
import { ANDROID_APP, DONATE, DONATE_LINK, HEADER_SOCIAL_LINKS } from '../shared/constants';
import { PlayerTypes } from '../shared/enums';

import './Header.css'


const RADIO_PLATO = '';

export class Header extends Component {
    renderMobileDonateButton() {
        return (
            <a className='donate-link'
                target='_blank'
                href={ DONATE_LINK }
                title={ `A Radio Plato Patreon link` }
                aria-label={ `A Radio Plato Patreon link` }
                rel='noopener noreferrer'
            >   
                <Icon className='heart-icon' icon={ cardsHeart } width='24' height='24'/>
            </a>
        );
    }

    render() {
        return (
            <header className={ `header-container ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                { isMobileOnly && <MenuButton /> }
                <div className='logo-container'>
                    <Link to='/' className='logo-text'>{ RADIO_PLATO }</Link>
                </div>
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
                        
                        <div className="android-link-wrapper">
                            <a className='android-link'
                                target='_blank'
                                href={ HEADER_SOCIAL_LINKS.googlePlay }
                                title={ `A link to Android App` }
                                aria-label={ `A link to Android App` }
                                rel='noopener noreferrer'
                            >
                                <Icon className='google-play-icon' icon={ googlePlay }/>
                                { ANDROID_APP }
                            </a>
                        </div>
                        
                        <div className="donate-link-wrapper">
                            <a className='donate-link'
                                target='_blank'
                                href={ DONATE_LINK }
                                title={ `A Radio Plato Patreon link` }
                                aria-label={ `A Radio Plato Patreon link` }
                                rel='noopener noreferrer'
                            >   
                                <Icon className='heart-icon' icon={ cardsHeart } width='18' height='18'/>
                                { DONATE }
                            </a>
                        </div>
                    </div>
                </BrowserView>
                { isMobileOnly && this.renderMobileDonateButton() }
            </header>
        );
    }
}
  
export default Header;