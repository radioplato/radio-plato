import React from 'react'

import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import Icon from '../../../shared/icons/component/IconComponent';
import SocialButtonsComponent from '../../../shared/social-links/components/social-buttons/SocialButtonsComponent';

import { PLATO_SOCIAL_BUTTONS } from '../../../shared/social-links/constants';
import { DONATE, DONATE_LINK } from '../../../shared/constants';
import { MENU_BUTTONS } from '../../constants';
import { ICON_KEY } from '../../../shared/icons/icons';
import { MenuButton } from '../../models';

import './Menu.scss'


interface MenuProperties {
    menuRef: React.RefObject<HTMLDivElement>;
    wrapperRef: React.RefObject<HTMLDivElement>;
    toggleMenu: () => void;
}

function Menu({ menuRef, wrapperRef, toggleMenu }: MenuProperties) {
    const renderMenuItem = (button: MenuButton) => {
        return (
            <div className={`menu-item ${button.className}`} key={button.className}>
                <Link to={button.route} onClick={toggleMenu}>
                    {button.label}
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className={`wrapper ${isMobileOnly ? 'mobile' : 'desktop'}`} ref={wrapperRef} onClick={toggleMenu}></div>
            <nav ref={menuRef} className={`menu ${isMobileOnly ? 'mobile' : 'desktop'}`}>
                <div className='aside-button-close' onClick={toggleMenu}>
                    <span className='close-button'>
                        <Icon
                            className='close-button-icon'
                            icon={ICON_KEY.DISMISS_REGULAR}
                            style={{
                                width: '20px',
                                height: '20px'
                            }}
                        ></Icon>
                        <p className='close-button-label'>Close</p>
                    </span>
                </div>
                <div className='menu-items-container'>
                    <div className='menu-items'>
                        {MENU_BUTTONS.map(button => renderMenuItem(button))}
                        <div className='menu-item donate-button' key='donate'>
                            <a
                                target='_blank'
                                href={DONATE_LINK}
                                title={`radio plato patreon link`}
                                aria-label={`radio plato patreon link`}
                                rel='noopener noreferrer'
                            >
                                {DONATE}
                            </a>
                        </div>
                    </div>
                    <div className='menu-social-buttons'>
                        <SocialButtonsComponent socialLinks={ PLATO_SOCIAL_BUTTONS }></SocialButtonsComponent>
                    </div>
                    <a
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.radioplato'
                        title={`google play link`}
                        aria-label={`google play link`}
                        rel='noopener noreferrer'
                        className='google-play-button'
                    >
                        <Icon
                            icon={ICON_KEY.GOOGLE_PLAY}
                            style={{
                                width: '180px',
                                height: '52px'
                            }}
                        ></Icon>
                    </a>
                </div>
            </nav>
        </>
    );
}

export default Menu