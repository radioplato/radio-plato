import React from 'react';
import type { HTMLAttributes } from 'react';

import Icon from '../../icons/component/IconComponent';

import { ICON_KEY } from '../../icons/icons';

export enum ICON_POSITION {
    LEFT = 'left',
    RIGHT = 'right'
};

export enum BUTTON_SIZE {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
};

export enum BUTTON_TYPE {
    FILLED = 'filled',
    OUTLINE = 'outline',
    GHOST = 'ghost'
}

interface ButtonProperties extends HTMLAttributes<HTMLDivElement> {
    type: BUTTON_TYPE;
    size: BUTTON_SIZE;
    label?: string;
    icon?: ICON_KEY;
    iconRotate?: number;
    iconPosition?: ICON_POSITION;
    className?: string;
};

export const Button = ({
    type = BUTTON_TYPE.FILLED,
    size = BUTTON_SIZE.SMALL,
    label,
    icon,
    iconRotate,
    iconPosition = ICON_POSITION.LEFT,
    className,
    ...rest
}: ButtonProperties) => {
    return (
        <div className={`button-background ${type}`}>
            <div
                className={`button ${type} ${size} ${className}`}
                title={label ?? icon}
                aria-label={label ?? icon}
                {...rest}
            >
                {
                    icon && iconPosition === ICON_POSITION.LEFT &&
                    (<Icon
                        icon={icon}
                        rotate={iconRotate}
                        className='button-icon'
                    ></Icon>)
                }
                {label && (<span className='button-label'>{label}</span>)}
                {
                    icon && iconPosition === ICON_POSITION.RIGHT &&
                    (<Icon
                        icon={icon}
                        rotate={iconRotate}
                        className='button-icon'
                    ></Icon>)
                }
            </div>
        </div>

    );
}