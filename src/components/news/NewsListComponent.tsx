import React, { Component } from 'react';
import { Subscription } from 'rxjs';

import NewsCardComponent from './NewsCardComponent/NewsCardComponent';
import adService from './../advertisement/AdService';

import { NewsDto, NewsCard } from './interfaces';
import { BACKEND_URL, BASIC_SEO_IMG } from '../shared/constants';
import Seo from '../shared/seo/Seo'

import './NewsListComponent.css';
import moment from 'moment';
import { Advertisement } from '../advertisement/interfaces';
import { NewsListTypes } from '../shared/enums';
import { Link } from 'react-router-dom';


const NEWS_LIMIT = 12;
const VISIBILITY_LIMIT = 800;
const NEWS = 'NEWS';
const NEWS_LIST_SEO_TITLE = 'News'
const NEWS_LIST_SEO_DESCRIPTION = 'The best place to read about electronic music, both local and global.'



interface NewsListComponentProperties {
    type: string;
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
            newsCover: {
                alternativeText: newsDto.PostCover.alternativeText,
                caption: newsDto.PostCover.caption,
                url: newsDto.PostCover.url
            },
            slug: newsDto.Slug,
            title: newsDto.Title,
            publishDate: newsDto.PublishDate
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

    fetchNews () {
        const { page } = this.state;
        const start = page * NEWS_LIMIT;

        this.setState({ loading: true });

        fetch(`${ BACKEND_URL }/posts?_sort=PublishDate:DESC&_start=${ start }&_limit=${ NEWS_LIMIT }`)
            .then(response => response.json())
            .then(data => data.map((datum: NewsDto) => this.parseNewsCard(datum)))
            .then(newsCards => this.handleResponse(newsCards));
    }

    advertisementToNewsCard (advertisement: Advertisement | null) {
        return {
            excerpt: advertisement ? advertisement.text : '',
            newsCover: advertisement ? advertisement.image : {},
            link: advertisement ? advertisement.link : '',
            title: advertisement ? advertisement.title : '',
            publishDate: advertisement ? advertisement.startDate : ''
        };
    }

    renderSimpleNewsList (newsCards: NewsCard[]) {
        return newsCards.length ? (
            <div className='simple-news'>
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
        const adNewsCard = this.advertisementToNewsCard(advertisement);

        return newsCards.length ? (
            <div onScroll={ this.handleScroll } className='news-list'>
                <Seo   
                    title={NEWS_LIST_SEO_TITLE}
                    description={NEWS_LIST_SEO_DESCRIPTION}
                    thumbnail={BASIC_SEO_IMG}
                />
                <div className='news-cards'>
                    <div className='latest-news'>
                        <div className='main-news'>
                            <NewsCardComponent key={ newsCards[0].slug } newsCard={ newsCards[0] } type='main' />
                        </div>
                        <div className='fresh-news'>
                            <NewsCardComponent newsCard={ adNewsCard } type='fresh'/>
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
            </div>
        ) : null;
    }

    renderNewsCards (newsCards: NewsCard[], advertisement: Advertisement | null) {
        const { type } = this.props;
        console.log(type)

        return type === NewsListTypes.Full ? this.renderFullNewsList(newsCards, advertisement) : this.renderSimpleNewsList(newsCards);
    }

    componentDidMount () {
        adService.fetchAdvertisements();
        this.fetchNews();
        this.subscribeOnAdvertisementChange();
    }

    subscribeOnAdvertisementChange () {
        this.subscription = adService.subscribeOnNewsCardAdUpdate(
            (advertisement: Advertisement) => this.setState({ advertisement })
        );
    }

    handleScroll = (event: any) => {
        const { loading, end } = this.state;

        if (event.target.scrollHeight - event.target.scrollTop < VISIBILITY_LIMIT) {
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