import React, { Component } from 'react'

import {
    Switch,
    Route,
} from 'react-router-dom';

import { BrowserView, isMobileOnly } from 'react-device-detect';

import MenuButton from '../menu/components/menu-button/MenuButton'
import PlayerComponent from '../shared/Player/PlayerComponent/PlayerComponent'
import Content from '../content/Content'
import { PlayerTypes } from '../shared/enums';

import './Main.css'

class Main extends Component {
    render() {
        return (
            <main className={ isMobileOnly ? 'mobile' : 'desktop' }>
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
}
  
export default Main;