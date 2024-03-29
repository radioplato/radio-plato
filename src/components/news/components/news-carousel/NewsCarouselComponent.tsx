import React, { useEffect, useState } from 'react';

import * as qs from 'qs';

import NewsCardComponent from '../news-card/NewsCardComponent';

import { NewsCard, NewsEntry } from '../../models';
import { NEWS_CARD_SIZE } from '../../enums';
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../../shared/button/components/Button';
import { ICON_KEY } from '../../../shared/icons/icons';

import './NewsCarouselComponent.scss';

export function NewsCarouselComponent() {
    const [newsCards, setNewsCards] = useState<NewsCard[]>([]);
    const [currentNewsCard, setCurrentNewsCard] = useState<NewsCard | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setLoading] = useState(false);

    const loadNews = () => {
        const query = qs.stringify({
            populate: '*',
            filters: {
                Highlight: {
                    $eqi: true,
                },
            },
            sort: ['publishedAt:desc'],
        });

        setLoading(true);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((entry: NewsEntry) => parseNewsCard(entry)).sort(() => .6 - Math.random()).sort( () => .4 - Math.random()))
            .then(newsCards => handleLoadResponse(newsCards));
    }

    const handleLoadResponse = (cards: NewsCard[]) => {
        if (cards && cards.length) {
            setCurrentNewsCard(cards[0]);
            setCurrentIndex(1);
            setNewsCards(cards);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNews();
    }, []);

    const parseNewsCard = (entry: NewsEntry): NewsCard => {
        return {
            excerpt: entry.attributes.Excerpt,
            category: entry.attributes.Category?.toLowerCase(),
            newsCover: {
                alternativeText: entry.attributes.PostCover.data.attributes.alternativeText,
                caption: entry.attributes.PostCover.data.attributes.caption,
                url: entry.attributes.PostCover.data.attributes.url
            },
            slug: entry.attributes.Slug,
            title: entry.attributes.Title,
            publishDate: entry.attributes.PublishAt
        };
    }

    const navigate = (offset: 1 | -1) => {
        let expectedIndex = currentIndex + offset;

        if (expectedIndex === 0) {
            expectedIndex = newsCards.length;
        } else if (expectedIndex > newsCards.length) {
            expectedIndex = 1;
        }

        const expectedNewsCard = newsCards[expectedIndex - 1];

        setCurrentNewsCard(expectedNewsCard)
        setCurrentIndex(expectedIndex);
    }

    return (
        <div className='news-carousel-container'>
            <div className='news-carousel-headline-container'>
                <div className='news-carousel-headline'>
                    <div className='news-carousel-title'>
                        <p>Highlights</p>
                    </div>
                    {
                        !isLoading ? (
                            <div className='news-navigation'>
                                <Button
                                    className='news-navigation-button'
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.LARGE}
                                    icon={ICON_KEY.CHEVRON_REGULAR}
                                    iconPosition={ICON_POSITION.RIGHT}
                                    iconRotate={-90}
                                    title='see more news'
                                    onClick={() => navigate(-1)}
                                />
                                <div className='news-navigation-counter'>{`${currentIndex} / ${newsCards.length}`}</div>
                                <Button
                                    className='news-navigation-button'
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.LARGE}
                                    icon={ICON_KEY.CHEVRON_REGULAR}
                                    iconPosition={ICON_POSITION.RIGHT}
                                    iconRotate={90}
                                    title='see more news'
                                    onClick={() => navigate(1)}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className='highlight-carousel-container'>
                {
                    currentNewsCard ? (
                        <div className='news-card-wrapper'>
                            <NewsCardComponent newsCard={currentNewsCard} size={NEWS_CARD_SIZE.BIG} />
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}

export default NewsCarouselComponent;