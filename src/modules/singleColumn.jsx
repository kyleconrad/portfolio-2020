import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Image from "../components/image"



const SingleColumn = ( props ) => {
	const images = props.data.images



	return (
		<div className="border border--left--1 border--right--1 border--transparent margin--bottom--1">
			{ props.data.caption &&
				<div>{ documentToReactComponents( props.data.caption.json, props.text ) }</div>
			}

			{ images.map( ( image ) => {
				return (
			        <Image key={ image.id } data={ image } />
		        )
			})}
		</div>
	)
}



export default SingleColumn