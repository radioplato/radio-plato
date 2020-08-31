import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';

import { AboutDto, About } from '../about/interfaces';
import { Seo } from '../shared/wrappers/seo/Seo'

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
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/about`)
            .then(response => response.json())
            .then((data: AboutDto) => this.parseAbout(data))
            .then(about => this.setState({ about }));
    }


    componentDidMount () {
        this.fetchAbout();
    }

    render () {
        const { about } = this.state;
        const className = `about ${ isMobileOnly ? 'mobile' : 'desktop' }`;
        const imageSrc = about ? about.aboutCover.url : '';

        return about ? (
            <article className={ className }>
                <Seo meta={{
                        title: about.title,
                        description: about.description,
                        thumbnail: imageSrc
                    }}
                />
                <div className='information'>
                    <h1>{ about.title }</h1>
                    <p>{ about.description }</p>
                </div>
                <div className='image'>
                    <img src={ imageSrc } loading='lazy' alt={ about.aboutCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}

export default AboutComponent;