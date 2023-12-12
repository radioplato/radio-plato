import React from 'react';

import './Scrollable.scss';


function withScroll (children: React.ReactNode) {
    return (
        <div className='scrollable-container'>
            { children }
        </div>
    )
}

export { withScroll };