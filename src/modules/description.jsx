import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"



const Description = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const detail = documentToReactComponents( props.data.detail.json, props.text )



	return (
        <section className="flex--row flex--between flex--align-stretch border border--left--1 border--bottom--1 border--transparent">
	        <div className="width--300 flex--shrink--0 flex--column border border--right--1 border--transparent">
		        <div className="flex--grow bkg--topo bkg--topo--invert"></div>
	        </div>

	        <div className="border border--right--1 border--transparent">
		        <div className="padding--horizontal--100 padding--top--75 padding--bottom--100 bkg--black">
				    <div className="text--white padding--bottom--75">{ description }</div>
				    <div className="caption color-stop text--gradient">{ detail }</div>
			    </div>
		    </div>
	    </section>
	)
}



export default Description