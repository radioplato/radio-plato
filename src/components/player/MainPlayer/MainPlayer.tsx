import React, { Component } from 'react';

import PlayerControls from '../PlayerControls/PlayerControls';
import { DATA_URL, DATA_REQUEST_INTERVAL, ONAIR } from '../constants';

import './MainPlayer.css';
import { withRouter } from 'react-router-dom';

export class MainPlayer extends Component {
    state = {
        trackName: ""
    }

    componentDidMount () {
        this.loadTrackName()
        setInterval(this.loadTrackName.bind(this), DATA_REQUEST_INTERVAL);
    }

    async loadTrackName () {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        const trackName = data.icestats.source[0].title;

        this.setState({
            trackName
        })
    }

    render () {
        const {
            trackName
        } = this.state;

        const {
            location
        } = this.props as any;

        console.log(location);

        return (
            <div className="main-player">
                <PlayerControls />
                <p className="onair">{ ONAIR }</p>
                <p className="track-title">{ trackName }</p>
            </div>
        );
    }
}

export default withRouter(MainPlayer as any);
