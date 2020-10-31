import React, { Component } from 'react';
import { Subscription } from 'rxjs';
import moment from 'moment';

import ReactMarkdown from 'react-markdown'

import AdComponent from '../../advertisement/AdComponent/AdComponent';
import adService from '../../advertisement/AdService';

import { Seo } from '../../shared/wrappers/seo/Seo'
import { Advertisement } from '../../advertisement/interfaces';
import { NewsDto, News } from '../interfaces';

import './NewsComponent.css';
import { isMobileOnly } from 'react-device-detect';


interface NewsComponentProperties {
    slug: string;
}

interface NewsComponentState {
    news: News | null,
    advertisement: Advertisement | null
}

const DATE_FORMAT = 'DD.MM.YYYY';

export class NewsComponent extends Component<NewsComponentProperties> {
    state: NewsComponentState = {
        news: null,
        advertisement: null
    };
    subscription: Subscription | null = null;

    parseNews(newsDto: NewsDto): News | null {
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
            }
        } : null
    }

    fetchNews () {
        const { slug } = this.props;

        fetch(`${ process.env.REACT_APP_BACKEND_URL }/posts?Slug=${ slug }`)
            .then(response => response.json())
            .then((data: NewsDto[]) => this.parseNews(data[0]))
            .then(news => this.setState({ news }));
    }
    
    componentDidMount () {
        this.fetchNews();
        this.subscribeOnGalleryChange();
        adService.fetchAdvertisements();
    }

    subscribeOnGalleryChange () {
        this.subscription = adService.subscribeOnNewsPostAdUpdate(
            (advertisement: Advertisement) => this.setState({ advertisement })
        );
    }

    render () {
        const { news, advertisement } = this.state;
        const className = `news ${ isMobileOnly ? 'mobile' : 'desktop' }`;
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
            <article className={ className }>
                <Seo meta={{
                        title: news.title,
                        description: news.excerpt,
                        thumbnail: imageSrc
                    }}
                />
                <div className='news-description' style={ imageStyle }>
                    <div className='news-information'>
                        <h1 className='news-title'>{ news.title }</h1>
                        <p className='news-excerpt'>{ news.excerpt }</p>
                        <p className='news-meta'>
                            { `${ date } ${ wordsBy } ${ photosBy }` }
                        </p>
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
            </article>
        ) : null;
    }
}
  
export default NewsComponent;