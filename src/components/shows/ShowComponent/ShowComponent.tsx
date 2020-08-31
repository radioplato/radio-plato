import React, { Component } from 'react';

import { isMobile } from 'react-device-detect';

import SocialLinksComponent from '../../shared/SocialLinksComponent/SocialLinksComponent';
import ShowEpisodesComponent from '../ShowEpisodesComponent/ShowEpisodesComponent';

import { Seo } from '../../shared/wrappers/seo/Seo'
import { ShowDto, Show } from '../interfaces';

import './ShowComponent.css';


interface ShowComponentProperties {
    slug: string;
}

interface ShowComponentState {
    show: Show | null
}

export class ShowComponent extends Component<ShowComponentProperties> {
    state: ShowComponentState = {
        show: null
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
            showLinks: {
                mixcloud: showDto.ShowLink.mixcloud,
                spotify: showDto.ShowLink.spotify,
                itunes: showDto.ShowLink.itunes,
                castbox: showDto.ShowLink.castbox,
                facebook: showDto.ShowLink.facebook,
                vk: showDto.ShowLink.vk,
                instagram: showDto.ShowLink.instagram,
                telegram: showDto.ShowLink.telegram, 
            }
        } : null
    }

    fetchShow () {
        const { slug } = this.props;

        fetch(`${ process.env.REACT_APP_BACKEND_URL }/shows?Slug=${ slug }`)
            .then(response => response.json())
            .then((data: ShowDto[]) => this.parseShow(data[0]))
            .then(show => this.setState({ show }));
    }
    

    componentDidMount () {
        this.fetchShow();
    }

    render () {
        const { show } = this.state;
        const { slug } = this.props;
        const imageSrc = show ? show.showCover.url : '';
        const className = `show ${ isMobile ? 'mobile' : 'desktop' }`;

        return show ? (
            <article className={ className }>
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
                        <SocialLinksComponent socialLinks={ show.showLinks }/>
                    </div>
                    <div className='show-cover'>
                        <img src={ imageSrc } loading='lazy' alt={ show.showCover.alternativeText }/>
                    </div>
                </div>
                <ShowEpisodesComponent slug={ slug } />
            </article>
        ) : null;
    }
}
  
export default ShowComponent;