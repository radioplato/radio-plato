import React, { useState } from 'react'

import { isMobileOnly } from 'react-device-detect';

import { Icon } from '@iconify/react';
import menuIcon from '@iconify/icons-gridicons/menu';

import Menu from '../Menu';

import './MenuButton.css'


const MENU = 'menu';

function MenuButton() {
    const [ isOpened, changeMenuStatus ] = useState(true);

    const menuRef = React.createRef<HTMLDivElement>()
    const wrapperRef = React.createRef<HTMLDivElement>()
    
    const toggleMenu = () => {
        const bodyOverflow = isOpened ? 'hidden' : 'unset';
        
        wrapperRef.current?.classList.toggle('wrapper-show');
        menuRef.current?.classList.toggle('menu-open');
        document.body.style.overflow = bodyOverflow;
        changeMenuStatus(!isOpened);
    }

    const renderAsideButton = () => {
        return (
            <div className='menu-button-aside black' onClick={ toggleMenu }>
                <p className='label open-button'>{ MENU }</p>
            </div>
        );
    }

    const renderHeaderButton = () => {
        return (
            <div className='menu-button-header' onClick={ toggleMenu }>
                <Icon icon={ menuIcon } color='white' width={ 40 } height={ 40 }/>
            </div>
        );
    }

    return (
        <>
            <Menu menuRef={ menuRef } wrapperRef={ wrapperRef } toggleMenu={ toggleMenu }/>
            { isMobileOnly ? renderHeaderButton() : renderAsideButton() }
        </>
    );
  }
  
  export default MenuButton