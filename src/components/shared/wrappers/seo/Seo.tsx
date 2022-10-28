import React from 'react';

import { Helmet } from 'react-helmet-async';


const DESCRIPTION_LIMIT = 150;

interface MetaTagsInformation {
    title?: string;
    thumbnail?: string;
    url?: string;
    description?: string;
    type?: string;
}

interface SeoProperties {
    meta?: MetaTagsInformation
}

function Seo ({ meta }: SeoProperties) {
  const description = meta?.description && meta.description.slice(0, DESCRIPTION_LIMIT) + '...';

  return (
    <Helmet>
        <title>{`Radio Plato | ${ meta?.title }`}</title>
        <meta property='og:title' content={ meta?.title } />
        <meta property='og:image' content={ meta?.thumbnail } />
        <meta property='og:description' content={ description } />
        { meta?.type && (<meta property='og:type' content={ meta.type } />) }
        <meta name='description' content={ description } />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ meta?.thumbnail } />
        <link rel="apple-app-site-association file" href="apple-app-site-association" />
    </Helmet>
  )
}

function withSeo (meta: MetaTagsInformation, children: React.ReactNode) {
    return (
        <>
            <Seo meta={ meta }/>
            { children }
        </>
    )
}

export { Seo, withSeo };