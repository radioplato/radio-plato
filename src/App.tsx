import React from 'react';
import Header from './components/header/Header';
import Player from './components/player/Player';
import MainPlayer from './components/player/MainPlayer/MainPlayer';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <MainPlayer />
            <Player />
        </>
    );
}

export default App;
