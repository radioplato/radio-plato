import React from 'react';

import {
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';

import ShowListComponent from '../shows/ShowListComponent';
import ShowComponent from '../shows/ShowComponent/ShowComponent';
import AboutComponent from '../about/About';
import Schedule from '../schedule/Schedule';
import DonateComponent from '../donate/Donate'

import './Content.css';

const SCHEDULE = '/schedule';
const SHOWS = '/shows';
const NEWS = '/news';
const ABOUT = '/about';
const DONATE = '/donate';


function Content() {
    const news = () => (<div>{ NEWS }</div>);

    return (
        <Switch>
            <Route exact path="/" component={ Schedule }/>
            <Route exact path={ SCHEDULE } component={ Schedule }/>
            <Route exact path={ SHOWS } component={ ShowListComponent }/>
            <Route path={ `${ SHOWS }/:slug` } component={(routerProps: any) => <ShowComponent slug={routerProps.match.params.slug}/>}/>
            <Route exact path={ NEWS } component={ news }/>
            <Route exact path={ ABOUT } component={ AboutComponent }/>
            <Route exact path={ DONATE } component={ DonateComponent }/>
        </Switch>
    );
  }
  
  export default withRouter(Content);