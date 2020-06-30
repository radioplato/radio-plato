import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown'

import { BACKEND_URL } from '../../shared/constants';
import { NewsDto, News } from '../interfaces';

import './NewsComponent.css';
import moment from 'moment';


interface NewsComponentProperties {
    slug: string;
}

interface NewsComponentState {
    news: News | null
}

const DATE_FORMAT = 'DD.MM.YYYY';

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
        const imageStyle = {
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: `url(${ imageSrc })`
        }
        const date = moment(news?.publishDate).format(DATE_FORMAT);
        const wordsBy = news?.wordsBy ? `| Author: ${ news.wordsBy }` : '';
        const photosBy = news?.photosBy ? `| Ph.: ${ news.photosBy }` : '';

        return news ? (
            <article className="news">
                <div className="news-description" style={ imageStyle }>
                    <div className="news-information">
                        <h1 className="news-title">{ news.title }</h1>
                        <p className="news-excerpt">{ news.excerpt }</p>
                        <p className="news-meta">
                            { `${ date } ${ wordsBy } ${ photosBy }` }
                        </p>
                    </div>
                </div>
                <div className="news-content-container">
                    <div className="news-content">
                        <ReactMarkdown source={ news.content } escapeHtml={ false } />
                    </div>
                </div>
            </article>
        ) : null;
    }
}
  
export default NewsComponent;