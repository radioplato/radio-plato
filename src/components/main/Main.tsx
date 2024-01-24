import React, { Component } from 'react'

import MenuButton from '../menu/components/menu-button/MenuButton'
import Content from '../content/Content'
import FooterPlayerComponent from '../shared/player/components/footer-player/FooterPlayerComponent';

import './Main.scss'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <main className='main-container'>
                <MenuButton isAside={true} />
                <Content />
                <Switch>
                    <Route exact path='/player' render={
                        () => null
                    } />
                    <Route path='/' render={
                        () => (
                            <FooterPlayerComponent />
                        )
                    } />
                </Switch>
            </main>
        );
    }
}

export default Main;