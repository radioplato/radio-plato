import React, { useState } from 'react';
import { projectTagToFilterItem } from '../constants';
import { ProjectTag } from '../enums';

import { Project } from '../interfaces';

import './ProjectCardComponent.css';

interface ProjectCardParameters {
    project: Project;
    onTagClick: (tag: ProjectTag) => void;
}

function ProjectCardComponent ({ project, onTagClick }: ProjectCardParameters) {
    const [visibility, toggleVisibility] = useState(true);

    const handleTagClick = (tag: ProjectTag) => {
        onTagClick(tag);
    }

    return (
        <div className='project-card-container'>
            <div className='media-container' onClick={ () => toggleVisibility(!visibility) }>
                <div
                    className='media-image'
                    title={ project.title }
                    style={{
                        backgroundImage: `url(${ project.image.url })`,
                        display: visibility ? 'block' : 'none'
                    }}
                ></div>
                <video
                    className='media-video'
                    src={ project.video.url }
                    autoPlay
                    loop
                    muted
                />
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