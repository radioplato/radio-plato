import React from 'react'

import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import Icon from '@iconify/react';
import cardsHeart from '@iconify/icons-mdi/cards-heart';

import { DONATE, DONATE_LINK } from '../shared/constants';

import './Menu.css'


const PAGES = [
    'News',
    'Shows',
    'Schedule',
    'Studio',
    'About',
];

interface MenuParameters {
    menuRef: React.RefObject<HTMLDivElement>;
    wrapperRef: React.RefObject<HTMLDivElement>;
    toggleMenu: () => void;
}

function Menu({ menuRef, wrapperRef, toggleMenu }: MenuParameters) {
    const buildMenuItem = (title: string) => {
        const route = `/${ title.toLowerCase() }`;

        return (
            <li className='menu-item' key={ title }>
                <Link to={ route } onClick={ toggleMenu }>{ title }</Link>
            </li>
        );
    }

    return (
        <>
            <div className={`wrapper ${ isMobileOnly ? 'mobile' : 'desktop' }`} ref={ wrapperRef } onClick={ toggleMenu } />
            <nav ref={ menuRef } className={ isMobileOnly ? 'mobile' : 'desktop' }>
                <div className='menu-button-aside white' onClick={ toggleMenu }>
                    <p className='label close-button'>CLOSE</p>
                </div>
                <div className='menu-items-container'>
                    <ul className='menu-items'>
                        { PAGES.map(title => buildMenuItem(title)) }
                        <div className='menu-separator'></div>
                        <li className='menu-item' key='donate'>
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
                </div>
            </nav>
        </>     
    );
  }
  
  export default Menu