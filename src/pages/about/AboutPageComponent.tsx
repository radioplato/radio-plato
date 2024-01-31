import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import qs from 'qs';

import { Seo } from '../../components/shared/wrappers/seo/Seo'
import SocialButtonsComponent from '../../components/shared/social-links/components/social-buttons/SocialButtonsComponent';
import { BUTTON_SIZE, BUTTON_TYPE, Button, ICON_POSITION } from '../../components/shared/button/components/Button';

import { AboutPageContent, AboutPageDto } from './models';
import { PLATO_SOCIAL_BUTTONS } from '../../components/shared/social-links/constants';
import { ICON_KEY } from '../../components/shared/icons/icons';
import { DONATE_LINK } from '../../components/shared/constants';

import './AboutPageComponent.scss';

export function AboutPageComponent() {
    const [about, setAbout] = useState<AboutPageContent | null>(null);

    const parseAbout = (aboutDto: AboutPageDto): AboutPageContent | null => {
        return aboutDto ? {
            title: aboutDto.data.attributes.Title,
            description: aboutDto.data.attributes.Content,
            aboutCover: {
                alternativeText: aboutDto.data.attributes.Image.data[0].attributes.alternativeText,
                caption: aboutDto.data.attributes.Image.data[0].attributes.caption,
                url: aboutDto.data.attributes.Image.data[0].attributes.url
            }
        } : null
    }

    const loadAboutPage = () => {
        const query = qs.stringify({
            populate: '*',
        });

        fetch(`${process.env.REACT_APP_BACKEND_URL_V2}/about?${query}`)
            .then(response => response.json())
            .then((data: AboutPageDto) => parseAbout(data))
            .then(about => setAbout(about));
    }

    useEffect(() => {
        loadAboutPage();
    }, []);

    return about ? (
        <article className='about-container'>
            <Seo meta={{
                title: about.title,
                description: about.description,
                thumbnail: about.aboutCover.url
            }}
            />
            <div className='about'>
                <div className='information'>
                    <h1 className='about-title'>{about.title}</h1>
                    <div className='about-text'>
                        <ReactMarkdown
                            source={about.description}
                            escapeHtml={navigator.userAgent === 'ReactSnap'}
                            renderers={{
                                link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
                            }}
                        />
                    </div>
                    <div className='social-buttons'>
                        <SocialButtonsComponent socialLinks={PLATO_SOCIAL_BUTTONS}></SocialButtonsComponent>
                    </div>
                    <Button
                        type={BUTTON_TYPE.OUTLINE}
                        size={BUTTON_SIZE.MEDIUM}
                        icon={ICON_KEY.HEART_REGULAR}
                        iconPosition={ICON_POSITION.LEFT}
                        label='donate'
                        href={DONATE_LINK}
                        title='donate link'
                    ></Button>
                </div>
                <div className='image'>
                    <img src={about.aboutCover.url} loading='lazy' alt={about.aboutCover.alternativeText} />
                </div>
            </div>
        </article>
    ) : null;
}