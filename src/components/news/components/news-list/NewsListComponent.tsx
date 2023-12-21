import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import * as qs from 'qs';

import NewsCardComponent from '../news-card/NewsCardComponent';

import { NewsCard, NewsPost } from '../../models';
import { NEWS_CARD_SIZE } from '../../enums';
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../../shared/button/components/Button';
import { ICON_KEY } from '../../../shared/icons/icons';

import './NewsListComponent.scss';

const NEWS_CATEGORIES = [
    'newsroom',
    'fresh',
    'release',
    'events',
    'feature',
    'wishlist',
    'knowledge'
];

interface NewsListComponentProperties extends HTMLAttributes<HTMLElement> {
    isStartPage: boolean;
    category?: string;
}

export function NewsListComponent({
    isStartPage,
    category,
    ...rest
}: NewsListComponentProperties) {
    const history = useHistory();
    const location = useLocation();

    const [newsCards, setNewsCards] = useState<NewsCard[]>([]);
    const [highlightCard, setHighlightCard] = useState<NewsCard | null>(null);
    const [otherCards, setOtherCards] = useState<NewsCard[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isEnd, setEnd] = useState(false);

    const loadNews = () => {
        const query = qs.stringify({
            populate: '*',
            pagination: {
                start: 0,
                limit: isStartPage ? 4 : 6,
            },
            filters: category ? {
                Category: {
                    $eqi: category,
                },
            } : undefined,
            sort: ['publishedAt:desc'],
        });

        setLoading(true);

        fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((datum: NewsPost) => parseNewsCard(datum)))
            .then(newsCards => handleLoadResponse(newsCards));
    }

    const handleLoadResponse = (cards: NewsCard[]) => {
        if (cards) {
            const highlight = cards.length ? cards[0] : null;
            const other = isStartPage ? cards.slice(1, cards.length) : cards;

            setNewsCards(cards);
            setHighlightCard(highlight)
            setOtherCards(other);
            setLoading(false);
        }
    }

    const loadMore = (limit = 6) => {
        const query = qs.stringify({
            populate: '*',
            pagination: {
                start: newsCards.length,
                limit: 6,
            },
            filters: category ? {
                Category: {
                    $eqi: category,
                },
            } : undefined,
            sort: ['publishedAt:desc'],
        });

        fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((datum: NewsPost) => parseNewsCard(datum)))
            .then(newsCards => handleLoadMoreResponse(newsCards));
    }

    const handleLoadMoreResponse = (moreCards: NewsCard[]) => {
        if (moreCards) {
            setNewsCards([...newsCards, ...moreCards]);
            setOtherCards([...otherCards, ...moreCards]);
        }
    }

    useEffect(() => {
        loadNews();
    }, [location, category]);

    const parseNewsCard = (post: NewsPost): NewsCard => {
        return {
            excerpt: post.attributes.Excerpt,
            category: post.attributes.Category?.toLowerCase(),
            newsCover: {
                alternativeText: post.attributes.PostCover.data.attributes.alternativeText,
                caption: post.attributes.PostCover.data.attributes.caption,
                url: post.attributes.PostCover.data.attributes.url
            },
            slug: post.attributes.Slug,
            title: post.attributes.Title,
            publishDate: post.attributes.PublishAt
        };
    }

    const navigateToNewsPage = () => {
        history.push('/news');
    }

    const navigateToCategoryPage = (newsCategory: string) => {
        history.push(`/news/${newsCategory}`);
    }

    const handleLoadMoreButtonClick = () => {
        if (isStartPage) {
            if (newsCards.length < 10) {
                loadMore(6);
            } else {
                navigateToNewsPage();
            }
        } else {
            loadMore(9);
        }
    }

    const renderLoadMoreContainer = () => {
        let iconRotate;
        let icon = ICON_KEY.PLUS_REGULAR;
        let type = BUTTON_TYPE.OUTLINE;
        let label;

        if (isStartPage) {
            if (newsCards.length < 10) {
                label = 'More'
            } else {
                iconRotate = 90; 
                icon = ICON_KEY.ARROW_REGULAR;
                type = BUTTON_TYPE.GHOST;
                label = 'Even more news'
            }
        } else {
            label = 'Load more news';
        }


        return !isLoading ? (
            <div
                className='load-more-container'
                style={{
                    justifyContent: isStartPage ? 'flex-end' : 'center'
                }}
            >
                <Button
                    className='news-list-title-button'
                    type={type}
                    size={BUTTON_SIZE.SMALL}
                    icon={icon}
                    iconPosition={ICON_POSITION.RIGHT}
                    iconRotate={iconRotate}
                    label={label}
                    title='see more news'
                    onClick={handleLoadMoreButtonClick}
                />
            </div>
        ) : null;
    }

    return (
        <div className='news-list-container'>
            <div className='news-list-headline-container'>
                <div className='news-list-headline'>
                    {
                        isStartPage
                            ? (
                                <Button
                                    className='news-list-title-button'
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.LARGE}
                                    icon={ICON_KEY.ARROW_REGULAR}
                                    iconPosition={ICON_POSITION.RIGHT}
                                    iconRotate={90}
                                    label='News'
                                    title='news page'
                                    onClick={navigateToNewsPage}
                                />
                            )
                            : (
                                <div className='news-list-title'>News</div>
                            )
                    }
                    <div className='news-categories-container'>
                        {
                            NEWS_CATEGORIES.map((newsCategory, index) => (
                                <Button
                                    key={`${newsCategory}-${index}`}
                                    className={`category-button ${newsCategory === category ? 'selected' : ''}`}
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.SMALL}
                                    label={newsCategory}
                                    title={`'${newsCategory}' category page`}
                                    onClick={() => navigateToCategoryPage(newsCategory)}
                                ></Button>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                isStartPage && highlightCard
                    ? (<div className='highlight-news-card-container'>
                        <NewsCardComponent key={highlightCard.slug} newsCard={highlightCard} size={NEWS_CARD_SIZE.BIG} />
                    </div>)
                    : null
            }
            <div className='news-cards-container'>
                <div className='news-cards'>
                    {
                        otherCards.map((newsCard: NewsCard) => (
                            <NewsCardComponent key={newsCard.slug} newsCard={newsCard} size={NEWS_CARD_SIZE.SMALL} />
                        ))
                    }
                </div>
                {
                    renderLoadMoreContainer()
                }
            </div>
        </div>
    );
}

export default NewsListComponent;