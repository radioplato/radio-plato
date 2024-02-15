import React from 'react';

import { Link } from 'react-router-dom';

import { ShowCard } from '../../models';

import './ShowCardComponent.scss';

interface ShowCardProperties {
    showCard: ShowCard
}

function ShowCardComponent({ showCard }: ShowCardProperties) {
    return (
        <Link
            className='show-card'
            to={`/shows/${showCard.slug}`}
        >
            <div
                className='show-image'
                style={{
                    backgroundImage: `url(${showCard.showCover.url})`,
                }}

                title={showCard.title}
            ></div>
            <div className='show-information'>
                <div className='show-content-information'>
                    <div className='show-title'>{showCard.title}</div>
                    <div className='show-author'>{`Show by ${showCard.author}`}</div>
                    <div className='show-excerpt'>{showCard.excerpt}</div>
                </div>
            </div>
        </Link>
    );
}

export default ShowCardComponent;