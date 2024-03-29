import React from 'react';

import {
    Switch,
    Route,
} from 'react-router-dom';

import StartPageComponent from '../../pages/start/StartPageComponent';
import ShowListComponent from '../shows/pages/show-list-page/ShowListComponent';
import ShowComponent from '../shows/pages/show-page/ShowComponent';
import NewsArticleComponent from '../news/pages/news-article-page/NewsArticleComponent';
import { AboutPageComponent } from '../../pages/about/AboutPageComponent';
import { SchedulePageComponent } from '../shared/schedule/components/schedule/ScheduleComponent';
import StudioComponent from '../../pages/studio/StudioPageComponent';
import { NotFoundPageComponent } from '../../pages/not-found/NotFoundPageComponent';
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
            <Route exact path={ ROUTES.ABOUT } component={ AboutPageComponent } />
            <Route exact path={ ROUTES.STUDIO } component={ StudioComponent } />
            <Route component={ NotFoundPageComponent } />
        </Switch>
    );
}
  
export default Content;