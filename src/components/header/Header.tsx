import React, { createElement } from 'react'

import { Route, Switch, useHistory } from 'react-router-dom';

import { isMobileOnly, isTablet } from 'react-device-detect';

import HeaderPlayerComponent from '../shared/player/components/header-player/HeaderPlayerComponent';
import MenuButton from '../menu/components/menu-button/MenuButton';

import { ReactComponent as LogoDesktop } from '../../assets/logo-desktop.svg';
import { ReactComponent as LogoMobile } from '../../assets/logo-mobile.svg';

import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../shared/button/components/Button';
import { ICON_KEY } from '../shared/icons/icons';
import { DONATE_LINK } from '../shared/constants';

import './Header.scss'

export function Header() {
    const history = useHistory();

    return (
        <>
            <header className='header-container desktop'>
                <div className='logo-container' title='back to main page' onClick={() => history.push('/')}>
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
                        props => (
                            <div className='donate-button-container'>
                                <Button
                                    type={BUTTON_TYPE.OUTLINE}
                                    size={BUTTON_SIZE.MEDIUM}
                                    icon={ICON_KEY.HEART_REGULAR}
                                    iconPosition={ICON_POSITION.LEFT}
                                    label='donate'
                                    href={DONATE_LINK}
                                    title='donate link'
                                ></Button>
                            </div>
                        )
                    } />
                    <Route path='/' render={
                        props => (
                            <>
                                <div className='player-container'>
                                    <HeaderPlayerComponent></HeaderPlayerComponent>
                                    <Button
                                        type={BUTTON_TYPE.OUTLINE}
                                        size={BUTTON_SIZE.MEDIUM}
                                        icon={ICON_KEY.HEART_REGULAR}
                                        iconPosition={ICON_POSITION.LEFT}
                                        label='donate'
                                        href={DONATE_LINK}
                                        title='donate link'
                                    ></Button>
                                </div>
                                <div className='fake-container'></div>
                            </>
                        )
                    } />
                </Switch>
            </header>
            <header className='header-container mobile'>
                <MenuButton isAside={false} />
                <div className='logo-container' title='back to main page' onClick={() => history.push('/')}>
                    <div
                        className='logo'
                        aria-label='radio plato logo'
                        role='img'
                    >
                        {
                            createElement(
                                LogoMobile,
                                { style: { width: '100%', height: '100%' } }
                            )
                        }
                    </div>
                </div>
                <Button
                    className='donate-button'
                    type={BUTTON_TYPE.GHOST}
                    size={BUTTON_SIZE.BIG}
                    icon={ICON_KEY.HEART_REGULAR}
                    iconPosition={ICON_POSITION.LEFT}
                    href={DONATE_LINK}
                    title='donate link'
                />
            </header>
        </>
    );
}

export default Header;