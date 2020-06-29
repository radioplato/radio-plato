import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown'

import { BACKEND_URL } from '../../shared/constants';
import { NewsDto, News } from '../interfaces';

import './NewsComponent.css';


interface NewsComponentProperties {
    slug: string;
}

interface NewsComponentState {
    news: News | null
}

export class NewsComponent extends Component<NewsComponentProperties> {
    state: NewsComponentState = {
        news: null
    }

    parseNews(newsDto: NewsDto): News | null {
        return newsDto ? {
            title: newsDto.Title,
            content: newsDto.Content,
            wordsBy: newsDto.WordsBy,
            photosBy: newsDto.PhotosBy,
            excerpt:  newsDto.Excerpt,
            slug: newsDto.Slug,
            publishDate: newsDto.PublishDate,
            newsCover: {
                alternativeText: newsDto.PostCover.alternativeText,
                caption: newsDto.PostCover.caption,
                url: newsDto.PostCover.url
            }
        } : null
    }

    fetchNews () {
        const { slug } = this.props;

        fetch(`${ BACKEND_URL }/posts?Slug=${ slug }`)
            .then(response => response.json())
            .then((data: NewsDto[]) => this.parseNews(data[0]))
            .then(news => this.setState({ news }));
    }
    

    componentDidMount () {
        this.fetchNews();
    }

    render () {
        const { news } = this.state;
        const imageSrc = news ? news.newsCover.url : '';

        return news ? (
            <article className="news">
                <div className="news-description">
                    <div className="information">
                        <h1>{ news.title }</h1>
                        <p>{ news.excerpt }</p>
                    </div>
                    <div className="news-cover">
                        <img src={ imageSrc } loading='lazy' alt={ news.newsCover.alternativeText }/>
                    </div>
                </div>
                <hr className="separator" />
                <div className="news-content-container">
                    <div className="news-content">
                        <ReactMarkdown source={ news.content } />
                    </div>
                </div>
            </article>
        ) : null;
    }
}
  
export default NewsComponent;