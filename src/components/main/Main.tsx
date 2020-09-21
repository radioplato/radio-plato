import React from 'react'

import {
    Switch,
    Route,
} from 'react-router-dom';

import { BrowserView, isMobileOnly } from 'react-device-detect';

import MenuButton from '../menu/menu-button/MenuButton'
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent'
import Content from '../content/Content'
import { PlayerTypes } from '../shared/enums';

import './Main.css'

function Main() {
    const device = isMobileOnly ? 'mobile' : 'desktop';

    return (
        <main className={ device }>
            <BrowserView>
                <MenuButton />
            </BrowserView>
            <Switch>
                <Route exact path='/' render={
                    props => <PlayerComponent { ...props } playerType={ PlayerTypes.Main }/>
                }/>
            </Switch>
            <Content />
        </main>
    );
}
  
export default Main;