import React, { Component } from 'react';

import ShowCardComponent from './ShowCardComponent/ShowCardComponent';

import { ShowDto, ShowCard } from './interfaces';
import { BACKEND_URL } from './constants';

import './ShowListComponent.css';


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
        fetch(`${ BACKEND_URL }/shows`)
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
            <div className="show-list">
                <h1>Shows</h1>
                <div className="show-cards">
                    { this.renderShowCards(showCards) }
                </div>
            </div>
            
        );
    }
}
  
export default ShowListComponent;