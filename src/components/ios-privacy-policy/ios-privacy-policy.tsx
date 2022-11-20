import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import ReactMarkdown from 'react-markdown'

import { Seo } from '../shared/wrappers/seo/Seo'

import { iOSppDto, iOSpp } from '../ios-privacy-policy/interfaces';

import './ios-privacy-policy.css';

interface iOSppComponentState {
    iOSpp: iOSpp | null
}

export class iOSppComponent extends Component {
    state: iOSppComponentState = {
        iOSpp: null
    }

    parseiOSpp(iOSppDto: iOSppDto): iOSpp | null {
        return iOSppDto ? {
            title: iOSppDto.title,
            text: iOSppDto.text,
        } : null
    }

    fetchiOSpp () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/radio-plato-i-os-app-privacy-policy`)
            .then(response => response.json())
            .then((data: iOSppDto) => this.parseiOSpp(data))
            .then(iOSpp => this.setState({ iOSpp }));
    }


    componentDidMount () {
        this.fetchiOSpp();
    }

    render () {
        const { iOSpp } = this.state;

        return iOSpp ? (
            <article className={ `iOSpp ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                <Seo meta={{
                        title: iOSpp.title,
                    }}
                />
                <div className='information'>
                    <h1>{ iOSpp.title }</h1>
                    <ReactMarkdown
                            source={ iOSpp.text }
                            escapeHtml={ false }
                            renderers={{ link: props => <a href={ props.href } target="_blank" rel="noopener noreferrer">{ props.children }</a> }}></ReactMarkdown>
                </div>
                
            </article>
        ) : null;
    }
}

export default iOSppComponent;