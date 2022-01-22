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
import { PartyComponent } from '../party/PartyComponent/PartyComponent';
import { NotFoundComponent } from '../not-found/NotFoundComponent';

import { NewsListTypes } from '../shared/enums';

import './Content.css';

const SCHEDULE = '/schedule';
const SHOWS = '/shows';
const NEWS = '/news';
const ABOUT = '/about';
const DONATE = '/donate';
const PARTY = '/party';

function Content() {
    return (
        <Switch>
            <Route exact path='/' component={ StartPageComponent } />
            <Route exact path={ SCHEDULE } component={ SchedulePageComponent } />
            <Route exact path={ SHOWS } component={ ShowListComponent } />
            <Route exact path={ `${ SHOWS }/:slug` } component={(routerProps: any) => <ShowComponent slug={ routerProps.match.params.slug } />} />
            <Route exact path={ NEWS } component={ () => <NewsListComponent type={ NewsListTypes.Full } /> } />
            <Route exact path={ `${ NEWS }/:category` } component={ (routerProps: any) => <NewsListComponent type={ NewsListTypes.Full } category={ routerProps.match.params.category } /> } />
            <Route exact path={ `${ NEWS }/:category/:slug` } component={(routerProps: any) => <NewsComponent slug={routerProps.match.params.slug} />} />
            <Route exact path={ ABOUT } component={ AboutComponent } />
            <Route exact path={ DONATE } component={ DonateComponent } />
            <Route exact path={ PARTY } component={ PartyComponent } />
            <Route component={ NotFoundComponent } />
        </Switch>
    );
}
  
export default Content;