import React, { Component } from 'react'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom';

import { BrowserView, isMobileOnly } from 'react-device-detect';
import googlePlay from '@iconify/icons-cib/google-play';
import Icon from '@iconify/react';

import MenuButton from '../menu/menu-button/MenuButton';
import SocialLinksComponent from '../shared/SocialLinksComponent/SocialLinksComponent';
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent';
import { ANDROID_APP, HEADER_SOCIAL_LINKS } from '../shared/constants';
import { PlayerTypes } from '../shared/enums';

import './Header.css'


const RADIO_PLATO = '';
const DONATE = 'Donate';

export class Header extends Component {
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
                        
    
                        <Link to='/donate' className='donate-link'>{ DONATE }</Link>
                    </div>
                </BrowserView>
            </header>
        );
    }
}
  
export default Header;