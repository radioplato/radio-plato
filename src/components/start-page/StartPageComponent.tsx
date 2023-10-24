import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect';

import { Seo } from '../shared/wrappers/seo/Seo'
import NewsListComponent from '../news/NewsListComponent';
import { ScheduleComponent } from '../shared/schedule/ScheduleComponent';
import { BASIC_SEO_IMG } from '../shared/constants';

import { NewsListTypes } from '../shared/enums';

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
                <NewsListComponent type={ NewsListTypes.Simple }/>
                <ScheduleComponent />
            </div>
        );
    }
}

export default StartPageComponent;