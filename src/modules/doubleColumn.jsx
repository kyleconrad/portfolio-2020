import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Image from "../components/image"



const DoubleColumn = ( props ) => {
	const leftImages = props.data.leftColumnImages
	const rightImages = props.data.rightColumnImages



	return (
		<div className="border border--left--1 border--right--1 border--transparent margin--bottom--1">
			{ props.data.caption &&
				<div>{ documentToReactComponents( props.data.caption.json, props.text ) }</div>
			}

			<div>
				{ leftImages.map( ( image ) => {
					return (
				        <Image data={ image } />
			        )
				})}
			</div>

			<div>
				{ rightImages.map( ( image ) => {
					return (
				        <Image data={ image } />
			        )
				})}
			</div>
		</div>
	)
}



export default DoubleColumn