import React, { RefObject } from 'react';
import ReactPlayer from 'react-player';

import Icon from '@iconify/react';
import playIcon from '@iconify/icons-el/play';

import { playerService } from '../../shared/Player/PlayerService';
import { projectTagToFilterItem } from '../constants';
import { ProjectTag } from '../enums';

import { Project } from '../interfaces';

import './ProjectCardComponent.css';

const PLAYER_CONFIG = {
    file: {
        attributes: {
            disablePictureInPicture: true,
            controlsList: 'nodownload noplaybackrate'
        }
    }
};

interface ProjectCardParameters {
    project: Project;
    shouldPlay: boolean;
    onTagClick: (tag: ProjectTag) => void;
    onCardClick: (id: string) => void;
}

function ProjectCardComponent ({ project, shouldPlay, onTagClick, onCardClick }: ProjectCardParameters) {   
    const playerRef: RefObject<ReactPlayer> = React.createRef();

    const handleTagClick = (tag: ProjectTag) => {
        onTagClick(tag);
    }

    const handleCardClick = () => { 
        onCardClick(project.id);
        playerRef.current?.seekTo(0);
        if (playerService.playing) {
            playerService.muted = true;
        }
    }

    const renderMedia = () => {
        return (
            <ReactPlayer
                config={ PLAYER_CONFIG }
                ref={ playerRef }
                url={ project.video?.url }
                controls={ true }
                playing={ shouldPlay }
                muted={ !shouldPlay }
                loop={ true }
                volume={ 1 }
                width={ '100%' }
                height={ '100%' }
            />
        );
    }

    return (
        <div className='project-card-container'>
            <div className='media-container'>
                <div
                    className={ `media-image ${ shouldPlay ? 'hidden' : 'visible' }` }
                    title={ project.title }
                    style={{
                        backgroundImage: `url(${ project.image.url })`,
                    }}
                    onClick={ () => handleCardClick() }
                >
                    {
                        !shouldPlay && (
                            <div className='circle'>
                                <Icon icon={ playIcon } width={ 24 } height={ 24 }/>
                            </div>
                        )
                    }
                </div>
                <div className='media-video'>{ renderMedia() }</div>
            </div>
            <div className='information-container'>
                <div className='project-tags'>{
                    project.tags.length && project.tags.map((tag, index) => (
                        <div className="tag" key={ `${project.id}-${tag.toLowerCase()}` }>
                            <div className='tag-name' onClick={ () => handleTagClick(tag) }>{ projectTagToFilterItem.get(tag) }</div>
                        </div>
                    ))
                }</div>
                <h2 className='project-title'>{ project.title }</h2>
                <p className='project-description'>{ project.description }</p>
            </div>
        </div>
    );
}

export default ProjectCardComponent;