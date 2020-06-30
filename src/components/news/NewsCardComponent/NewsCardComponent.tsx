import React from 'react';
import { Link } from 'react-router-dom';

import { NewsCard } from '../interfaces';

import './NewsCardComponent.css';

interface NewsCardParameters {
    newsCard: NewsCard,
    type?: string
}

function NewsCardComponent({ newsCard, type }: NewsCardParameters) {
    const {
        excerpt,
        newsCover,
        slug,
        title,
    } = newsCard;

    const route = `/news/${ slug }`;

    return (
        <div className={ `news-card ${ type }` }>
            <Link to={ route }>
                <img src={ newsCover.url } loading='lazy' alt={ newsCover.alternativeText }/>
                <div className="news-card-text">
                    <h2>{ title }</h2>
                    <p className="news-card-excerpt">{ excerpt }</p>
                </div>
                  
            </Link>
        </div>
    );
}
  
export default NewsCardComponent;