import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import ReactMarkdown from 'react-markdown'

import { Seo } from '../shared/wrappers/seo/Seo'

import { iOStcDto, iOStc } from './interfaces';

import './ios-terms-and-conditions.css';

interface iOStcComponentState {
    iOStc: iOStc | null
}

export class iOStcComponent extends Component {
    state: iOStcComponentState = {
        iOStc: null
    }

    parseiOStc(iOStcDto: iOStcDto): iOStc | null {
        return iOStcDto ? {
            title: iOStcDto.title,
            text: iOStcDto.text,
        } : null
    }

    fetchiOStc () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/radio-plato-i-os-app-terms-of-use`)
            .then(response => response.json())
            .then((data: iOStcDto) => this.parseiOStc(data))
            .then(iOStc => this.setState({ iOStc }));
    }


    componentDidMount () {
        this.fetchiOStc();
    }

    render () {
        const { iOStc } = this.state;

        return iOStc ? (
            <article className={ `iOStc ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: iOStc.title,
                    }}
                />
                <div className='information'>
                    <h1>{ iOStc.title }</h1>
                    <ReactMarkdown
                            source={ iOStc.text }
                            escapeHtml={ false }
                            renderers={{ link: props => <a href={ props.href } target="_blank" rel="noopener noreferrer">{ props.children }</a> }}></ReactMarkdown>
                </div>
                
            </article>
        ) : null;
    }
}

export default iOStcComponent;