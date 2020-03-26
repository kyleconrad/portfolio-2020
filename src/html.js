import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
	return (
	        <html lang="en" {...props.htmlAttributes}>

	        <head>
	        <meta charSet="utf-8" />
	        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
	        <meta
		        name="viewport"
		        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui"
	        />
	        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
	        <meta httpEquiv="cleartype" content="on" />

	        {props.headComponents}

	        <meta name="robots" content="NOODP" />
	        </head>

	        <body {...props.bodyAttributes}>

	        {props.preBodyComponents}

	        <div
		        key={`body`}
		        id="___gatsby"
		        dangerouslySetInnerHTML={{ __html: props.body }}
	        />

	        {props.postBodyComponents}

	        </body>
	        </html>
    )
}

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array,
}
