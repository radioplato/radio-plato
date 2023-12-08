import React, { Component, createElement } from 'react'

import { Route, Switch, useHistory } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import HeaderPlayerComponent from '../shared/player/components/header-player/HeaderPlayerComponent';

import { ReactComponent as LogoDesktop } from '../../assets/logo-desktop.svg';

import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../shared/button/components/Button';
import { ICON_KEY } from '../shared/icons/icons';
import { DONATE_LINK } from '../shared/constants';

import './Header.scss'

export function Header() {
    const history = useHistory();

    return (
        <header className={`header-container ${isMobileOnly ? 'mobile' : 'desktop'}`}>
            <div className='logo-container' onClick={() => history.push('/')}>
                <div
                    className='logo'
                    aria-label='radio plato logo'
                    role='img'
                >
                    {
                        createElement(
                            LogoDesktop,
                            { style: { width: '100%', height: '100%' } }
                        )
                    }
                </div>
            </div>
            <Switch>
                <Route exact path='/player' render={
                    props => (<></>)
                } />
                <Route path='/' render={
                    props => (
                        <div className='player-container'>
                            <HeaderPlayerComponent></HeaderPlayerComponent>
                        </div>
                    )
                } />
            </Switch>

            <div className='donate-button-container'>
                <Button
                    type={BUTTON_TYPE.OUTLINE}
                    size={BUTTON_SIZE.MEDIUM}
                    icon={ICON_KEY.HEART_REGULAR}
                    iconPosition={ICON_POSITION.LEFT}
                    label='donate'
                    href={DONATE_LINK}
                ></Button>
            </div>
        </header>
    );
}

export default Header;