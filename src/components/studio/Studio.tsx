import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';

import { StudioHeaderDto, StudioHeader } from './interfaces';
import { Seo } from '../shared/wrappers/seo/Seo'

import './Studio.css';

const STUDIO_SEO_TITLE = 'Studio';
const STUDIO_SEO_DESCRIPTION = 'Plato Sound'

interface StudioComponentState {
    studio: StudioHeader | null
}

export class StudioComponent extends Component {
    state: StudioComponentState = {
        studio: null
    }

    parseStudio(studioDto: StudioHeaderDto): StudioHeader | null {
        return studioDto ? {
            title: studioDto.Title,
            description: studioDto.Decription,
            studioImage: {
                alternativeText: studioDto.Image.alternativeText,
                caption: studioDto.Image.caption,
                url: studioDto.Image.url
            }
        } : null
    }

    fetchStudio () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/portfolio-header`)
            .then(response => response.json())
            .then((data: StudioHeaderDto) => this.parseStudio(data))
            .then(studio => this.setState({ studio }));
    }


    componentDidMount () {
        this.fetchStudio();
    }

    render () {
        const { studio } = this.state;
        const imageSrc = studio ? studio.studioImage.url : '';
        const imageStyle = {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: `url(${ imageSrc })`
        }

        console.log(studio);

        return studio ? (
            <article className={ `studio ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                 <Seo meta={{
                        title: STUDIO_SEO_TITLE,
                        description: STUDIO_SEO_DESCRIPTION,
                        thumbnail: imageSrc
                    }}
                />
                <div className='image' style={ imageStyle }>
                    <div className='left'>
                        <h1>{ studio.title }</h1>
                    </div>
                    <div className='right'>
                        <div className='description'>
                            <ReactMarkdown
                                source={ studio.description }
                                escapeHtml={ false }
                            />
                        </div>
                    </div>
                </div>
            </article>
        ) : null;
    }
}

export default StudioComponent;