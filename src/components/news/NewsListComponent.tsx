import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { isMobileOnly } from 'react-device-detect';

import NewsCardComponent from './NewsCardComponent/NewsCardComponent';
import adService from './../advertisement/AdService';

import { NewsDto, NewsCard } from './interfaces';
import { Advertisement } from '../advertisement/interfaces';
import { NewsListTypes } from '../shared/enums';
import { AD_CATEGORY } from './constants';
import { BASIC_SEO_IMG } from '../shared/constants';
import { Seo } from '../shared/wrappers/seo/Seo'

import './NewsListComponent.css';


const NEWS_LIMIT = 12;
const VISIBILITY_LIMIT_PERCENTAGE = 75;
const NEWS = 'NEWS';
const NEWS_LIST_SEO_TITLE = 'News';
const NEWS_LIST_SEO_DESCRIPTION = 'The best place to read about electronic music, both local and global.';
const LOAD_MORE_TEXT = 'LOAD MORE';

interface NewsListComponentProperties {
    type: string;
    category?: string;
}

export class NewsListComponent extends Component<NewsListComponentProperties> {
    state = {
        advertisement: null,
        newsCards: [],
        page: 0,
        loading: false,
        end: false
    }
    subscription: Subscription | null = null;

    parseNewsCard (newsDto: NewsDto): NewsCard {
        return {
            excerpt: newsDto.Excerpt,
            category: newsDto.Category,
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

    sortCardsByDate (first: NewsCard, second: NewsCard) {
        return moment(second.publishDate).diff(moment(first.publishDate));
    }

    handleResponse (newsCards: NewsCard[]) {
        if (newsCards && newsCards.length) {
            const cards = [ ...this.state.newsCards, ...newsCards ].sort(this.sortCardsByDate);

            this.setState({
                newsCards: cards,
                loading: false,
                page: this.state.page + 1
            });
        } else {
            this.setState({ end: true });
        }
    }

    fetchNews = () => {
        const { page } = this.state;
        const { category } = this.props;
        const start = page * NEWS_LIMIT;
        const filter = category ? `Category=${ category[0].toUpperCase() + category.slice(1) }&` : '';

        this.setState({ loading: true });

        fetch(`${ process.env.REACT_APP_BACKEND_URL }/posts?${ filter }_sort=publish_at:DESC&_start=${ start }&_limit=${ NEWS_LIMIT }`)
            .then(response => response.json())
            .then(data => data.map((datum: NewsDto) => this.parseNewsCard(datum)))
            .then(newsCards => this.handleResponse(newsCards));
    }

    advertisementToNewsCard (advertisement: Advertisement | null) {
        return advertisement ? {
            excerpt: advertisement ? advertisement.text : '',
            category: AD_CATEGORY,
            newsCover: advertisement ? advertisement.image : {},
            link: advertisement ? advertisement.link : '',
            title: advertisement ? advertisement.title : '',
            publishDate: advertisement ? advertisement.startDate : ''
        } : null;
    }

    renderSimpleNewsList (newsCards: NewsCard[]) {
        return newsCards.length ? (
            <div className={ `simple-news ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <div className='news-list-title'>
                    <Link to='/news'>
                        <p>{ NEWS }</p>
                    </Link>
                </div>
                { newsCards.slice(0, 3).map(newsCard => (
                    <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard } type='simple' />
                )) }
            </div>
        ) : null;
    }

    renderFullNewsList (newsCards: NewsCard[], advertisement: Advertisement | null) {
        const { loading, end } = this.state;
        const adNewsCard = this.advertisementToNewsCard(advertisement);

        return newsCards.length ? (
            <div onScroll={ this.handleScroll } className={ `news-list ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: NEWS_LIST_SEO_TITLE,
                        description: NEWS_LIST_SEO_DESCRIPTION,
                        thumbnail: BASIC_SEO_IMG
                    }}
                />
                <div className='news-cards'>
                    <div className='latest-news'>
                        <div className='main-news'>
                            <NewsCardComponent key={ newsCards[0].slug } newsCard={ newsCards[0] } type='main' />
                        </div>
                        <div className='fresh-news'>
                            { adNewsCard ? (<NewsCardComponent newsCard={ adNewsCard } type='fresh'/>) : null }
                            { newsCards.slice(1, 5).map(newsCard => (
                                <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard } type='fresh' />
                            )) }
                            
                        </div>
                    </div>
                    <div className='other-news'>
                        { newsCards.slice(5, newsCards.length).map(newsCard => (
                            <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard } type='other' />
                        )) }
                    </div>
                </div>
                { isMobileOnly && !loading && !end && (
                    <div onClick={ this.fetchNews } className="load-more-button">
                        <p>{ LOAD_MORE_TEXT }</p>
                    </div>
                )}
            </div>
        ) : null;
    }

    renderNewsCards (newsCards: NewsCard[], advertisement: Advertisement | null) {
        const { type } = this.props;

        return type === NewsListTypes.Full ? this.renderFullNewsList(newsCards, advertisement) : this.renderSimpleNewsList(newsCards);
    }

    componentDidMount () {
        adService.fetchAdvertisements();
        this.fetchNews();
        this.subscribeOnAdvertisementChange();
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    subscribeOnAdvertisementChange () {
        this.subscription = adService.subscribeOnNewsCardAdUpdate(
            (advertisement: Advertisement) => this.setState({ advertisement })
        );
    }

    handleScroll = (event: any) => {
        const { loading, end } = this.state;
        const container = event.target as Element;
        const percentsScrolled = (container.scrollTop + window.innerHeight) / container.scrollHeight * 100;

        if (percentsScrolled > VISIBILITY_LIMIT_PERCENTAGE) {
            !loading && !end && this.fetchNews();
        }
    }

    render () {
        const {
            advertisement,
            newsCards
        } = this.state;

        return this.renderNewsCards(newsCards, advertisement);
    }
}
  
export default NewsListComponent;