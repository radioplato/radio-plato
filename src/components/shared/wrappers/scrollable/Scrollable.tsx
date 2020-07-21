import React from 'react';

import './Scrollable.css';


function withScroll (children: React.ReactNode) {
    return (
        <div className='scrollable-container'>
            { children }
        </div>
    )
}

export { withScroll };