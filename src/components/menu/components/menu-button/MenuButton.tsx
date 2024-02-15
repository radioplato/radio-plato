import React, { useState } from 'react';

import Menu from '../menu/Menu';
import Icon from '../../../shared/icons/component/IconComponent';

import { Button, BUTTON_TYPE, BUTTON_SIZE, ICON_POSITION } from '../../../shared/button/components/Button';
import { ICON_KEY } from '../../../shared/icons/icons';

import './MenuButton.scss'


interface MenuButtonProperties {
    isAside?: boolean;
}

function MenuButton({ isAside }: MenuButtonProperties) {
    const [isOpened, changeMenuStatus] = useState(true);

    const menuRef = React.createRef<HTMLDivElement>();
    const wrapperRef = React.createRef<HTMLDivElement>();

    const toggleMenu = () => {
        const bodyOverflow = isOpened ? 'hidden' : 'unset';

        if (isOpened) {
            document.querySelector('.header-container.mobile')?.classList.toggle('bring-forward');
        } else {
            setTimeout(() => document.querySelector('.header-container.mobile')?.classList.toggle('bring-forward'), 400);
        }


        wrapperRef.current?.classList.toggle('hidden');
        wrapperRef.current?.classList.toggle('shown');

        menuRef.current?.classList.toggle('opened');

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
            <Button
                className='header-menu-button'
                type={BUTTON_TYPE.GHOST}
                size={BUTTON_SIZE.BIG}
                icon={ICON_KEY.NAVIGATION_HORIZONTAL_REGULAR}
                iconPosition={ICON_POSITION.LEFT}
                title='menu button'
                onClick={toggleMenu}
            ></Button>
        );
    }

    return (
        <>
            <Menu menuRef={menuRef} wrapperRef={wrapperRef} toggleMenu={toggleMenu} />
           {
             isAside
                ? renderAsideButton()
                : renderHeaderButton()
           }
        </>
    );
}

export default MenuButton