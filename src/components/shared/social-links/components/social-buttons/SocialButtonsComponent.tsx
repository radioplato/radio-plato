import React from 'react'

import { SocialButton } from '../../models';
import { BUTTON_SIZE, BUTTON_TYPE, Button } from '../../../button/components/Button';

import './SocialButtonsComponent.scss'

interface SocialLinksProperties {
    socialLinks: SocialButton[];
}

function SocialButtonsComponent({ socialLinks }: SocialLinksProperties) {
    return (
        <div className='social-links-container'>
            {
                socialLinks.map((button) => (
                    button.link && button.icon ? (
                        <Button
                            className={`social-button ${button.name}`}
                            key={button.name}
                            href={button.link}
                            title={ `${ button.name } link` }
                            icon={button.icon}
                            type={BUTTON_TYPE.GHOST}
                            size={BUTTON_SIZE.BIG}
                        />
                    ) : null
                ))
            }
        </div>
    );
}

export default SocialButtonsComponent;