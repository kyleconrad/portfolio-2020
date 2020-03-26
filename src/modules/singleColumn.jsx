import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Image from "../components/image"



const SingleColumn = ( props ) => {
	const images = props.data.images



	return (
		<div>
			{ props.data.caption &&
				<div>{ documentToReactComponents( props.data.caption.json, props.text ) }</div>
			}

			{ images.map( ( image ) => {
				return (
			        <Image data={ image } />
		        )
			})}
		</div>
	)
}



export default SingleColumn