import React from 'react'

import {
  Link,
  withRouter,
  Switch,
  Route
} from 'react-router-dom';

import { Icon } from '@iconify/react';
import bxSearch from '@iconify/icons-bx/bx-search';

import SocialLinks from './SocialLinks/SocialLinks';
import PlayerComponent from '../player/PlayerComponent/PlayerComponent';
import { PlayerTypes } from '../player/constants';

import './Header.css'


const RADIO_PLATO = 'Radio Plato';
const DONATE = 'Donate';

function Header() {
    return (
        <header className='header-container'>
            <Link to='/' className='logo-text'>{ RADIO_PLATO }</Link>
            <div className='social-container'>
                <Switch>
                    <Route exact path='/' component={ SocialLinks }/>
                    <Route path='/' render={
                        props => <PlayerComponent { ...props } playerType={ PlayerTypes.Header }/>
                    }/>
                </Switch>
                <p className='donate'>{ DONATE }</p>
                <div className='search-icon'>
                    <Icon icon={ bxSearch } width='1.8em' color='white'/>
                </div>
            </div>
        </header>
    );
}
  
export default withRouter(Header);