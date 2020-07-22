import React from 'react';
import { Link } from 'react-router-dom';

import { NewsCard } from '../interfaces';

import './NewsCardComponent.css';


interface LinkElementParameters {
    children: React.ReactNode,
    newsCard: NewsCard,
}

interface NewsCardParameters {
    newsCard: NewsCard,
    type?: string
}

function LinkElement({ newsCard, children }: LinkElementParameters) {
    const slug = newsCard.slug;
    const route = `/news/${ slug }`;

    return slug ? <Link to={ route } title={ newsCard.title }>{ children }</Link> : <a href={ newsCard.link } title={ newsCard.title }>{ children }</a>;
}

function NewsCardComponent({ newsCard, type }: NewsCardParameters) {
    const {
        excerpt,
        newsCover,
        title,
    } = newsCard;

    return (
        <div className={ `news-card ${ type }` }>
            <LinkElement newsCard={ newsCard }>
                <div className='news-card-image'>
                    <img src={ newsCover.url } loading='lazy' alt={ newsCover.alternativeText }/>
                </div>
                <div className='news-card-text'>
                    <h2>{ title }</h2>
                    <p className='news-card-excerpt'>{ excerpt }</p>
                </div>
            </LinkElement>
        </div>
    );
}
  
export default NewsCardComponent;