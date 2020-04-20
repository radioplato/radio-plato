import React from 'react'

import {
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';

import MenuButton from '../menu/menu-button/MenuButton'
import MainPlayer from '../player/MainPlayer/MainPlayer'
import Content from '../content/Content'

import './Main.css'


function Main() {
    return (
        <main>
            <MenuButton />
                <Switch>
                    <Route exact path='/' component={ MainPlayer }/>
                </Switch>
            <Content />
        </main>
    );
}
  
export default withRouter(Main);