import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import googlePlay from '@iconify/icons-cib/google-play';
import Icon from '@iconify/react';

import SocialButtonsComponent from '../shared/social-links/components/social-buttons/SocialButtonsComponent';
import { Seo } from '../shared/wrappers/seo/Seo'

import { AboutDto, About } from '../about/interfaces';
import { PLATO_SOCIAL_BUTTONS } from '../shared/social-links/constants';

import './About.scss';

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

    fetchAbout() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/about`)
            .then(response => response.json())
            .then((data: AboutDto) => this.parseAbout(data))
            .then(about => this.setState({ about }));
    }


    componentDidMount() {
        this.fetchAbout();
    }

    render() {
        const { about } = this.state;
        const imageSrc = about ? about.aboutCover.url : '';

        return about ? (
            <article className={`about-container ${isMobileOnly ? 'mobile' : 'desktop'}`}>
                <Seo meta={{
                    title: about.title,
                    description: about.description,
                    thumbnail: imageSrc
                }}
                />
                <div className='about'>
                    <div className='information'>
                        <h1 className='about-title'>{about.title}</h1>
                        <div className='about-text'>{ about.description }</div>
                        <div className='social-buttons'>
                            <SocialButtonsComponent socialLinks={PLATO_SOCIAL_BUTTONS}></SocialButtonsComponent>
                        </div>
                    </div>
                    <div className='image'>
                        <img src={imageSrc} loading='lazy' alt={about.aboutCover.alternativeText} />
                    </div>
                </div>
            </article>
        ) : null;
    }
}

export default AboutComponent;