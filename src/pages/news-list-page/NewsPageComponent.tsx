import React from 'react';

import { withSeo } from '../../components/shared/wrappers/seo/Seo';
import { withScroll } from '../../components/shared/wrappers/scrollable/Scrollable';

import NewsListComponent from '../../components/news/components/news-list/NewsListComponent';
import { BASIC_SEO_IMG } from '../../components/shared/constants';

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
    }, withScroll(<NewsListComponent isStartPage={false} category={category} />));
}