import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ pageTitle, type }) => {

    const meta = {
        url: 'https://concreap.com',
        title: 'Concreap',
        description: 'Become a a designer and developer in the crypto & fintech space',
        language: "en-US",
        image: 'https://storage.googleapis.com/checkaam-buckets/concreap-seo',
        author: {
            email: 'hello@concreap.com',
            name: 'Concreap Creative School',
            image:'https://storage.googleapis.com/checkaam-buckets/concreap-seo'
        },
        site: {
            siteName: 'Concreap Consult',
            searchUrl: 'https://www.google.com/search?q=Concreap'
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"></meta>
                <title>{ type === 'main' ? meta.title + ' - ' + meta.description : !type ? 'Concreap | Dashboard' : pageTitle}</title>
                <meta name="description" content={meta.description}></meta>
                <meta name="keywords" content="store, app"></meta>

                <meta itemprop="description" content={meta.description}></meta>
                <meta itemprop="image" content={meta.image}></meta>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@concreap" />
                <meta name="twitter:creator" content="@concreap" />
                <meta name="twitter:title" content="Concreap Creative School"/>
                <meta name="twitter:description" content={meta.description}/>
                <meta name="twitter:image" content={meta.image}/>

                <meta property="og:site_name" content="concreap.com" />
                <meta property="og:title" content="Concreap Creative School"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="og:url" content={meta.url} />
            </Helmet>
        </>
    )
}

export default SEO
