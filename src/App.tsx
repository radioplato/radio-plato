import React from 'react';

import {
    BrowserRouter, HashRouter
} from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Player from './components/shared/Player/Player';

import './App.css';
import { HelmetProvider } from 'react-helmet-async';

const Components = (
    <>
        <Header />
        <Main />
        <Player />
    </>
);

function withEnvironmentalRouter (children: JSX.Element) {
    return process.env.REACT_APP_ENV === 'production' ?
    (
        <BrowserRouter>
            { children }
        </BrowserRouter>
    ) :
    (
        <HashRouter basename='/'>
            { children }
        </HashRouter>
    )
}

function App() {
    return (
        <HelmetProvider>
            { withEnvironmentalRouter(Components) }
        </HelmetProvider>
    );
}

export default App;
