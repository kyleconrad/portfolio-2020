import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"



const Description = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const detail = documentToReactComponents( props.data.detail.json, props.text )



	return (
        <section>
		    <div>{ description }</div>
		    <div>{ detail }</div>
	    </section>
	)
}



export default Description