import React from 'react';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Player from './components/shared/Player/Player';

import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Main />
            <Player />
        </Router>
    );
}

export default App;
