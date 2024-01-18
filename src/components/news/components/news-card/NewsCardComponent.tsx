import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import moment from 'moment';

import { NewsCard } from '../../models';
import { NEWS_CARD_SIZE } from '../../enums';

import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../shared/button/components/Button';
import { DATE_FORMAT } from '../../constants';

import './NewsCardComponent.scss';

interface NewsCardProperties {
    newsCard: NewsCard;
    size: NEWS_CARD_SIZE;
}

function NewsCardComponent({ newsCard, size }: NewsCardProperties) {
    const history = useHistory();

    const navigateToCategory = (category: string) => {
        history.push(`/news/${category}`)
    }

    return (
        <div className={ `news-card ${ size }` }>
            <Link
                className='news-image-container'
                to={`/news/${newsCard.category}/${newsCard.slug}`}
                title={newsCard.title}
            >
                <img className='news-image' src={newsCard.newsCover.url}/>
            </Link>
            <div className='news-information'>
                <div className='news-service-information'>
                    <div className='news-date'>{moment(newsCard.publishDate).format(DATE_FORMAT)}</div>
                    <div className='separator'></div>
                    <Button
                        className='category-button'
                        type={BUTTON_TYPE.GHOST}
                        size={BUTTON_SIZE.SMALL}
                        label={newsCard.category}
                        title={`more news from the '${newsCard.category}' category`}
                        onClick={() => navigateToCategory(newsCard.category)}
                    />
                </div>
                <Link to={`/news/${newsCard.category}/${newsCard.slug}`}>
                    <div className='news-content-information'>
                        <div className='news-title'>{newsCard.title}</div>
                        <div className='news-excerpt'>{newsCard.excerpt}</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
  
export default NewsCardComponent;