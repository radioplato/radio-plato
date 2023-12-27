import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';

import SocialButtonsComponent from '../../../shared/social-links/components/social-buttons/SocialButtonsComponent';
import ShowCardComponent from '../../components/show-card/ShowCardComponent';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { ShowDto, Show, ShowCard } from '../../models';

import './ShowComponent.scss';


interface ShowComponentProperties {
    slug: string;
}

interface ShowComponentState {
    show: Show | null;
    showCards: ShowCard[];
}

export class ShowComponent extends Component<ShowComponentProperties> {
    state: ShowComponentState = {
        show: null,
        showCards: []
    }

    parseShow(showDto: ShowDto): Show | null {
        return showDto ? {
            description: showDto.Description,
            showCover: {
                alternativeText: showDto.ShowCover.alternativeText,
                caption: showDto.ShowCover.caption,
                url: showDto.ShowCover.url
            },
            title: showDto.Title,
            slug: showDto.Slug,
            showLinks: {},
            mixcloudPlaylist: showDto.MixcloudPlaylist,
        } : null
    }

    parseShowCard (showDto: ShowDto): ShowCard {
        return {
            excerpt: showDto.Excerpt,
            showCover: {
                alternativeText: showDto.ShowCover.alternativeText,
                caption: showDto.ShowCover.caption,
                url: showDto.ShowCover.url
            },
            slug: showDto.Slug,
            title: showDto.Title,
            author: '',
            isArchived: false
        };
    }

    fetchShow () {
        const { slug } = this.props;

        return fetch(`${ process.env.REACT_APP_BACKEND_URL }/shows?Slug=${ slug }`)
            .then(response => response.json())
            .then((data: ShowDto[]) => this.parseShow(data[0]))
            .then(show => this.setState({ show }));
    }

    fetchShows () {
        return fetch(`${ process.env.REACT_APP_BACKEND_URL }/shows`)
            .then(response => response.json())
            .then((data: ShowDto[]) => data.map(datum => this.parseShowCard(datum)))
            .then(showCards => this.setState({ showCards }));
    }
    

    async componentDidMount () {
        await this.fetchShow();
        await this.fetchShows();
    }

    componentDidUpdate (previousProps: ShowComponentProperties) {
        if (this.props.slug !== previousProps.slug) {
            this.setState({
                show: null,
                showCards: []
            });
            this.componentDidMount();
        }
    }

    render () {
        const { show, showCards } = this.state;
        const imageSrc = show ? show.showCover.url : '';

        return show ? (
            <article className={ `show ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: show.title,
                        description: show.description,
                        thumbnail: imageSrc
                    }}
                />
                <div className='show-description'>
                    <div className='information'>
                        <h1>{ show.title }</h1>
                        <p>{ show.description }</p>
                    </div>
                    <div className='show-cover'>
                        <img src={ imageSrc } loading='lazy' alt={ show.showCover.alternativeText }/>
                    </div>
                </div>
                <div className="title-container">
                    <h2 className="more-shows-title">MORE SHOWS</h2>
                </div>
                <div className="more-shows">
                {
                    showCards.filter(showCard => showCard.slug !== this.state.show?.slug)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(showCard => (<ShowCardComponent key={ showCard.slug } showCard={ showCard }></ShowCardComponent>))
                }
                </div>
            </article>
        ) : null;
    }
}
  
export default ShowComponent;