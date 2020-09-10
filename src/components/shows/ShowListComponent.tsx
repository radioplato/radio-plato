import React, { Component } from 'react';

import ShowCardComponent from './ShowCardComponent/ShowCardComponent';

import { Seo } from '../shared/wrappers/seo/Seo'
import { BASIC_SEO_IMG } from '../shared/constants';
import { ShowDto, ShowCard } from './interfaces';

import './ShowListComponent.css';


const SHOW_LIST_SEO_TITLE = 'Shows'
const SHOW_LIST_SEO_DESCRIPTION = 'Awesome shows from Radio Plato crew'


export class ShowListComponent extends Component {
    state = {
        showCards: []
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
            title: showDto.Title
        };
    }

    fetchShows () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/shows`)
            .then(response => response.json())
            .then(data => data.map((datum: ShowDto) => this.parseShowCard(datum)))
            .then(showCards => this.setState({ showCards }));
    }

    renderShowCards (showCards: ShowCard[]) {
        return showCards.map(showCard => (<ShowCardComponent key={ showCard.slug } showCard={ showCard }></ShowCardComponent>))
    }

    componentDidMount () {
        this.fetchShows();
    }

    render () {
        const {
            showCards
        } = this.state;

        return (
            <div className='show-list'>
                 <Seo meta={{
                        title: SHOW_LIST_SEO_TITLE,
                        description: SHOW_LIST_SEO_DESCRIPTION,
                        thumbnail: BASIC_SEO_IMG
                    }}
                />
                <h1>Shows</h1>
                <div className='show-cards'>
                    { this.renderShowCards(showCards) }
                </div>
            </div>
            
        );
    }
}
  
export default ShowListComponent;