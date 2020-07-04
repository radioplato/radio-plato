import React from 'react';

import GalleryComponent from '../gallery/GalleryComponent';
import { ScheduleComponent } from '../shared/schedule/ScheduleComponent';

import "./StartPageComponent.css";

function StartPageComponent() {
    return (
        <div className="start-page-container">
            <GalleryComponent />
            <ScheduleComponent />
        </div>
    );
}

export default StartPageComponent;