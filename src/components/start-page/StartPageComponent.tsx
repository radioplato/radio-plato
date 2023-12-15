import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect';

import { Seo } from '../shared/wrappers/seo/Seo'
import NewsListComponent from '../news/components/news-list/NewsListComponent';
import { ScheduleComponent } from '../shared/schedule/components/schedule/ScheduleComponent';
import { BASIC_SEO_IMG } from '../shared/constants';

import './StartPageComponent.css';

const INDEX_SEO_TITLE = 'From Minsk with ❤'
const INDEX_SEO_DESCRIPTION = 'Radio Plato is a space for music lovers'

export class StartPageComponent extends Component {
    render() {
        return (
            <div className={ `start-page-container ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                    <Seo meta={{
                            title: INDEX_SEO_TITLE,
                            description: INDEX_SEO_DESCRIPTION,
                            thumbnail: BASIC_SEO_IMG
                        }}
                    />
                <NewsListComponent isStartPage={ true }/>
                <ScheduleComponent />
            </div>
        );
    }
}

export default StartPageComponent;