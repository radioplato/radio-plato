import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';

import { DonateDto, Donate } from '../donate/interfaces';
import { Seo } from '../shared/wrappers/seo/Seo'

import './Donate.css';
import ReactMarkdown from 'react-markdown';

const DONATE_SEO_DESCRIPTION = 'Support us!'

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
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/donate`)
            .then(response => response.json())
            .then((data: DonateDto) => this.parseDonate(data))
            .then(donate => this.setState({ donate }));
    }


    componentDidMount () {
        this.fetchDonate();
    }

    render () {
        const { donate } = this.state;
        const className = `donate ${ isMobileOnly ? 'mobile' : 'desktop' }`;
        const imageSrc = donate ? donate.donateCover.url : '';

        return donate ? (
            <article className={ className }>
                 <Seo meta={{
                        title: donate.title,
                        description: DONATE_SEO_DESCRIPTION,
                        thumbnail: imageSrc
                    }}
                />
                <div className='information'>
                    <h1>{ donate.title }</h1>
                    <div className='text-content'>
                        <ReactMarkdown
                            source={ donate.description }
                            escapeHtml={ false }
                            renderers={{ link: props => <a href={ props.href } target="_blank" rel="noopener noreferrer">{ props.children }</a> }}
                        />
                    </div>
                </div>
                <div className='image'>
                    <img src={ imageSrc } loading='lazy' alt={ donate.donateCover.alternativeText }/>
                </div>
            </article>
        ) : null;
    }
}

export default DonateComponent;