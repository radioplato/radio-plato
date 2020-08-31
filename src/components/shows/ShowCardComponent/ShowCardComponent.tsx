import React from 'react';
import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import { ShowCard } from '../interfaces';

import './ShowCardComponent.css';

interface ShowCardParameters {
    showCard: ShowCard
}

function ShowCardComponent({ showCard }: ShowCardParameters) {
    const {
        excerpt,
        showCover,
        slug,
        title,
    } = showCard;
    const className = `show-card ${ isMobileOnly ? 'mobile' : 'desktop' }`;
    const route = `/shows/${ slug }`;

    return (
        <Link to={ route } title={ title }>
            <div className={ className }>
                <img src={ showCover.url } loading='lazy' alt={ showCover.alternativeText }/>
                <h2>{ title }</h2>
                <p>{ excerpt }</p>
            </div>    
        </Link>
    );
}
  
export default ShowCardComponent;