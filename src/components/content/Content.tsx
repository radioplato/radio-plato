import React from 'react';

import {
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';

import ShowListComponent from '../shows/ShowListComponent';
import ShowComponent from '../shows/ShowComponent/ShowComponent';

import './Content.css';

const SCHEDULE = '/schedule';
const SHOWS = '/shows';
const NEWS = '/news';


function Content() {
    const schedule = () => (<div>{ SCHEDULE }</div>);

    const news = () => (<div>{ NEWS }</div>);

    return (
        <Switch>
            <Route exact path={ SCHEDULE } component={ schedule }/>
            <Route exact path={ SHOWS } component={ ShowListComponent }/>
    <Route path={ `${ SHOWS }/:slug` } component={(routerProps: any) => <ShowComponent slug={routerProps.match.params.slug}/>}/>
            <Route exact path={ NEWS } component={ news }/>
        </Switch>
    );
  }
  
  export default withRouter(Content);