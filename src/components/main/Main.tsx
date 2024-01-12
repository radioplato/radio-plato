import React, { Component } from 'react'

import MenuButton from '../menu/components/menu-button/MenuButton'
import Content from '../content/Content'

import './Main.scss'

class Main extends Component {
    render() {
        return (
            <main>
                <MenuButton isAside={true} />
                <Content />
            </main>
        );
    }
}
  
export default Main;