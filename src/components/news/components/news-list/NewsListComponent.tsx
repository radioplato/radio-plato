import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

import NewsCardComponent from '../news-card/NewsCardComponent';

import { NewsDto, NewsCard } from '../../interfaces';
import { NEWS_CARD_SIZE } from '../../enums';
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../../shared/button/components/Button';
import { ICON_KEY } from '../../../shared/icons/icons';

import './NewsListComponent.scss';

const NEWS_LIMIT = 12;

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

    const [newsCards, setNewsCards] = useState<NewsCard[]>([]);
    const [highlightCard, setHighlightCard] = useState<NewsCard | null>(null);
    const [otherCards, setOtherCards] = useState<NewsCard[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [isEnd, setEnd] = useState(false);

    const fetchNews = () => {
        const start = page * NEWS_LIMIT;
        const filter = category ? `Category=${category[0].toUpperCase() + category.slice(1)}&` : '';

        setLoading(true);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/posts?${filter}_sort=publish_at:DESC&_start=${start}&_limit=${NEWS_LIMIT}`)
            .then(response => response.json())
            .then(data => data.map((datum: NewsDto) => parseNewsCard(datum)))
            .then(newsCards => handleResponse(newsCards));
    }

    useEffect(() => {
        if (!isLoading) {
            fetchNews();
        }
    }, []);

    const parseNewsCard = (newsDto: NewsDto): NewsCard => {
        return {
            excerpt: newsDto.Excerpt,
            category: newsDto.Category.toLowerCase(),
            newsCover: {
                alternativeText: newsDto.PostCover.alternativeText,
                caption: newsDto.PostCover.caption,
                url: newsDto.PostCover.url
            },
            slug: newsDto.Slug,
            title: newsDto.Title,
            publishDate: newsDto.publish_at
        };
    }

    const sortCardsByDate = (first: NewsCard, second: NewsCard) => {
        return moment(second.publishDate).diff(moment(first.publishDate));
    }

    const handleResponse = (moreCards: NewsCard[]) => {
        if (moreCards && moreCards.length) {
            const cards = [...newsCards, ...moreCards].sort(sortCardsByDate);
            const highlight = cards.length ? cards[0] : null;
            const other = isStartPage ? cards.slice(1, cards.length) : cards;

            setNewsCards(cards);
            setHighlightCard(highlight)
            setOtherCards(other);
            setLoading(false);
            setPage(page + 1);
        } else {
            setEnd(true);
        }
    }

    const navigateToNewsPage = () => {
        history.push('/news');
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
                                    onClick={navigateToNewsPage}
                                />
                            )
                            : (
                                <div className='news-list-title'>News</div>
                            )
                    }
                    <div className='news-tags-container'>

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
                        otherCards.slice().map((newsCard: NewsCard) => (
                            <NewsCardComponent key={newsCard.slug} newsCard={newsCard} size={NEWS_CARD_SIZE.SMALL} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default NewsListComponent;