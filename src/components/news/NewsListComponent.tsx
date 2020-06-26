import React, { Component } from 'react';

import NewsCardComponent from './NewsCardComponent/NewsCardComponent';

import { NewsDto, NewsCard } from './interfaces';
import { BACKEND_URL } from '../shared/constants';

import './NewsListComponent.css';


export class NewsListComponent extends Component {
    state = {
        newsCards: []
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
            title: newsDto.Title
        };
    }

    fetchNews () {
        fetch(`${ BACKEND_URL }/posts?_sort=PublishDate:DESC`)
            .then(response => response.json())
            .then(data => data.map((datum: NewsDto) => this.parseNewsCard(datum)))
            .then(newsCards => this.setState({ newsCards }));
    }

    renderNewsCards (newsCards: NewsCard[]) {
        // <NewsCardComponent key={ newsCard.slug } newsCard={ newsCard }></NewsCardComponent>
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

    render () {
        const {
            newsCards
        } = this.state;

        return (
            <div className="news-list">
                <div className="news-cards">
                    { this.renderNewsCards(newsCards) }
                </div>
            </div>
            
        );
    }
}
  
export default NewsListComponent;