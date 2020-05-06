import React from 'react';
import { Link } from 'react-router-dom';

import { ShowCard } from '../interfaces';
import { BACKEND_URL } from '../constants';

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

    const route = `/shows/${ slug }`;
    const imageSrc = `${ BACKEND_URL }${ showCover.url }`

    return (
        <Link to={ route }>
            <div className="show-card">
                <img src={ imageSrc } loading='lazy' alt={ showCover.alternativeText }/>
                <h2>{ title }</h2>
                <p>{ excerpt }</p>
            </div>    
        </Link>
    );
}
  
export default ShowCardComponent;