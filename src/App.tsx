import React, { Component } from 'react';

import {
    BrowserRouter, HashRouter
} from 'react-router-dom';
import Analytics from 'react-router-ga';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/header/Header';
import Main from './components/main/Main';
import ShadowPlayer from './components/shared/player/components/shadow-player/ShadowPlayer';

import './App.css';


const Components = (
    <>
        <Header />
        <Main />
        <ShadowPlayer />
    </>
);

function withAnalytics (children: JSX.Element) {
    return navigator.userAgent !== "ReactSnap" ?
    (
        <Analytics id={ process.env.REACT_APP_GA }>
            { children }
        </Analytics>
    ) : children;
}

function withEnvironmentalRouter (children: JSX.Element) {
    return process.env.REACT_APP_ENV === 'production' ?
    (
        <BrowserRouter>
            { withAnalytics(children) }
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
