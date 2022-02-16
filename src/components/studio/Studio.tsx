import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';

import { StudioHeaderDto, StudioHeader, PortfolioDto, Project, PortfolioTagDto } from './interfaces';
import { Seo } from '../shared/wrappers/seo/Seo'

import './Studio.css';
import { FilterItem, ProjectTag } from './enums';
import { projectTagToFilterItem } from './constants';
import ProjectCardComponent from './project-card/ProjectCardComponent';

const STUDIO_SEO_TITLE = 'Studio';
const STUDIO_SEO_DESCRIPTION = 'Plato Sound'

interface StudioComponentState {
    studio: StudioHeader | null;
    projects: Project[] | null;
    filterItems: FilterItem[] | null;
    currentFilter: FilterItem | null;
}

export class StudioComponent extends Component {
    state: StudioComponentState = {
        studio: null,
        projects: [],
        filterItems: [],
        currentFilter: FilterItem.All,
    }

    parseStudio(studioDto: StudioHeaderDto): StudioHeader | null {
        return studioDto ? {
            title: studioDto.Title,
            description: studioDto.Decription,
            studioImage: {
                alternativeText: studioDto.Image.alternativeText,
                caption: studioDto.Image.caption,
                url: studioDto.Image.url
            }
        } : null
    }

    parseTags(tag: PortfolioTagDto): ProjectTag[] {
        return Object.entries(tag).filter(entry => entry[1] === true).map(entry => entry[0]) as ProjectTag[];
    }

    parseProjects(portfolioDto: PortfolioDto[]): Project[] | null {
        return portfolioDto ? portfolioDto.map(project => {
            return {
                title: project.Title,
                description: project.Description,
                image: project.Image,
                tags: this.parseTags(project.Tag),
                audio: project.Audio,
                video: project.Video,
            }
        }) : null;
    }

    fetchStudio () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/portfolio-header`)
            .then(response => response.json())
            .then((data: StudioHeaderDto) => this.parseStudio(data))
            .then(studio => this.setState({ studio }));
    }

    fetchPortfolio () {
        fetch(`${ process.env.REACT_APP_BACKEND_URL }/portfolios`)
            .then(response => response.json())
            .then((data: PortfolioDto[]) => this.parseProjects(data))
            .then(projects => {
                const filterItems = Array
                    .from(new Set(projects?.map(project => project.tags).flat().map(tag => projectTagToFilterItem.get(tag!))))
                    .concat([ FilterItem.All ])
                    .sort((a: FilterItem | undefined, b: FilterItem | undefined) => a!.localeCompare(b!));

                this.setState({
                    projects,
                    filterItems,
                });
            });
    }

    setFilter (filter: FilterItem): void {
        this.setState({ currentFilter: filter });
    }

    componentDidMount () {
        this.fetchStudio();
        this.fetchPortfolio();
    }

    renderFilterButtons (filterItems: FilterItem[] | null): JSX.Element[] | null {
        return filterItems && filterItems.map((item, index) => (
            <>
                <div className='filter-button' onClick={ () => this.setFilter(item) }>{ item }</div>
                <div className={`filter-separator ${ index === filterItems.length - 1 ? 'hidden' : 'visible' }`}>/</div>
            </>
        ))
    }

    renderProjectCards (projects: Project[] | null): JSX.Element[] | null {
        return projects && projects.map((project, index) => (
            <div className={ index % 2 === 0 ? 'left' : 'right' }>
                <ProjectCardComponent project={ project }></ProjectCardComponent>
            </div>
        ));
    }

    render () {
        const {
            studio,
            projects,
            filterItems,
        } = this.state;
        const imageSrc = studio ? studio.studioImage.url : '';
        const imageStyle = {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: `url(${ imageSrc })`
        };

        return studio ? (
            <article className={ `studio ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                 <Seo meta={{
                        title: STUDIO_SEO_TITLE,
                        description: STUDIO_SEO_DESCRIPTION,
                        thumbnail: imageSrc
                    }}
                />
                <div className='image' style={ imageStyle }>
                    <div className='left'>
                        <h1>{ studio.title }</h1>
                    </div>
                    <div className='right'>
                        <div className='description'>
                            <ReactMarkdown
                                source={ studio.description }
                                escapeHtml={ false }
                            />
                        </div>
                    </div>
                </div>
                <div className='portfolio-container'>
                    <div className='filter-container'>
                        { this.renderFilterButtons(filterItems) }
                    </div>
                    <div className='portfolio-list'>
                        { this.renderProjectCards(projects) }
                    </div>
                </div>
            </article>
        ) : null;
    }
}

export default StudioComponent;