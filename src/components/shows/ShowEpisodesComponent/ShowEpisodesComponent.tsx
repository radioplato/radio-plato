import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';

import Soundcloud from 'soundcloud.ts'

import { ShowEpisode } from '../interfaces';

import './ShowEpisodesComponent.css';


interface ShowEpisodesProperties {
    mixcloudPlaylist: string;
}

export class ShowEpisodesComponent extends Component<ShowEpisodesProperties> {
    state = {
        showEpisodes: []
    }

    parseShowEpisode (datum: any): ShowEpisode {
        return {
            title: datum.name,
            image: datum.pictures['1024wx1024h'],
            url: datum.url,
            date: datum.created_time,
            slug: datum.slug
        }
    }

    parseShowEpisodes (playlistDto: any): ShowEpisode[] | null {
        if (!playlistDto || !playlistDto.data || !playlistDto.data.length) {
            return null;
        }
        
        return playlistDto.data.map((datum: any) => this.parseShowEpisode(datum));
    }

    async fetchPlaylist () {
        // const { mixcloudPlaylist } = this.props;
        
        // fetch(`${ mixcloudPlaylist }`)
        //     .then(response => response.json())
        //     .then(playlist => this.parseShowEpisodes(playlist)?.reverse().slice(0, 9))
        //     .then(showEpisodes => this.setState({ showEpisodes }));

        const soundcloud = new Soundcloud('M1st288RpSGenY314AaaHwddXSnfh1Xw', '2-290059-4862302-1EsXsdzUX6QGXFkg');

        const playlist = await soundcloud.playlists.getAlt("randoomkru/sets/showcase")

        console.log(playlist);
    }

    renderShowEpisode (episode: ShowEpisode) {
        const key = `${ episode.slug }-${ new Date().getTime() }`;
        const date = new Date(episode.date).toISOString().slice(0,10).split('-').reverse().join('.');

        return (
            <a key={ key } href={ episode.url } rel='noopener noreferrer' target='_blank'>
                <div className='episode-container'>
                    <img className='episode-image' src={ episode.image } alt={ episode.title }/>
                    <div className='episode-information'>
                        <h3>{ episode.title }</h3>
                    </div>
                    <p>{ date }</p>
                </div>
            </a>
        );
    }

    renderShowEpisodes (episodes: ShowEpisode[]) {
        return episodes && episodes.length ? (
            <>
                <h2>LATEST EPISODES</h2>
                <div className='episode-cards'>
                    { episodes.map(episode => this.renderShowEpisode(episode)) }
                </div>
            </>
        ) : null;
    }

    async componentDidMount () {
        await this.fetchPlaylist();
    }

    render () {
        const {
            showEpisodes
        } = this.state;

        return (
            <div className={ `episode-list ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                { this.renderShowEpisodes(showEpisodes) }
            </div>
            
        );
    }
}
  
export default ShowEpisodesComponent;