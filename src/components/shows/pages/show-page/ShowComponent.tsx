import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import qs from 'qs';

import SocialButtonsComponent from '../../../shared/social-links/components/social-buttons/SocialButtonsComponent';
import ShowCardComponent from '../../components/show-card/ShowCardComponent';
import ScheduleLine from '../../../shared/schedule/components/schedule-line/ScheduleLineComponent';

import { Seo } from '../../../shared/wrappers/seo/Seo'
import { Show, ShowCard, ShowEntry } from '../../models';

import { ICON_KEY } from '../../../shared/icons/icons';

import './ShowComponent.scss';


interface ShowComponentProperties {
    slug: string;
}

export function ShowComponent({
    slug
}: ShowComponentProperties) {
    const location = useLocation();

    const [show, setShow] = useState<Show | null>(null);
    const [moreShows, setMoreShows] = useState<ShowCard[]>([]);

    const parseShow = (entry: ShowEntry): Show => {
        return {
            description: entry.attributes.Description,
            showCover: {
                alternativeText: entry.attributes.ShowCover.data.attributes.alternativeText,
                caption: entry.attributes.ShowCover.data.attributes.caption,
                url: entry.attributes.ShowCover.data.attributes.url
            },
            title: entry.attributes.Title,
            slug: entry.attributes.Slug,
            socialButtons: entry.attributes.Links
                ? Object.entries(entry.attributes.Links).map(([key, value]) => ({
                name: key.toLowerCase(),
                icon: key.toLowerCase() as ICON_KEY,
                link: value ? value : ''
                })).filter((button) => button.link && button.name !== 'id')
                : [],
            schedules: entry.attributes.Schedules.data.length
                ? entry.attributes.Schedules.data.map((scheduleInformation) => {
                    return {
                        azuracastID: scheduleInformation.attributes.AzuracastID,
                        title: scheduleInformation.attributes.Title,
                        description: scheduleInformation.attributes.Description,
                        type: scheduleInformation.attributes.Type,
                        link: scheduleInformation.attributes.Episodes ?? '',
                        slug: '',
                        image: {
                            alternativeText: scheduleInformation.attributes.Image.data.attributes.alternativeText,
                            caption: scheduleInformation.attributes.Image.data.attributes.caption,
                            url: scheduleInformation.attributes.Image.data.attributes.url
                        },
                        periodicity: scheduleInformation.attributes.Periodicity,
                    }
                })
                : [],
        };
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

    const loadCurrentShow = () => {
        const query = qs.stringify({
            populate: [
                'Links',
                'ShowCover',
                'Schedules',
                'Schedules.Image',
            ],
            filters: slug ? {
                Slug: {
                    $eqi: slug,
                },
            } : undefined,
        });

        setShow(null);

        return fetch(`${process.env.REACT_APP_BACKEND_URL}/shows?${query}`)
            .then(response => response.json())
            .then(data => data.data[0] ? parseShow(data.data[0]) : null)
            .then(article => setShow(article));
    }

    const loadMoreShows = () => {
        const query = qs.stringify({
            populate: '*',
            pagination: {
                limit: 999
            }
        });

        fetch(`${process.env.REACT_APP_BACKEND_URL}/shows?${query}`)
            .then(response => response.json())
            .then(data => data.data.map((entry: ShowEntry) => parseShowCard(entry)))
            .then(shows => setMoreShows(shows));
    }

    useEffect(() => {
        loadCurrentShow();
    }, [location]);

    useEffect(() => {
        loadMoreShows();
    }, [show]);

    return show ? (
        <article className='show-container'>
            <Seo meta={{
                title: show.title,
                description: show.description,
                thumbnail: show ? show.showCover.url : ''
            }}
            />
            <div className='show'>
                <div className='information'>
                    <h1 className='show-title'>{show.title}</h1>
                    {
                        show.socialButtons.length ? (
                            <div className='social-buttons'>
                                <SocialButtonsComponent socialLinks={show.socialButtons}></SocialButtonsComponent>
                            </div>
                        ) : null
                    }
                    <p className='show-description'>{show.description}</p>
                </div>
                <div className='image'>
                    <img src={show.showCover.url} loading='lazy' alt={show.showCover.alternativeText} />
                </div>
            </div>
            {
                show.schedules.length
                    ? (
                        <div className='from-creator-section'>
                            <div className='from-creator-headline-container'>
                                <div className='from-creator-headline'>
                                    <div className='from-creator-title'>From creator</div>
                                </div>
                            </div>
                            <div className='from-creator-container'>
                                {
                                    show.schedules.map((scheduleCard) => (
                                        <ScheduleLine
                                            card={scheduleCard}
                                            shouldShowEpisodesLink={true}
                                            key={`${scheduleCard.title}-${scheduleCard.periodicity}`.toLowerCase()}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                    : null
            }
            <div className='more-shows-section'>
                <div className='more-shows-headline-container'>
                    <div className='more-shows-headline'>
                        <div className='more-shows-title'>More shows</div>
                    </div>
                </div>
                <div className='more-shows-container'>
                    <div className="more-shows">
                        {
                            moreShows.filter(card => card.slug !== show?.slug)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 3)
                                .map(showCard => (<ShowCardComponent key={showCard.slug} showCard={showCard}></ShowCardComponent>))
                        }
                    </div>
                </div>
            </div>
        </article>
    ) : null;
}

export default ShowComponent;