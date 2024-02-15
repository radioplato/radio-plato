import React from 'react';

import { withSeo } from '../../../shared/wrappers/seo/Seo';
import { withScroll } from '../../../shared/wrappers/scrollable/Scrollable';

import NewsListComponent from '../../components/news-list/NewsListComponent';
import NewsCarouselComponent from '../../components/news-carousel/NewsCarouselComponent';
import { BASIC_SEO_IMG } from '../../../shared/constants';

import './NewsPageComponent.scss';


const NEWS_LIST_SEO_TITLE = 'News';
const NEWS_LIST_SEO_DESCRIPTION = 'The best place to read about electronic music, both local and global.';

interface NewsPageComponentProperties {
    category?: string;
};

export function NewsPageComponent({
    category,
}: NewsPageComponentProperties) {
    return withSeo({
        title: NEWS_LIST_SEO_TITLE,
        description: NEWS_LIST_SEO_DESCRIPTION,
        thumbnail: BASIC_SEO_IMG
    }, withScroll(
        <div>
            {
                !category ? <NewsCarouselComponent /> : null
            }
            <NewsListComponent isStartPage={false} category={category} />
        </div>
    ));
}