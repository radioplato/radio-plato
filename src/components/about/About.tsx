import React, { Component } from 'react';

import { BACKEND_URL } from '../shared/constants';
import { AboutDto, About } from '../about/interfaces';
import Seo from '../shared/seo/Seo'

import './About.css';

interface AboutComponentState {
    about: About | null
}

export class AboutComponent extends Component {
    state: AboutComponentState = {
        about: null
    }

    parseAbout(aboutDto: AboutDto): About | null {
        return aboutDto ? {
            title: aboutDto.Title,
            description: aboutDto.Content,
            aboutCover: {
                alternativeText: aboutDto.Image.alternativeText,
                caption: aboutDto.Image.caption,
                url: aboutDto.Image.url
            }
        } : null
    }

    fetchAbout () {
        fetch(`${ BACKEND_URL }/about`)
            .then(response => response.json())
            .then((data: AboutDto) => this.parseAbout(data))
            .then(about => this.setState({ about }));
    }


    componentDidMount () {
        this.fetchAbout();
    }

    render () {
        const { about } = this.state;
        const imageSrc = about ? about.aboutCover.url : '';


        return about ? (
            <article className="about">
                <Seo   
                    title={about.title}
                    description={about.description}
                    thumbnail={imageSrc}
                />
                <div className="information">
                    <h1>{ about.title }</h1>
                    <p>{ about.description }</p>
                </div>
                <div className="image">
                    <img src={ imageSrc } loading='lazy' alt={ about.aboutCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}

export default AboutComponent;