import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import googlePlay from '@iconify/icons-cib/google-play';
import Icon from '@iconify/react';

import SocialLinksComponent from '../shared/SocialLinksComponent/SocialLinksComponent';
import { Seo } from '../shared/wrappers/seo/Seo'

import { AboutDto, About } from '../about/interfaces';
import { ANDROID_APP, HEADER_SOCIAL_LINKS } from '../shared/constants';

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
        const imageSrc = about ? about.aboutCover.url : '';

        return about ? (
            <article className={ `about ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: about.title,
                        description: about.description,
                        thumbnail: imageSrc
                    }}
                />
                <div className='information'>
                    <h1>{ about.title }</h1>
                    <p>{ about.description }</p>
                    <div className="social-links">
                        <SocialLinksComponent socialLinks={ HEADER_SOCIAL_LINKS }></SocialLinksComponent>
                    </div>
                    <div className="android-link-wrapper">
                        <a className='android-link'
                            target='_blank'
                            href={ HEADER_SOCIAL_LINKS.googlePlay }
                            title={ `A link to Android App` }
                            aria-label={ `A link to Android App` }
                            rel='noopener noreferrer'
                        >
                            <Icon className='google-play-icon' icon={ googlePlay }/>
                            { ANDROID_APP }
                        </a>
                    </div>
                </div>
                <div className='image'>
                    <img src={ imageSrc } loading='lazy' alt={ about.aboutCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}

export default AboutComponent;