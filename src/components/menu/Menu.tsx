import React from 'react'

import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import './Menu.css'


const PAGES = [
    'News',
    'Shows',
    'Schedule',
    'About'
];

interface MenuParameters {
    menuRef: React.RefObject<HTMLDivElement>;
    wrapperRef: React.RefObject<HTMLDivElement>;
    toggleMenu: () => void;
}

function Menu({ menuRef, wrapperRef, toggleMenu }: MenuParameters) {
    const device = isMobileOnly ? 'mobile' : 'desktop';

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
            <div className={`wrapper ${ device }`} ref={ wrapperRef } onClick={ toggleMenu } />
            <nav ref={ menuRef } className={ device }>
                <div className='menu-button-aside white' onClick={ toggleMenu }>
                    <p className='label close-button'>CLOSE</p>
                </div>
                <div className='menu-items-container'>
                    <ul className='menu-items'>
                        { PAGES.map(title => buildMenuItem(title)) }
                    </ul>
                </div>
            </nav>
        </>     
    );
  }
  
  export default Menu