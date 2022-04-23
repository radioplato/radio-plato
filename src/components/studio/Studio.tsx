import React, { Component, RefObject } from "react";

import { isMobileOnly } from "react-device-detect";
import ReactMarkdown from "react-markdown";

import { fromEvent, Subject } from "rxjs";
import { debounceTime, first, mapTo, takeUntil } from "rxjs/operators";

import { Seo } from "../shared/wrappers/seo/Seo";
import ProjectCardComponent from "./project-card/ProjectCardComponent";

import { FilterItem, ProjectTag } from "./enums";
import { StudioHeaderDto, StudioHeader, PortfolioDto, Project, PortfolioTagDto } from "./interfaces";
import { projectTagToFilterItem, filterItemToProjectTag } from "./constants";

import Loader from "../../components/shared/loader/Loader";

import "./Studio.css";

const STUDIO_SEO_TITLE = "Radio Plato Studio";
const STUDIO_SEO_DESCRIPTION = "Plato is a team of professional sound designers, audio engineers, managers and music producers.";

interface StudioComponentState {
    studio: StudioHeader | null;
    projects: Project[] | null;
    displayedProjects: Project[] | null;
    activeProject: Project | null;
    filterItems: FilterItem[] | null;
    currentFilter: FilterItem | null;
    isLoading: boolean;
}

export class StudioComponent extends Component {
    potfolioContainerRef: RefObject<HTMLDivElement>;
    state: StudioComponentState = {
        studio: null,
        projects: [],
        displayedProjects: [],
        activeProject: null,
        filterItems: [],
        currentFilter: FilterItem.All,
        isLoading: true,
    };

    private destroySubject = new Subject<void>();

    constructor(props: any) {
        super(props);

        this.potfolioContainerRef = React.createRef();
    }

    parseStudio(studioDto: StudioHeaderDto): StudioHeader | null {
        return studioDto
            ? {
                  title: studioDto.Title,
                  description: studioDto.Description,
                  studioImage: {
                      alternativeText: studioDto.Image.alternativeText,
                      caption: studioDto.Image.caption,
                      url: studioDto.Image.url,
                  },
              }
            : null;
    }

    parseTags(tag: PortfolioTagDto): ProjectTag[] {
        return Object.entries(tag)
            .filter((entry) => entry[1] === true)
            .map((entry) => entry[0]) as ProjectTag[];
    }

    parseProjects(portfolioDto: PortfolioDto[]): Project[] | null {
        return portfolioDto
            ? portfolioDto.map((project) => {
                  return {
                      title: project.Title,
                      description: project.Description,
                      image: project.Image,
                      tags: this.parseTags(project.Tag),
                      video: project.Video,
                      id: project.id,
                  };
              })
            : null;
    }

    fetchStudio() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolio-header`)
            .then((response) => response.json())
            .then((data: StudioHeaderDto) => this.parseStudio(data))
            .then((studio) => {
                this.setState({ studio });

                setTimeout(() => {
                    this.setState({ isLoading: false });
                }, 3000);
            });
    }

    fetchPortfolio() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolios`)
            .then((response) => response.json())
            .then((data: PortfolioDto[]) => this.parseProjects(data))
            .then((projects) => {
                const filterItems = Array.from(
                    new Set(
                        projects
                            ?.map((project) => project.tags)
                            .flat()
                            .map((tag) => projectTagToFilterItem.get(tag!))
                    )
                )
                    .concat([FilterItem.All])
                    .sort((a: FilterItem | undefined, b: FilterItem | undefined) => a!.localeCompare(b!));

                this.setState({
                    filterItems,
                    projects,
                    displayedProjects: projects,
                });
            });
    }

    componentDidMount() {
        this.fetchStudio();
        this.fetchPortfolio();
    }

    componentWillUnmount() {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    setFilter(filter: FilterItem): void {
        const tag = filterItemToProjectTag.get(filter);

        this.setState({
            currentFilter: filter,
            displayedProjects: tag ? this.state.projects?.filter((project) => project.tags.includes(tag)) : this.state.projects,
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
            activeProject: this.state.activeProject?.id === id ? null : this.state.projects?.find((project) => project.id === id),
        });
    }

    renderFilterButtons(filterItems: FilterItem[] | null): JSX.Element[] | null {
        return (
            filterItems &&
            filterItems.map((item, index) => (
                <div className="filter" key={`filter-${item.toLowerCase()}`}>
                    <div
                        className={`filter-button ${this.state.currentFilter === item && "active"}`}
                        onClick={() => this.setFilter(item)}
                    >
                        {item}
                    </div>
                    <div className={`filter-separator ${index === filterItems.length - 1 ? "hidden" : "visible"}`}>/</div>
                </div>
            ))
        );
    }

    renderProjectCards(projects: Project[] | null): JSX.Element[] | null {
        return (
            projects &&
            projects.map((project, index) => (
                <div className={index % 2 === 0 ? "left" : "right"} key={project.id}>
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
        this.potfolioContainerRef.current?.scrollIntoView({ behavior: "smooth" });

        return fromEvent(document.getElementsByClassName("studio"), "scroll")
            .pipe(debounceTime(100), first(), mapTo(true), takeUntil(this.destroySubject))
            .toPromise();
    }

    render() {
        const { studio, displayedProjects, filterItems, isLoading } = this.state;
        const imageSrc = studio ? studio.studioImage.url : "";
        const imageStyle = {
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundImage: `url(${imageSrc})`,
        };

        return (
            <>
                <article className={`studio ${isMobileOnly ? "mobile" : "desktop"}`}>
                    <Seo
                        meta={{
                            title: STUDIO_SEO_TITLE,
                            description: STUDIO_SEO_DESCRIPTION,
                            thumbnail: imageSrc,
                        }}
                    />
                    <div className={`loader-container ${isLoading ? "visible" : "hidden"}`}>
                        <Loader />
                    </div>
                    <div className="image" style={imageStyle}>
                        <div className="left">
                            <h1>{studio?.title}</h1>
                        </div>
                        <div className="right">
                            <div className="description">
                                <ReactMarkdown source={studio?.description} escapeHtml={false} />
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-container" ref={this.potfolioContainerRef}>
                        <div className="filter-container">{this.renderFilterButtons(filterItems)}</div>
                        <div className="portfolio-list">{this.renderProjectCards(displayedProjects)}</div>
                    </div>
                </article>
            </>
        );
    }
}

export default StudioComponent;
