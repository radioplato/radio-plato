import React, { useState } from 'react';

import { Project } from '../interfaces';

import './ProjectCardComponent.css';

interface ProjectCardParameters {
    project: Project;
}

function ProjectCardComponent ({ project }: ProjectCardParameters) {
    const [visibility, toggleVisibility] = useState(true);

    return (
        <div className='project-card-container'>
            <div className='media-container'>
                <div
                    className='media-image'
                    title={ project.title }
                    style={{
                        backgroundImage: `url(${ project.image.url })`,
                        display: visibility ? 'block' : 'none'
                    }}
                    onClick={ () => toggleVisibility(!visibility) }
                ></div>
                <video
                    className='media-video'
                    onClick={ () => toggleVisibility(!visibility) }
                    src={ project.video.url }
                    autoPlay
                    loop
                    muted
                />
            </div>
            <div className='information-container'>

            </div>
        </div>
    );
}

export default ProjectCardComponent;