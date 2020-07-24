import React from 'react';
import { Link } from 'react-router-dom';

import { NewsCard } from '../interfaces';
import { AD_CATEGORY } from '../constants';

import './NewsCardComponent.css';


interface LinkElementParameters {
    children: React.ReactNode;
    newsCard: NewsCard;
}

interface TagElementParameters {
    category: string;
}

interface NewsCardParameters {
    newsCard: NewsCard;
    type?: string;
}

function LinkElement({ newsCard, children }: LinkElementParameters) {
    const slug = newsCard.slug;
    const route = `/news/${ newsCard.category.toLowerCase() }/${ slug }`;

    return slug ? <Link to={ route } title={ newsCard.title }>{ children }</Link> : <a href={ newsCard.link } title={ newsCard.title }>{ children }</a>;
}

function TagElement({ category }: TagElementParameters) {
    const link = `/news/${ category.toLowerCase() }`;
    const tag = `∙ ${ category } ∙`;

    return category !== AD_CATEGORY ? <Link to={ link } title={ category } className='news-card-tag'>{ tag }</Link> : <p className='news-card-tag'>{ tag }</p>
}

function NewsCardComponent({ newsCard, type }: NewsCardParameters) {
    const {
        excerpt,
        newsCover,
        title,
        category
    } = newsCard;

    return (
        <div className={ `news-card ${ type }` }>
            <div className='news-card-image'>
                <LinkElement newsCard={ newsCard }>
                    <img src={ newsCover.url } loading='lazy' alt={ newsCover.alternativeText }/>
                </LinkElement>
            </div>
            <div className='news-card-text'>
                <TagElement category={ category } />
                <LinkElement newsCard={ newsCard }>
                    <h2>{ title }</h2>
                    <p className='news-card-excerpt'>{ excerpt }</p>
                </LinkElement>
            </div>
        </div>
    );
}
  
export default NewsCardComponent;