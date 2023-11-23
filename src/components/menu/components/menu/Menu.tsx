import React from 'react'

import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import Icon from '../../../shared/icons/component/IconComponent';

import { DONATE, DONATE_LINK } from '../../../shared/constants';
import { MENU_BUTTONS, SOCIAL_BUTTONS } from '../../constants';
import { ICON_KEY } from '../../../shared/icons/icons';
import { MenuButton, SocialButton } from '../../interfaces';

import './Menu.scss'


interface MenuProperties {
    menuRef: React.RefObject<HTMLDivElement>;
    wrapperRef: React.RefObject<HTMLDivElement>;
    toggleMenu: () => void;
}

function Menu({ menuRef, wrapperRef, toggleMenu }: MenuProperties) {
    const renderMenuItem = (button: MenuButton) => {
        return (
            <li className={`menu-item ${button.className}`} key={button.className}>
                <Link to={button.route} onClick={toggleMenu}>{button.label}</Link>
            </li>
        );
    }

    const renderSocialButton = (button: SocialButton) => {
        return (
            <a
                key={button.name}
                target='_blank'
                href={button.link}
                title={`${button.name} link`}
                aria-label={`${button.name} link`}
                rel='noopener noreferrer'
                className={`menu-social-button ${button.name}`}
            >
                <Icon
                    icon={button.icon}
                    style={{
                        width: '32px',
                        height: '32px'
                    }}
                ></Icon>
            </a>
        );
    }

    return (
        <>
            <div className={`wrapper ${isMobileOnly ? 'mobile' : 'desktop'}`} ref={wrapperRef} onClick={toggleMenu}></div>
            <nav ref={menuRef} className={`menu ${isMobileOnly ? 'mobile' : 'desktop'}`}>
                <div className='menu-button-aside white' onClick={toggleMenu}>
                    <p className='close-button-label'>Close</p>
                </div>
                <div className='menu-items-container'>
                    <ul className='menu-items'>
                        {MENU_BUTTONS.map(button => renderMenuItem(button))}
                        <li className='menu-item donate-button' key='donate'>
                            <a
                                target='_blank'
                                href={DONATE_LINK}
                                title={`radio plato patreon link`}
                                aria-label={`radio plato patreon link`}
                                rel='noopener noreferrer'
                            >
                                {DONATE}
                            </a>
                        </li>
                    </ul>
                    <div className='menu-social-buttons'>
                        {SOCIAL_BUTTONS.map(button => renderSocialButton(button))}
                    </div>
                    <a
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.radioplato'
                        title={`google play link`}
                        aria-label={`google play link`}
                        rel='noopener noreferrer'
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