import React, { RefObject } from 'react';
import ReactPlayer from 'react-player';
import { projectTagToFilterItem } from '../constants';
import { ProjectTag } from '../enums';

import { Project } from '../interfaces';

import './ProjectCardComponent.css';

interface ProjectCardParameters {
    project: Project;
    isPlaying: boolean;
    onTagClick: (tag: ProjectTag) => void;
    onCardClick: (id: string) => void;
}

function ProjectCardComponent ({ project, isPlaying, onTagClick, onCardClick }: ProjectCardParameters) {
    const playerRef: RefObject<ReactPlayer> = React.createRef()

    const handleTagClick = (tag: ProjectTag) => {
        onTagClick(tag);
    }

    const handleCardClick = () => {
        playerRef.current?.seekTo(0);
        onCardClick(project.id);
    }

    const renderMedia = () => {
        const url = project.video.url || project.audio.url;
        
        return (
            <ReactPlayer
                ref={ playerRef }
                url={ url }
                controls={ true }
                playing={ true }
                loop={ true }
                volume={ 1 }
                muted={ true }
            />
        );
    }

    return (
        <div className='project-card-container'>
            <div className='media-container' onClick={ () => handleCardClick() }>
                <div
                    className='media-image'
                    title={ project.title }
                    style={{
                        backgroundImage: `url(${ project.image.url })`,
                        display: !isPlaying ? 'block' : 'none'
                    }}
                ></div>
                <div>{ renderMedia() }</div>
            </div>
            <div className='information-container'>
                <h2 className='project-title'>{ project.title }</h2>
                <div className='project-tags'>{
                    project.tags.length && project.tags.map((tag, index) => (
                        <div className="tag" key={ `${project.id}-${tag.toLowerCase()}` }>
                            <div className='tag-name' onClick={ () => handleTagClick(tag) }>{ projectTagToFilterItem.get(tag) }</div>
                            <div className={`tag-separator ${ index === project.tags.length - 1 ? 'hidden' : 'visible' }`}>/</div>
                        </div>
                    ))
                }</div>
            </div>
        </div>
    );
}

export default ProjectCardComponent;