import React from 'react'

import MenuButton from '../menu/menu-button/MenuButton'
import MainPlayer from '../player/MainPlayer/MainPlayer'
import Content from '../content/Content'

import './Main.css'


function Main() {
    return (
        <main>
            <MenuButton />
            <MainPlayer />
            <Content />
        </main>
    )
  }
  
  export default Main