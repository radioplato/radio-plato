import React, { useEffect, useState } from 'react';

import qs from 'qs';

import ShowCardComponent from '../../components/show-card/ShowCardComponent';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { BASIC_SEO_IMG } from '../../../shared/constants';
import { ShowCard, ShowEntry } from '../../models';
import { Button, BUTTON_TYPE, BUTTON_SIZE } from '../../../shared/button/components/Button';

import './ShowListComponent.scss';

enum SHOW_STATUS_FILTER {
    CURRENT = 'current',
    ARCHIVED = 'archived',
    ALL = 'all'
};

const SHOW_LIST_SEO_TITLE = 'Shows'
const SHOW_LIST_SEO_DESCRIPTION = 'Awesome shows from Radio Plato crew'

const SHOW_FILTER_VALUES = [
    SHOW_STATUS_FILTER.CURRENT,
    SHOW_STATUS_FILTER.ARCHIVED,
    SHOW_STATUS_FILTER.ALL
];

export function ShowListComponent() {   
    const [showCards, setShowCards] = useState<ShowCard[]>([]);
    const [visibleShowCards, setVisibleShowCards] = useState<ShowCard[]>([]);
    const [currentFilter, setCurrentFilter] = useState<SHOW_STATUS_FILTER>();

    const loadShows = () => {
        const query = qs.stringify({
            populate: '*',
            pagination: {
                limit: 999
            }
        });

        fetch(`${ process.env.REACT_APP_BACKEND_URL }/shows?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((entry: ShowEntry) => parseShowCard(entry)))
            .then(shows => handleLoadResponse(shows));
    }

    const parseShowCard = (entry: ShowEntry): ShowCard => {
        return {
            author: entry.attributes.Author,
            isArchived: entry.attributes.Archived,
            excerpt: entry.attributes.Excerpt,
            showCover: {
                alternativeText: entry.attributes.ShowCover.data.attributes.alternativeText,
                caption: entry.attributes.ShowCover.data.attributes.caption,
                url: entry.attributes.ShowCover.data.attributes.url
            },
            slug: entry.attributes.Slug,
            title: entry.attributes.Title
        };
    }

    const handleLoadResponse = (shows: ShowCard[]) => {
        if (shows) {           
            setShowCards(shows);
            setCurrentFilter(SHOW_STATUS_FILTER.CURRENT);
        }
    }

    const updateVisibleCards = () => {
        let cards;

        if (currentFilter === SHOW_STATUS_FILTER.CURRENT) {
            cards = showCards.filter(card => !card.isArchived);
        } else if (currentFilter === SHOW_STATUS_FILTER.ARCHIVED) {
            cards = showCards.filter(card => card.isArchived);
        } else {
            cards = showCards;
        }

        setVisibleShowCards(cards);
    }

    useEffect(() => {
        loadShows();
    }, []);

    useEffect(() => {
        updateVisibleCards();
    }, [currentFilter])

    return (
        <div className='show-list'>
            <Seo meta={{
                    title: SHOW_LIST_SEO_TITLE,
                    description: SHOW_LIST_SEO_DESCRIPTION,
                    thumbnail: BASIC_SEO_IMG
                }}
            />
            <div className='shows-list-headline-container'>
                <div className='shows-list-headline'>
                    <div className='shows-list-title'>Shows</div>
                    <div className='show-categories-container'>
                        {
                            SHOW_FILTER_VALUES.map((showFilter, index) => (
                                <Button
                                    key={`${showFilter}-${index}`}
                                    className={`filter-button ${showFilter === currentFilter ? 'selected' : ''}`}
                                    type={BUTTON_TYPE.GHOST}
                                    size={BUTTON_SIZE.SMALL}
                                    label={showFilter}
                                    title={`show '${showFilter}' shows`}
                                    onClick={() => setCurrentFilter(showFilter)}
                                ></Button>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='show-cards-container'>
                <div className='show-cards'>
                    {
                        visibleShowCards.map(showCard => (
                            <ShowCardComponent key={ showCard.slug } showCard={ showCard } />
                        ))
                    }
                </div>
            </div>
        </div>
    );
} 
  
export default ShowListComponent;