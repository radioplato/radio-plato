import React, { Component } from 'react';

import { Seo } from '../../components/shared/wrappers/seo/Seo'
import NewsListComponent from '../../components/news/components/news-list/NewsListComponent';
import { ScheduleTableComponent } from '../../components/shared/schedule/components/schedule/ScheduleComponent';

import { BASIC_SEO_IMG } from '../../components/shared/constants';

import './StartPageComponent.scss';

const INDEX_SEO_TITLE = 'Community Radio and Music Magazine'
const INDEX_SEO_DESCRIPTION = 'Radio Plato is a space for music lovers'

export class StartPageComponent extends Component {
    render() {
        return (
            <div className='start-page-container'>
                <Seo meta={{
                        title: INDEX_SEO_TITLE,
                        description: INDEX_SEO_DESCRIPTION,
                        thumbnail: BASIC_SEO_IMG
                    }}
                />
                <NewsListComponent isStartPage={ true }/>
                <ScheduleTableComponent />
            </div>
        );
    }
}

export default StartPageComponent;