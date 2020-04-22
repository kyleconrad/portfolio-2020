import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { OutboundLink } from "gatsby-plugin-google-analytics"



const Description = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const detail = documentToReactComponents( props.data.detail.json, props.detail )



	return (
        <section className="flex--row flex--between flex--align-stretch border border--left--1 border--bottom--1 border--transparent">
	        <div className="width--300 landscape-width--250 portrait-width--225 mobile-width--150 flex--shrink--0 flex--column border border--right--1 border--transparent overflow--hidden">
		        <div className="flex--grow bkg--topo bkg--topo--invert" />
	        </div>

	        <div className="border border--right--1 border--transparent">
		        <div className="padding--horizontal--100 padding--top--75 padding--bottom--100 bkg--black">
		        	{ props.data.url &&
		        		<div className="padding--bottom--75">
		        			<p className="p--large">
		        				<OutboundLink href={ props.data.url } target="_blank" rel="noopener noreferrer" className="color-stop text--gradient">Visit { props.title }</OutboundLink>
		        			</p>
		        		</div>
		        	}

				    <div className="text--white padding--bottom--75">{ description }</div>
				    <div className="caption color-stop text--gradient">{ detail }</div>
			    </div>
		    </div>
	    </section>
	)
}



export default Description