import React from 'react';

import GalleryComponent from '../gallery/GalleryComponent';
import NewsListComponent from '../news/NewsListComponent';
import { ScheduleComponent } from '../shared/schedule/ScheduleComponent';

import { NewsListTypes } from '../shared/enums';

import "./StartPageComponent.css";

function StartPageComponent() {
    return (
        <div className="start-page-container">
            <GalleryComponent />
            <NewsListComponent type={ NewsListTypes.Simple }/>
            <ScheduleComponent />
        </div>
    );
}

export default StartPageComponent;