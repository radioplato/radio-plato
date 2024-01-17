import React, { Component } from 'react'

import MenuButton from '../menu/components/menu-button/MenuButton'
import Content from '../content/Content'
import FooterPlayerComponent from '../shared/player/components/footer-player/FooterPlayerComponent';

import './Main.scss'

class Main extends Component {
    render() {
        return (
            <main className='main-container'>
                <MenuButton isAside={true} />
                <Content />
                <FooterPlayerComponent />
            </main>
        );
    }
}
  
export default Main;