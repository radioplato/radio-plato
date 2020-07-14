import React from 'react';

import {
    HashRouter,
} from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Player from './components/shared/Player/Player';

import './App.css';


function App() {
    return (
        <HashRouter basename="/">
            <Header />
            <Main />
            <Player />
        </HashRouter>
    );
}

export default App;
