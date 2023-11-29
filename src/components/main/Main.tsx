import React, { Component } from 'react'

import { BrowserView, isMobileOnly } from 'react-device-detect';

import MenuButton from '../menu/components/menu-button/MenuButton'
import Content from '../content/Content'

import './Main.css'

class Main extends Component {
    render() {
        return (
            <main className={ isMobileOnly ? 'mobile' : 'desktop' }>
                <BrowserView>
                    <MenuButton />
                </BrowserView>
                <Content />
            </main>
        );
    }
}
  
export default Main;