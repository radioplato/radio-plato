import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import moment from 'moment';

import ReactMarkdown from 'react-markdown'

import AdComponent from '../../../advertisement/AdComponent/AdComponent';
import adService from '../../../advertisement/AdService';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { Advertisement } from '../../../advertisement/interfaces';
import { NewsDto, News } from '../../interfaces';

import { isMobileOnly } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Locale, LocaleString } from '../../../shared/interfaces';
import { DATE_FORMAT } from '../../constants';

import './NewsArticleComponent.scss';


const localeStringByLocale = new Map([
    [ Locale.English, LocaleString.English ],
    [ Locale.Belorussian, LocaleString.Belorussian ],
    [ Locale.Russian, LocaleString.Russian ],
]);

interface NewsArticleComponentProperties {
    slug: string;
}

interface NewsArticleComponentState {
    news: News | null,
    advertisement: Advertisement | null,
    articles: News[],
    locales: Locale[],
    currentLocale: Locale
}

export class NewsArticleComponent extends Component<NewsArticleComponentProperties> {
    state: NewsArticleComponentState = {
        news: null,
        advertisement: null,
        articles: [],
        locales: [ Locale.English ],
        currentLocale: Locale.English
    };
    subscription: Subscription | null = null;

    parseNews(newsDto: NewsDto, isCurrent = false): News | null {
        if (newsDto && isCurrent) {
            const currentLocale = newsDto.locale;
            const locales = Array.from(new Set([
                currentLocale,
                ...newsDto.localizations.map(localization => localization.locale),
            ])).sort();

            this.setState({ locales, currentLocale });
        }

        return newsDto ? {
            title: newsDto.Title,
            content: newsDto.Content,
            category: newsDto.Category,
            wordsBy: newsDto.WordsBy,
            photosBy: newsDto.PhotosBy,
            excerpt:  newsDto.Excerpt,
            slug: newsDto.Slug,
            publishDate: newsDto.publish_at,
            newsCover: {
                alternativeText: newsDto.PostCover.alternativeText,
                caption: newsDto.PostCover.caption,
                url: newsDto.PostCover.url
            },
            locale: newsDto.locale,
            localizations: newsDto.localizations
        } : null
    }

    fetchCurrentArticle (locale: Locale = Locale.English) {
        const { slug } = this.props;
        const localeString = localeStringByLocale.get(locale)?.toLowerCase();
        const localePostfix = locale === Locale.English ? '' : `-${ localeString }`;

        return fetch(`${ process.env.REACT_APP_BACKEND_URL }/posts?Slug=${ slug }${ localePostfix }&_locale=${ locale }`)
            .then(response => response.json())
            .then((data: NewsDto[]) => this.parseNews(data[0], true))
            .then(news => this.setState({ news }));
    }

    fetchLastArticles () {
        const category = this.state.news?.category;
        const filter = category ? `Category=${ category[0].toUpperCase() + category.slice(1) }&` : '';

        return fetch(`${ process.env.REACT_APP_BACKEND_URL }/posts?${ filter }_sort=publish_at:DESC&_start=0&_limit=10`)
            .then(response => response.json())
            .then((data: NewsDto[]) => data.map(datum => this.parseNews(datum)))
            .then(articles => this.setState({ articles }));
    }
    
    async componentDidMount () {
        await this.fetchCurrentArticle();

        this.subscribeOnGalleryChange();
        adService.fetchAdvertisements();

        await this.fetchLastArticles();
    }

    componentDidUpdate (previousProps: NewsArticleComponentProperties) {
        if (this.props.slug !== previousProps.slug) {
            this.setState({
                news: null,
                advertisement: null,
                articles: []
            });
            this.componentDidMount();
        }
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    subscribeOnGalleryChange () {
        this.subscription = adService.subscribeOnNewsPostAdUpdate(
            (advertisement: Advertisement) => this.setState({ advertisement })
        );
    }

    changeLocale (currentLocale: Locale) {
        this.setState({ currentLocale });
        this.fetchCurrentArticle(currentLocale)
    }

    render () {
        const { news, advertisement, locales, currentLocale } = this.state;
        const imageSrc = news ? news.newsCover.url : '';
        const imageStyle = {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: `url(${ imageSrc })`
        }
        const date = moment(news?.publishDate).format(DATE_FORMAT);
        const wordsBy = news?.wordsBy ? `| Author: ${ news.wordsBy }` : '';
        const photosBy = news?.photosBy ? `| Photo by: ${ news.photosBy }` : '';

        return news ? (
            <article className={ `news ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: news.title,
                        description: news.excerpt,
                        thumbnail: imageSrc,
                        type: 'article',
                    }}
                />
                <div className='news-description' style={ imageStyle }>
                    <div className='news-information'>
                        <h1 className='news-title'>{ news.title }</h1>
                        <p className='news-excerpt'>{ news.excerpt }</p>
                        <p className='news-meta'>
                            { `${ date } ${ wordsBy } ${ photosBy }` }
                        </p>
                        { locales.length > 1 && (
                            <div className='language-toggle-container'>
                                { locales.map(locale => (
                                    <div className={ `language-toggle-button ${ locale === currentLocale && 'active' }` } key={ locale } onClick={ () => this.changeLocale(locale) }>
                                        { localeStringByLocale.get(locale) }
                                    </div>  
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='news-content-container'>
                    <div className='news-content'>
                        <ReactMarkdown
                            source={ news.content }
                            escapeHtml={ false }
                            renderers={{ link: props => <a href={ props.href } target="_blank" rel="noopener noreferrer">{ props.children }</a> }}
                        />
                    </div>
                </div>
                { advertisement ? (<AdComponent advertisement={ advertisement } />) : null }
                <h2 className="more-news-title">MORE NEWS</h2>
                <div className="more-news">
                    {
                        this.state.articles.filter(article => article.slug !== this.state.news?.slug)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map(article => (
                                <Link to={ `../../../news/${ article.category.toLowerCase() }/${ article.slug }` } title={ article.title } key={ article.slug }>
                                    <div className={ `card ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                                        <img src={ article.newsCover.url } loading='lazy' alt={ article.newsCover.alternativeText }/>
                                        <h2>{ article.title }</h2>
                                        <p>{ article.excerpt }</p>
                                    </div>    
                                </Link>
                            ))
                    }
                </div>
            </article>
        ) : null;
    }
}
  
export default NewsArticleComponent;