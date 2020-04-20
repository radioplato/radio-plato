import React from 'react'

import Menu from '../Menu';

import './MenuButton.css'


const MENU = 'menu';

function MenuButton() {
    const menuRef = React.createRef<HTMLDivElement>()
    
    const toggleMenu = () => {
        menuRef.current?.classList.toggle('menu-open');
    }

    return (
        <>
            <Menu menuRef={ menuRef } />
            <div className='menuButton' onClick={ toggleMenu }>
                <p className='label'>{ MENU }</p>
            </div>
        </>
    );
  }
  
  export default MenuButton