import React from 'react'

import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';
import crossIcon from '@iconify/icons-gridicons/cross';

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
}

function Menu({ menuRef, wrapperRef }: MenuParameters) {

    const buildMenuItem = (title: string) => {
        const route = `/${ title.toLowerCase() }`;

        return (
            <li className='menu-item' key={ title }>
                <Link to={ route } onClick={ toggleMenu }>{ title }</Link>
            </li>
        );
    }

    const toggleMenu = () => {
        wrapperRef.current?.classList.toggle('wrapper-show');
        menuRef.current?.classList.toggle('menu-open');
    }

    return (
        <>
            <div className='wrapper' ref={ wrapperRef } onClick={ toggleMenu } />
            <nav ref={ menuRef }>
                <div className='close-button-container'>
                    <button 
                        className='close-button'
                        onClick={ toggleMenu }
                    >
                        <Icon icon={ crossIcon } width={ 48 } height={ 48 }/>    
                    </button>
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