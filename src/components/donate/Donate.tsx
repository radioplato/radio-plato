import React, { Component } from 'react';

import { BACKEND_URL } from '../shared/constants';
import { DonateDto, Donate } from '../donate/interfaces';

import './Donate.css';

interface DonateComponentState {
    donate: Donate | null
}

export class DonateComponent extends Component {
    state: DonateComponentState = {
        donate: null
    }

    parseDonate(donateDto: DonateDto): Donate | null {
        return donateDto ? {
            title: donateDto.Title,
            description: donateDto.Content,
            donateCover: {
                alternativeText: donateDto.Image.alternativeText,
                caption: donateDto.Image.caption,
                url: donateDto.Image.url
            }
        } : null
    }

    fetchDonate () {
        fetch(`${ BACKEND_URL }/donate`)
            .then(response => response.json())
            .then((data: DonateDto) => this.parseDonate(data))
            .then(donate => this.setState({ donate }));
    }


    componentDidMount () {
        this.fetchDonate();
    }

    render () {
        const { donate } = this.state;
        const imageSrc = donate ? donate.donateCover.url : '';


        return donate ? (
            <article className="about">
                <div className="information">
                    <h1>{ donate.title }</h1>
                    <div className="text-content">{ donate.description }</div>
                </div>
                <div className="image">
                    <img src={ imageSrc } loading='lazy' alt={ donate.donateCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}

export default DonateComponent;