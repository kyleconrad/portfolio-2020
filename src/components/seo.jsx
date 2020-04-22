import React from "react"
import Helmet from "react-helmet"



const Seo = ( props ) => {
	return (
        <Helmet>
        	<title>{ props.title }</title>
        	<meta name="description" content={ props.description } />

        	<link rel="canonical" href={ props.url } />
        	<meta name="url" content={ props.url } />
		    <meta name="identifier-URL" content={ props.url } />

		    <meta property="og:url" content={ props.url } />
			<meta property="og:title" content={ props.title } />
			<meta property="og:description" content={ props.description } />
			<meta property="og:image" content={ `/images/social/social.png` } />
			<meta property="og:type" content="website" />

			<meta name="twitter:card" content="summary_large_image" />
		    <meta name="twitter:site" content={ props.author } />
		    <meta name="twitter:title" content={ props.title } />
		    <meta name="twitter:description" content={ props.description } />
		    <meta name="twitter:creator" content={ props.author } />
		    <meta name="twitter:image:src" content={ `/images/social/social.png` } />

		    <meta itemprop="name" content={ props.title } />
			<meta itemprop="description" content={ props.description } />
			<meta itemprop="image" content={ `/images/social/social.png` } />
		</Helmet>
	)
}



export default Seo