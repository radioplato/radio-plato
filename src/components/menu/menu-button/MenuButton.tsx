import React from 'react'

import Menu from '../Menu';

import './MenuButton.css'


const MENU = 'menu';

function MenuButton() {
    const menuRef = React.createRef<HTMLDivElement>()
    const wrapperRef = React.createRef<HTMLDivElement>()
    
    const toggleMenu = () => {
        wrapperRef.current?.classList.toggle('wrapper-show');
        menuRef.current?.classList.toggle('menu-open');
    }

    return (
        <>
            <Menu menuRef={ menuRef } wrapperRef={ wrapperRef } toggleMenu={ toggleMenu }/>
            <div className='menuButton' onClick={ toggleMenu }>
                <p className='label'>{ MENU }</p>
            </div>
        </>
    );
  }
  
  export default MenuButton