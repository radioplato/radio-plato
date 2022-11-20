import React from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import StartPageComponent from '../start-page/StartPageComponent';
import ShowListComponent from '../shows/ShowListComponent';
import NewsListComponent from '../news/NewsListComponent';
import ShowComponent from '../shows/ShowComponent/ShowComponent';
import NewsComponent from '../news/News/NewsComponent';
import AboutComponent from '../about/About';
import { SchedulePageComponent } from '../shared/schedule/ScheduleComponent';
import DonateComponent from '../donate/Donate'
import StudioComponent from '../studio/Studio';
import { NotFoundComponent } from '../not-found/NotFoundComponent';
import iOSppComponent from '../ios-privacy-policy/ios-privacy-policy';

import { NewsListTypes } from '../shared/enums';

import './Content.css';


enum ROUTES {
    SCHEDULE = '/schedule',
    SHOWS = '/shows',
    NEWS = '/news',
    ABOUT = '/about',
    DONATE = '/donate',
    STUDIO = '/studio',
    IOS = '/radio-plato-i-os-app-privacy-policy'
}

function Content() {
    return (
        <Switch>
            <Route exact path='/' component={ StartPageComponent } />
            <Route exact path={ ROUTES.SCHEDULE } component={ SchedulePageComponent } />
            <Route exact path={ ROUTES.SHOWS } component={ ShowListComponent } />
            <Route exact path={ `${ ROUTES.SHOWS }/:slug` } component={(routerProps: any) => <ShowComponent slug={ routerProps.match.params.slug } />} />
            <Route exact path={ ROUTES.NEWS } component={ () => <NewsListComponent type={ NewsListTypes.Full } /> } />
            <Route exact path={ `${ ROUTES.NEWS }/:category` } component={ (routerProps: any) => <NewsListComponent type={ NewsListTypes.Full } category={ routerProps.match.params.category } /> } />
            <Route exact path={ `${ ROUTES.NEWS }/:category/:slug` } component={(routerProps: any) => <NewsComponent slug={routerProps.match.params.slug} />} />
            <Route exact path={ ROUTES.ABOUT } component={ AboutComponent } />
            <Route exact path={ ROUTES.IOS } component={ iOSppComponent } />
            <Route exact path={ ROUTES.DONATE } component={ DonateComponent } />
            <Route exact path={ ROUTES.STUDIO } component={ StudioComponent } />
            <Route component={ NotFoundComponent } />
        </Switch>
    );
}
  
export default Content;