import React, { useState } from 'react'

import { isMobileOnly } from 'react-device-detect';

import Menu from '../menu/Menu';
import Icon from '../../../shared/icons/component/IconComponent';

import { ICON_KEY } from '../../../shared/icons/icons';

import './MenuButton.scss'


function MenuButton() {
    const [isOpened, changeMenuStatus] = useState(true);

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
            <div className='aside-button-open' onClick={toggleMenu}>
                <span className='open-button'>
                    <Icon
                        className='open-button-icon'
                        icon={ICON_KEY.NAVIGATION_HORIZONTAL_REGULAR}
                        style={{
                            width: '20px',
                            height: '20px'
                        }}
                    ></Icon>
                    <p className='open-button-label'>Menu</p>
                </span>
            </div>
        );
    }

    const renderHeaderButton = () => {
        return (
            <div className='menu-button-header' onClick={toggleMenu}>
                <Icon
                    className='menu-button-icon'
                    icon={ICON_KEY.NAVIGATION_HORIZONTAL_REGULAR}
                    style={{
                        width: '20px',
                        height: '20px'
                    }}
                />
            </div>
        );
    }

    return (
        <>
            <Menu menuRef={menuRef} wrapperRef={wrapperRef} toggleMenu={toggleMenu} />
            {isMobileOnly ? renderHeaderButton() : renderAsideButton()}
        </>
    );
}

export default MenuButton