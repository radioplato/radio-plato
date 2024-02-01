import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ReactMarkdown from 'react-markdown'
import moment from 'moment';
import qs from 'qs';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { Button, BUTTON_TYPE, BUTTON_SIZE, ICON_POSITION } from '../../../shared/button/components/Button';
import NewsCardComponent from '../../components/news-card/NewsCardComponent';

import { NewsCard, NewsEntry, NewsArticle, NewsArticleLocalization } from '../../models';
import { Locale, NEWS_CARD_SIZE } from '../../enums';

import { ICON_KEY } from '../../../shared/icons/icons';
import { DATE_FORMAT } from '../../constants';

import './NewsArticleComponent.scss';

interface NewsArticleComponentProperties {
    slug: string;
}

const mapLocaleToLabel = new Map([
    [Locale.Belarusian, 'belarusian'],
    [Locale.English, 'english'],
    [Locale.Russian, 'russian']
]);

export function NewsArticleComponent({
    slug
}: NewsArticleComponentProperties) {
    const history = useHistory();
    const location = useLocation();

    const [newsArticle, setNewsArticle] = useState<NewsArticle | null>(null);
    const [relatedNewsCards, setRelatedNewsCards] = useState<NewsCard[]>([]);
    const [currentLocale, setCurrentLocale] = useState<Locale | null>(Locale.English);

    const parseNews = (entry: NewsEntry): NewsCard => {
        return {
            title: entry.attributes.Title,
            content: entry.attributes.Content,
            category: entry.attributes.Category.toLowerCase(),
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

    const parseLocalization = (entry: NewsEntry): NewsArticleLocalization => {
        return {
            locale: entry.attributes.locale,
            label: mapLocaleToLabel.get(entry.attributes.locale),
            title: entry.attributes.Title,
            excerpt: entry.attributes.Excerpt,
            content: entry.attributes.Content,
        };
    }

    const parseArticle = (entry: NewsEntry): NewsArticle => {
        return {
            title: entry.attributes.Title,
            content: entry.attributes.Content,
            category: entry.attributes.Category.toLowerCase(),
            excerpt: entry.attributes.Excerpt,
            slug: entry.attributes.Slug,
            publishDate: entry.attributes.PublishAt,
            locale: entry.attributes.locale,
            newsCover: {
                alternativeText: entry.attributes.PostCover.data.attributes.alternativeText,
                caption: entry.attributes.PostCover.data.attributes.caption,
                url: entry.attributes.PostCover.data.attributes.url
            },
            localizations: entry.attributes.localizations && entry.attributes.localizations.data && entry.attributes.localizations.data.length
                ? entry.attributes.localizations.data
                    .map((datum) => parseLocalization(datum))
                    .concat([parseLocalization(entry)])
                : [parseLocalization(entry)],
        }

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

        return fetch(`${process.env.REACT_APP_BACKEND_URL}/posts?${query}`)
            .then(response => response.json())
            .then(data => data.data[0] ? parseArticle(data.data[0]) : null)
            .then((article: NewsArticle | null): void => {
                setNewsArticle(article);
                setCurrentLocale(article?.locale ?? Locale.English)
            });
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

        return fetch(`${process.env.REACT_APP_BACKEND_URL}/posts?${query}`)
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
                    <h1 className='news-title'>{newsArticle.localizations.find((localization) => localization.locale === currentLocale)?.title}</h1>
                    <p className='news-excerpt'>{newsArticle.localizations.find((localization) => localization.locale === currentLocale)?.excerpt}</p>
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
            {
                newsArticle.localizations && newsArticle.localizations.length > 1
                    ? (
                        <div className='localization-button-container'>
                            {
                                newsArticle.localizations
                                    .filter((localization) => localization.locale !== currentLocale)
                                    .map((localization) => (
                                        <Button
                                            key={localization.locale}
                                            className='localization-button'
                                            type={BUTTON_TYPE.OUTLINE}
                                            size={BUTTON_SIZE.SMALL}
                                            label={`read in ${localization.label}`}
                                            title={`read in ${localization.label}`}
                                            onClick={() => setCurrentLocale(localization.locale)}
                                        />
                                    ))
                            }
                        </div>
                    )
                    : null
            }
            <div className='news-content-container'>
                <div className='news-content'>
                    <ReactMarkdown
                        source={newsArticle.localizations.find((localization) => localization.locale === currentLocale)?.content}
                        escapeHtml={navigator.userAgent === 'ReactSnap'}
                        renderers={{
                            link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
                        }}
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