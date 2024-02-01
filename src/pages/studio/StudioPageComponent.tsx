import React, { Component, RefObject } from 'react';

import qs from 'qs';

import { isMobileOnly } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, first, mapTo, takeUntil } from 'rxjs/operators';

import { Seo } from '../../components/shared/wrappers/seo/Seo';

import SocialButtonsComponent from '../../components/shared/social-links/components/social-buttons/SocialButtonsComponent';
import ProjectCardComponent from './project-card/ProjectCardComponent';

import { FilterItem, ProjectTag } from './enums';
import { Project, Portfolio, PorfolioEntry, PortfolioItemTagData } from './models';
import { projectTagToFilterItem, filterItemToProjectTag } from './constants';
import { PLATO_SOCIAL_BUTTONS } from '../../components/shared/social-links/constants';

import './StudioPageComponent.scss';

const STUDIO_SEO_TITLE = 'Radio Plato Studio';
const STUDIO_SEO_DESCRIPTION = 'Plato is a team of professional sound designers, audio engineers, managers and music producers.';

interface StudioComponentState {
    portfolio: Portfolio | null;
    displayedProjects: Project[] | null;
    activeProject: Project | null;
    filterItems: FilterItem[] | null;
    currentFilter: FilterItem | null;
}

export class StudioComponent extends Component {
    potfolioContainerRef: RefObject<HTMLDivElement>;
    state: StudioComponentState = {
        portfolio: null,
        displayedProjects: [],
        activeProject: null,
        filterItems: [],
        currentFilter: FilterItem.All,
    };

    private destroySubject = new Subject<void>();

    constructor(props: any) {
        super(props);

        this.potfolioContainerRef = React.createRef();
    }

    parseTags(tag: PortfolioItemTagData): ProjectTag[] {
        return Object.entries(tag)
            .filter((entry) => entry[1] === true)
            .map((entry) => entry[0]) as ProjectTag[];
    }

    parsePortfolio(entry: PorfolioEntry): Portfolio | null {
        console.log(entry)
        return {
            description: entry.attributes.Description,
            title: entry.attributes.Title,
            studioImage: {
                alternativeText: entry.attributes.Image.data.attributes.alternativeText,
                caption: entry.attributes.Image.data.attributes.caption,
                url: entry.attributes.Image.data.attributes.url
            },
            projects: entry.attributes.PortfolioItem.map((item) => ({
                description: item.Description,
                image: {
                    ...item.Image.data.attributes
                },
                tags: this.parseTags(item.Tag),
                title: item.Title,
                video: {
                    ...item.Video.data.attributes
                },
                id: item.id.toString(),
            })),
        };
    }

    fetchPortfolioV2() {
        const query = qs.stringify({
            populate: [
                'Image',
                'PortfolioItem',
                'PortfolioItem',
                'PortfolioItem.Image',
                'PortfolioItem.Video',
                'PortfolioItem.Tag',
            ],
        });

        return fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolio?${query}`)
        .then((response) => response.json())
        .then(data => this.parsePortfolio(data.data))
        .then((portfolio) => {
            const filterItems = Array.from(
                new Set(
                    portfolio?.projects
                        ?.map((project) => project.tags)
                        .flat()
                        .map((tag) => projectTagToFilterItem.get(tag!))
                )
            )
                .concat([FilterItem.All])
                .sort((a: FilterItem | undefined, b: FilterItem | undefined) => a!.localeCompare(b!));

            this.setState({
                filterItems,
                portfolio,
                displayedProjects: portfolio?.projects,
                isLoading: false,
            });
        });
    }

    componentDidMount() {
        this.fetchPortfolioV2();
    }

    componentWillUnmount() {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    setFilter(filter: FilterItem): void {
        const tag = filterItemToProjectTag.get(filter);

        this.setState({
            currentFilter: filter,
            displayedProjects: tag ? this.state.portfolio?.projects?.filter((project) => project.tags.includes(tag)) : this.state.portfolio?.projects,
            activeProject: null,
        });
    }

    handleTagClick(tag: ProjectTag): void {
        this.scrollToTop().then(() => {
            const filter = projectTagToFilterItem.get(tag);

            filter && this.setFilter(filter);
        });
    }

    handleCardClick(id: string): void {
        this.setState({
            activeProject: this.state.activeProject?.id === id ? null : this.state.portfolio?.projects?.find((project) => project.id === id),
        });
    }

    renderFilterButtons(filterItems: FilterItem[] | null): JSX.Element[] | null {
        return (
            filterItems &&
            filterItems.map((item, index) => (
                <div className='filter' key={`filter-${item.toLowerCase()}`}>
                    <div
                        className={`filter-button ${this.state.currentFilter === item && 'active'}`}
                        onClick={() => this.setFilter(item)}
                    >
                        {item}
                    </div>
                </div>
            ))
        );
    }

    renderProjectCards(projects: Project[] | null): JSX.Element[] | null {
        return (
            projects &&
            projects.map((project, index) => (
                <div className={index % 2 === 0 ? 'left' : 'right'} key={project.id}>
                    <ProjectCardComponent
                        project={project}
                        shouldPlay={project.id === this.state.activeProject?.id}
                        onTagClick={(tag) => this.handleTagClick(tag)}
                        onCardClick={(id) => this.handleCardClick(id)}
                    ></ProjectCardComponent>
                </div>
            ))
        );
    }

    scrollToTop(): Promise<boolean> {
        this.potfolioContainerRef.current?.scrollIntoView({ behavior: 'smooth' });

        return fromEvent(document.getElementsByClassName('studio'), 'scroll')
            .pipe(debounceTime(100), first(), mapTo(true), takeUntil(this.destroySubject))
            .toPromise();
    }

    render() {
        const { portfolio, displayedProjects, filterItems } = this.state;
        const imageSrc = portfolio ? portfolio.studioImage.url : '';
        const imageStyle = {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: `url(${imageSrc})`,
        };

        return (
            <>
                <article className={`studio ${isMobileOnly ? 'mobile' : 'desktop'}`}>
                    <Seo
                        meta={{
                            title: STUDIO_SEO_TITLE,
                            description: STUDIO_SEO_DESCRIPTION,
                            thumbnail: imageSrc,
                        }}
                    />
                    <div className='image' style={imageStyle}>
                        <div className='left-section'>
                            <h1>{portfolio?.title}</h1>
                        </div>
                        <div className='right-section'>
                            <div className='description'>
                                     <ReactMarkdown source={portfolio?.description} escapeHtml={false} />
                                <div className='social-buttons'>
                                      <SocialButtonsComponent socialLinks={ PLATO_SOCIAL_BUTTONS }></SocialButtonsComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='portfolio-container' ref={this.potfolioContainerRef}>
                        <div className='filter-container'>{this.renderFilterButtons(filterItems)}</div>
                        <div className='portfolio-list'>{this.renderProjectCards(displayedProjects)}</div>
                    </div>
                </article>
            </>
        );
    }
}

export default StudioComponent;
