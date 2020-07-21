
import React from 'react';

import { Advertisement } from '../interfaces';

import './AdComponent.css';

interface AdComponentProperties {
    advertisement: Advertisement | null
}

function AdComponent ({ advertisement }: AdComponentProperties) {
    return (
        <a className='da-container' href={ advertisement?.link }>
            <div className='da-image'>
                <img src={ advertisement?.image.url } alt={ advertisement?.image.alternativeText }/>
            </div>
            <div className='da-text'>
                <h2>
                    { advertisement?.title }
                </h2>
                <p>
                    { advertisement?.text }
                </p>
            </div>
        </a>
    );
}

export default AdComponent;
