import React from 'react'
import { createElement } from 'react';
import type { HTMLAttributes } from 'react';

import { ICON_KEY, getIcon } from '../icons';

interface IconProperties extends HTMLAttributes<HTMLDivElement> {
    icon: ICON_KEY;
    className?: string;
    rotate?: number;
}

const Icon = ({ icon, className, rotate, ...rest }: IconProperties) => {
    return (
        <div
            className={className}
            aria-label={icon}
            role='img'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: rotate ? `rotate(${rotate}deg)` : undefined,
            }}
            {...rest}
        >
            {
                createElement(
                    getIcon(icon), 
                    { style: { width: '100%', height: '100%' } }
                )
            }
        </div>
    );
};

export default Icon;