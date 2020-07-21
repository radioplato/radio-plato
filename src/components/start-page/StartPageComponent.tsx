import React from 'react';

import Seo from '../shared/seo/Seo'
import GalleryComponent from '../gallery/GalleryComponent';
import NewsListComponent from '../news/NewsListComponent';
import { ScheduleComponent } from '../shared/schedule/ScheduleComponent';
import { BASIC_SEO_IMG } from '../shared/constants';

import { NewsListTypes } from '../shared/enums';

import "./StartPageComponent.css";

const INDEX_SEO_TITLE = "From Minsk with ❤"
const INDEX_SEO_DESCRIPTION = "Independent internet radio based in Minsk (Belarus). We stream classic bangers and authentic world music as well as modern indie and rhythmic DJ edits."

function StartPageComponent() {
    return (
        <div className="start-page-container">
                <Seo   
                    title={INDEX_SEO_TITLE}
                    description={INDEX_SEO_DESCRIPTION}
                    thumbnail={BASIC_SEO_IMG}
                />
            <GalleryComponent />
            <NewsListComponent type={ NewsListTypes.Simple }/>
            <ScheduleComponent />
        </div>
    );
}

export default StartPageComponent;