import React from 'react'

import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import Icon from '@iconify/react';
import cardsHeart from '@iconify/icons-mdi/cards-heart';

import { DONATE, DONATE_LINK } from '../shared/constants';
import { MENU_BUTTONS, SOCIAL_BUTTONS } from './constants';
import { MenuButton, SocialButton } from './interfaces';

import './Menu.scss'


interface MenuParameters {
    menuRef: React.RefObject<HTMLDivElement>;
    wrapperRef: React.RefObject<HTMLDivElement>;
    toggleMenu: () => void;
}

function Menu({ menuRef, wrapperRef, toggleMenu }: MenuParameters) {
    const renderMenuItem = (button: MenuButton) => {
        return (
            <li className={ `menu-item ${button.className}` } key={ button.className }>
                <Link to={ button.route } onClick={ toggleMenu }>{ button.label }</Link>
            </li>
        );
    }

    const renderSocialButton = (button: SocialButton) => {
        return (
            <a
                key={ button.key}
                target='_blank'
                href={ button.link }
                title={ button.key.toUpperCase() }
                aria-label={ button.key.toUpperCase() }
                rel='noopener noreferrer'
                className={ `menu-social-button ${button.key}` }
            ></a>
        );
    }

    return (
        <>
            <div className={`wrapper ${ isMobileOnly ? 'mobile' : 'desktop' }`} ref={ wrapperRef } onClick={ toggleMenu }></div>
            <nav ref={ menuRef } className={ `menu ${isMobileOnly ? 'mobile' : 'desktop'}` }>
                <div className='menu-button-aside white' onClick={ toggleMenu }>
                    <p className='label close-button'>CLOSE</p>
                </div>
                <div className='menu-items-container'>
                    <ul className='menu-items'>
                        { MENU_BUTTONS.map(button => renderMenuItem(button)) }
                        <li className='menu-item donate-button' key='donate'>
                            <a
                                target='_blank'
                                href={ DONATE_LINK }
                                title={ `A Radio Plato Patreon link` }
                                aria-label={ `A Radio Plato Patreon link` }
                                rel='noopener noreferrer'
                            >
                                { DONATE }
                                <Icon className='heart-icon' icon={ cardsHeart } width='32' height='32'/>
                            </a>
                        </li>
                    </ul>
                    <div className='menu-social-buttons'>
                        { SOCIAL_BUTTONS.map(button => renderSocialButton(button)) }
                    </div>
                </div>
            </nav>
        </>     
    );
  }
  
  export default Menu