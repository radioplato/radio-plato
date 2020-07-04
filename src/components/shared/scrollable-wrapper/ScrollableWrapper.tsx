import React from 'react';

import "./ScrollableWrapper.css";


interface ScrollableWrapperProperties {
    children: React.ReactNode
}

function ScrollableWrapper ({ children }: ScrollableWrapperProperties) {
    return (
        <div className="scrollable-container">
            { children }
        </div>
    )
}

export default ScrollableWrapper;