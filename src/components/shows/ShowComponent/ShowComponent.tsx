import React, { Component } from 'react';

import { BACKEND_URL } from '../constants';
import { ShowDto, Show } from '../interfaces';

import './ShowComponent.css';
import SocialLinksComponent from '../../shared/SocialLinksComponent/SocialLinksComponent';


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

        fetch(`${ BACKEND_URL }/shows?Slug=${ slug }`)
            .then(response => response.json())
            .then((data: ShowDto[]) => this.parseShow(data[0]))
            .then(show => this.setState({ show }));
    }
    

    componentDidMount () {
        this.fetchShow();
    }

    render () {
        const { show } = this.state;
        const imageSrc = show ? show.showCover.url : '';

        return show ? (
            <article>
                <div className="information">
                    <h1>{ show.title }</h1>
                    <p>{ show.description }</p>
                    <SocialLinksComponent socialLinks={ show.showLinks }/>
                </div>
                <div className="image">
                    <img src={ imageSrc } loading='lazy' alt={ show.showCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}
  
export default ShowComponent;