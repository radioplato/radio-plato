import React, { Component } from 'react';

import NewsCardComponent from './NewsCardComponent/NewsCardComponent';

import { NewsDto, NewsCard } from './interfaces';
import { BACKEND_URL } from '../shared/constants';

import './NewsListComponent.css';
import moment from 'moment';


const NEWS_LIMIT = 9;
const VISIBILITY_LIMIT = 800;

export class NewsListComponent extends Component {
    state = {
        newsCards: [],
        page: 0,
        loading: false,
        end: false
    }

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

    renderNewsCards (newsCards: NewsCard[]) {
        return newsCards.length ? (
            <>
                <div className="latest-news">
                    <div className="main-news">
                        <NewsCardComponent key={ newsCards[0].slug } newsCard={ newsCards[0] } type="main"></NewsCardComponent>
                    </div>
                    <div className="fresh-news">
                        { newsCards.slice(1, 3).map(newsCard => (
                            <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard } type="fresh"></NewsCardComponent>
                        )) }
                    </div>
                </div>
                <div className="other-news">
                    { newsCards.slice(3, newsCards.length).map(newsCard => (
                        <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard } type="other"></NewsCardComponent>
                    )) }
                </div>
            </>
        ) : null;
    }

    componentDidMount () {
        this.fetchNews();
    }

    handleScroll = (event: any) => {
        const { loading, end } = this.state;

        if (event.target.scrollHeight - event.target.scrollTop < VISIBILITY_LIMIT) {
            !loading && !end && this.fetchNews();
        }
    }

    render () {
        const {
            newsCards
        } = this.state;

        return (
            <div onScroll={ this.handleScroll } className="news-list">
                <div className="news-cards">
                    { this.renderNewsCards(newsCards) }
                </div>
            </div>
            
        );
    }
}
  
export default NewsListComponent;