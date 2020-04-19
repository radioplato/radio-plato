import React from 'react'

import { Icon } from '@iconify/react';
import crossIcon from '@iconify/icons-gridicons/cross';

import './Menu.css'


const PAGES = [
    "News",
    "Shows",
    "Schedule",
    "About"
];

interface MenuParameters {
    menuRef: React.RefObject<HTMLDivElement>
}

function Menu({ menuRef }: MenuParameters) {

    const buildMenuItem = (title: string) => {
        return <li className="menu-item" key={ title }>{ title }</li>
    }

    const toggleMenu = () => {
        menuRef.current?.classList.toggle('menu-open');
    }

    return (
        <nav ref={ menuRef }>
            <div className="close-button-container">
                <button 
                    className="close-button"
                    onClick={ toggleMenu }
                >
                    <Icon icon={ crossIcon } width={ 48 } height={ 48 }/>    
                </button>
            </div>
            <div className="menu-items-container">
                <ul className="menu-items">
                    { PAGES.map(title => buildMenuItem(title)) }
                </ul>
            </div>
        </nav>
    );
  }
  
  export default Menu