import React, { Component } from 'react';

import {
    BrowserRouter, HashRouter
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/header/Header';
import Main from './components/main/Main';
import ShadowPlayer from './components/shared/player/components/shadow-player/ShadowPlayer';

import './App.scss';

const Components = (
    <>
        <Header />
        <Main />
        <ShadowPlayer />
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
    );
}

class App extends Component {
    render() {
        return (
            <HelmetProvider>
                { withEnvironmentalRouter(Components) }
            </HelmetProvider>
        );
    }
}

export default App;
