import React from 'react'

import {
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';

import MenuButton from '../menu/menu-button/MenuButton'
import PlayerComponent from '../player/PlayerComponent/PlayerComponent'
import Content from '../content/Content'

import './Main.css'
import { PlayerTypes } from '../player/constants';


function Main() {
    return (
        <main>
            <MenuButton />
                <Switch>
                    <Route exact path='/' render={
                        props => <PlayerComponent { ...props } playerType={ PlayerTypes.Main }/>
                    }/>
                </Switch>
            <Content />
        </main>
    );
}
  
export default withRouter(Main);