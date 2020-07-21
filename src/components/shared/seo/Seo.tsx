import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProperties {
        title?: string;
        thumbnail?: string;
        url?: string;
        description?: string ;
}

const DESCRIPTION_LIMIT=150;

function Seo (pageProps: SeoProperties) {
  const description=pageProps.description && pageProps.description.slice(0, DESCRIPTION_LIMIT) + "...";

  return (
      <Helmet>
        <title>{`Radio Plato | ${pageProps.title}`}</title>
        <meta property="og:title" content={pageProps.title} />
        <meta property="og:image" content={pageProps.thumbnail} />
        <meta property="og:description" content={description} />
        <meta property="description" content={description} />
      </Helmet>
  )
}

export default Seo;