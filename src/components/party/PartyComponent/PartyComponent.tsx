import React, { Component } from "react";

import { Subscription } from "rxjs";

import { partyService } from "../PartyService";

import './PartyComponent.css';

const DEFAULT_STATE = {
    src: ''
}

export class PartyComponent extends Component {
    state = DEFAULT_STATE;
    subscription: Subscription | null = null;

    componentDidMount () {
        this.subscribeOnGifChange();
        partyService.getRandomGif("cat party");
    }

    subscribeOnGifChange () {
        this.subscription = partyService.subscribeOnGifChanges((src: string) => this.setState({ src }));
    }

    render() {
        const { src } = this.state;

        return (
            <div className="video-container">
                <video src={ src } autoPlay={true} loop={true}/>
            </div>
        );
    }
}