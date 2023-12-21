import React from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import StartPageComponent from '../start-page/StartPageComponent';
import ShowListComponent from '../shows/pages/show-list-page/ShowListComponent';
import ShowComponent from '../shows/pages/show-page/ShowComponent';
import NewsArticleComponent from '../news/pages/news-article-page/NewsArticleComponent';
import AboutComponent from '../about/About';
import { SchedulePageComponent } from '../shared/schedule/components/schedule/ScheduleComponent';
import StudioComponent from '../studio/Studio';
import { NotFoundComponent } from '../not-found/NotFoundComponent';
import iOSppComponent from '../ios-privacy-policy/ios-privacy-policy';
import iOStcComponent from '../ios-terms-and-conditions/ios-terms-and-conditions';
import PlayerPageComponent from '../shared/player/pages/player-page/PlayerPageComponent';
import { NewsPageComponent } from '../news/pages/news-list-page/NewsPageComponent';


import './Content.css';


enum ROUTES {
    PLAYER = '/player',
    SCHEDULE = '/schedule',
    SHOWS = '/shows',
    NEWS = '/news',
    ABOUT = '/about',
    STUDIO = '/studio',
    IOSpp = '/radio-plato-i-os-app-privacy-policy',
    IOStc = '/radio-plato-i-os-app-terms-of-use'
}

function Content() {
    return (
        <Switch>
            <Route exact path='/' component={ StartPageComponent } />
            <Route exact path={ ROUTES.PLAYER} component={ PlayerPageComponent } />
            <Route exact path={ ROUTES.SCHEDULE } component={ SchedulePageComponent } />
            <Route exact path={ ROUTES.SHOWS } component={ ShowListComponent } />
            <Route exact path={ `${ ROUTES.SHOWS }/:slug` } component={(routerProps: any) => <ShowComponent slug={ routerProps.match.params.slug } />} />
            <Route exact path={ ROUTES.NEWS } component={ () => <NewsPageComponent/> } />
            <Route exact path={ `${ ROUTES.NEWS }/:category` } component={ (routerProps: any) => <NewsPageComponent category={ routerProps.match.params.category } /> } />
            <Route exact path={ `${ ROUTES.NEWS }/:category/:slug` } component={(routerProps: any) => <NewsArticleComponent slug={routerProps.match.params.slug} />} />
            <Route exact path={ ROUTES.ABOUT } component={ AboutComponent } />
            <Route exact path={ ROUTES.IOSpp } component={ iOSppComponent } />
            <Route exact path={ ROUTES.IOStc } component={ iOStcComponent } />
            <Route exact path={ ROUTES.STUDIO } component={ StudioComponent } />
            <Route component={ NotFoundComponent } />
        </Switch>
    );
}
  
export default Content;