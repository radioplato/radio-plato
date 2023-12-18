import React from 'react';
import type { HTMLAttributes } from 'react';

import Icon from '../../icons/component/IconComponent';

import { ICON_KEY } from '../../icons/icons';

import './Button.scss';
import { title } from 'process';

export enum ICON_POSITION {
    LEFT = 'left',
    RIGHT = 'right'
};

export enum BUTTON_SIZE {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big',
    LARGE = 'large',
    HUGE = 'huge',
};

export enum BUTTON_TYPE {
    FILLED = 'filled',
    OUTLINE = 'outline',
    GHOST = 'ghost'
}

interface ButtonProperties extends HTMLAttributes<HTMLElement> {
    type: BUTTON_TYPE;
    size: BUTTON_SIZE;
    icon?: ICON_KEY;
    iconPosition?: ICON_POSITION;
    iconRotate?: number;
    label?: string;
    href?: string;
    className?: string;
    title?: string;
};

export const Button = ({
    type = BUTTON_TYPE.FILLED,
    size = BUTTON_SIZE.SMALL,
    iconPosition = ICON_POSITION.LEFT,
    icon,
    iconRotate,
    label,
    href,
    className,
    ...rest
}: ButtonProperties) => {
    const content = (
        <>
            {
                icon && iconPosition === ICON_POSITION.LEFT &&
                (<Icon
                    icon={icon}
                    className='button-icon left'
                    style={{
                        marginRight: label ? '8px' : 0,
                        transform: iconRotate ? `rotate(${iconRotate}deg)` : undefined,
                    }}
                ></Icon>)
            }
            {label && (<span className='button-label'>{label}</span>)}
            {
                icon && iconPosition === ICON_POSITION.RIGHT &&
                (<Icon
                    icon={icon}
                    className='button-icon right'
                    style={{
                        marginLeft: label ? '8px' : 0,
                        transform: iconRotate ? `rotate(${iconRotate}deg)` : undefined,
                    }}
                ></Icon>)
            }
        </>
    );

    return (
        <div
            className={`button-background ${type} ${className}`}
            title={title}
            aria-label={title}
        >
            {
                href
                    ? (<a
                        className={`button ${type} ${size} ${!label && 'icon-only'}`}
                        title={label ?? icon}
                        aria-label={label ?? icon}
                        target='_blank'
                        href={href}
                        rel='noopener noreferrer'
                        {...rest}
                    >
                        {content}
                    </a>)
                    : (<div
                        className={`button ${type} ${size} ${!label && 'icon-only'}`}
                        title={label ?? icon}
                        aria-label={label ?? icon}
                        {...rest}
                    >
                        {content}
                    </div>)
            }
        </div>

    );
}