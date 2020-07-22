import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { Subscription } from 'rxjs';
import { Carousel } from 'react-responsive-carousel';

import galleryService from './GalleryService';
import { IndexGallery } from './interfaces';

import { scheduleService } from '../shared/schedule/ScheduleService';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './GalleryComponent.css';


interface GalleryComponentState {
    gallery: IndexGallery | null
}

class GalleryComponent extends Component {
    state: GalleryComponentState = { gallery: null };
    subscription: Subscription | null = null;

    componentDidMount() {
        this.subscribeOnGalleryChange();
        galleryService.fetchIndexGallery();
    }

    subscribeOnGalleryChange () {
        this.subscription = galleryService.subscribeOnGalleryChanges(
            (gallery: IndexGallery) => this.setState({ gallery })
        );
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    graphicContentSelection () {
        const { gallery } = this.state;

        if (!gallery) {
            return null;
        }

        if (gallery?.video) {
            return (
                <ReactPlayer url={ gallery.videoEmbedCode } />
            );
        }

        if (gallery?.photoExhibition) {
            return (
                <Carousel className='carousel'
                          showArrows={ false }
                          showStatus={ false }
                          showThumbs={ false }
                          showIndicators={ false }
                          autoPlay={ true }
                          infiniteLoop={ true }
                          interval={ 30000 }
                >
                    { gallery.photoExhibitionMedia.map(photo => (
                        <div key={ photo.url }>
                            <img src={ photo.url }
                                 alt={ photo.alternativeText }
                            />
                        </div>
                    ))}
                </Carousel>
            );
        }

        if (scheduleService.currentShow && scheduleService.currentShow.image) {
            return (
                <img className='gallery-image'
                     src={ scheduleService.currentShow.image.url }
                     alt={ scheduleService.currentShow.image.alternativeText }
                ></img>
            );
        }

        return (
            <Carousel className='carousel'
                      showArrows={ false }
                      showStatus={ false }
                      showThumbs={ false }
                      showIndicators={ false }
                      autoPlay={ true }
                      infiniteLoop={ true }
                      interval={ 30000 }
            >
                { gallery.regularGallery.map(photo => (
                    <div key={ photo.url }>
                        <img src={ photo.url }
                             alt={ photo.alternativeText }
                        />
                    </div>
                ))}
            </Carousel>
        );
    }

    render () {
        return (
            <div className='visual-container'>
                { this.graphicContentSelection() }
            </div>
        );
    }
}
  
export default GalleryComponent;