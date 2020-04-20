import React from 'react'

import {
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';

import './Content.css'


function Content() {

    const schedule = () => (<div>Schedule</div>);

    const shows = () => (<div>Shows</div>);

    const news = () => (<div>News</div>);

    return (
        <Switch>
            <Route exact path='/schedule' component={ schedule }/>
            <Route exact path='/shows' component={ shows }/>
            <Route exact path='/news' component={ news }/>
        </Switch>
    )
  }
  
  export default withRouter(Content)