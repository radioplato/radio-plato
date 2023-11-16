import React from 'react';
import { Link } from 'react-router-dom';

import { isMobileOnly } from 'react-device-detect';

import { ShowCard } from '../interfaces';

import './ShowCardComponent.css';

interface ShowCardProperties {
    showCard: ShowCard
}

function ShowCardComponent({ showCard }: ShowCardProperties) {
    const {
        excerpt,
        showCover,
        slug,
        title,
    } = showCard;
    const route = `/shows/${ slug }`;

    return (
        <Link to={ route } title={ title }>
            <div className={ `show-card ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <img src={ showCover.url } loading='lazy' alt={ showCover.alternativeText }/>
                <h2>{ title }</h2>
                <p>{ excerpt }</p>
            </div>    
        </Link>
    );
}
  
export default ShowCardComponent;