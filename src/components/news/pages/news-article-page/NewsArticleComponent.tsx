import React, { useEffect, useState } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';

import ReactMarkdown from 'react-markdown'
import moment from 'moment';
import qs from 'qs';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { Button, BUTTON_TYPE, BUTTON_SIZE, ICON_POSITION } from '../../../shared/button/components/Button';

import { NewsCard, NewsEntry, NewsArticle } from '../../models';
import { NEWS_CARD_SIZE } from '../../enums';

import NewsCardComponent from '../../components/news-card/NewsCardComponent';
import { ICON_KEY } from '../../../shared/icons/icons';
import { DATE_FORMAT } from '../../constants';

import './NewsArticleComponent.scss';

interface NewsArticleComponentProperties {
    slug: string;
}

export function NewsArticleComponent({
    slug
}: NewsArticleComponentProperties) {
    const history = useHistory();
    const location = useLocation();

    const [newsArticle, setNewsArticle] = useState<NewsCard | null>(null);
    const [relatedNewsCards, setRelatedNewsCards] = useState<NewsCard[]>([]);

    const parseNews = (entry: NewsEntry): NewsArticle => {
        return {
            title: entry.attributes.Title,
            content: entry.attributes.Content,
            category: entry.attributes.Category.toLowerCase(),
            wordsBy: entry.attributes.WordsBy,
            photosBy: entry.attributes.PhotosBy,
            excerpt: entry.attributes.Excerpt,
            slug: entry.attributes.Slug,
            publishDate: entry.attributes.PublishAt,
            newsCover: {
                alternativeText: entry.attributes.PostCover.data.attributes.alternativeText,
                caption: entry.attributes.PostCover.data.attributes.caption,
                url: entry.attributes.PostCover.data.attributes.url
            },
        };
    }

    const loadCurrentArticle = () => {
        const query = qs.stringify({
            populate: '*',
            filters: slug ? {
                Slug: {
                    $eqi: slug,
                },
            } : undefined,
        });

        setNewsArticle(null);

        return fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data[0] ? parseNews(data.data[0]) : null)
            .then(article => setNewsArticle(article));
    }

    const loadLastArticles = () => {
        const category = newsArticle?.category;
        const query = qs.stringify({
            populate: '*',
            pagination: {
                start: 0,
                limit: 9,
            },
            filters: category ? {
                Category: {
                    $eqi: category,
                },
            } : undefined,
            sort: ['publishedAt:desc'],
        });

        return fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((entry: NewsEntry) => parseNews(entry)))
            .then(cards => setRelatedNewsCards(cards));
    }

    useEffect(() => {
        loadCurrentArticle();
    }, [location]);

    useEffect(() => {
        loadLastArticles();
    }, [newsArticle]);

    const navigateToCategoryPage = (newsCategory: string) => {
        history.push(`/news/${newsCategory}`);
    }

    const navigateToNewsPage = () => {
        history.push('/news');
    }

    return newsArticle ? (
        <article className='news'>
            <Seo meta={{
                title: newsArticle.title,
                description: newsArticle.excerpt,
                thumbnail: newsArticle.newsCover.url ?? '',
                type: 'article',
            }}
            />
            <div className='news-description' style={{
                backgroundImage: `url(${newsArticle.newsCover.url})`
            }}>
                <div className='news-information'>
                    <h1 className='news-title'>{newsArticle.title}</h1>
                    <p className='news-excerpt'>{newsArticle.excerpt}</p>
                    <div className='news-service-information'>
                        <div className='news-date'>{moment(newsArticle.publishDate).format(DATE_FORMAT)}</div>
                        <div className='separator'></div>
                        <Button
                            className='category-button'
                            type={BUTTON_TYPE.GHOST}
                            size={BUTTON_SIZE.SMALL}
                            label={newsArticle.category}
                            title={`more news from the '${newsArticle.category}' category`}
                            onClick={() => navigateToCategoryPage(newsArticle.category)}
                        />
                    </div>
                </div>
            </div>
            <div className='news-content-container'>
                <div className='news-content'>
                    <ReactMarkdown
                        source={newsArticle.content}
                        escapeHtml={false}
                        renderers={{ link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a> }}
                    />
                </div>
            </div>
            <div className='more-news-headline-container'>
                <div className='more-news-headline'>
                    <div className='more-news-title'>More like this</div>
                </div>
            </div>
            <div className='more-news-cards-container'>
                <div className='more-news-cards'>
                    {
                        relatedNewsCards.length
                        ? relatedNewsCards.filter(card => card && card.slug !== newsArticle?.slug)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map(relatedCard => (
                                <NewsCardComponent key={relatedCard.slug} newsCard={relatedCard} size={NEWS_CARD_SIZE.SMALL} />
                            ))
                        : null
                    }
                </div>
                <div className='load-more-container'>
                    <Button
                        type={BUTTON_TYPE.GHOST}
                        size={BUTTON_SIZE.SMALL}
                        icon={ICON_KEY.ARROW_REGULAR}
                        iconPosition={ICON_POSITION.RIGHT}
                        iconRotate={90}
                        label='Even more news'
                        title='even more news'
                        onClick={navigateToNewsPage}
                    />
                </div>
            </div>
        </article>
    ) : null;
}

export default NewsArticleComponent;