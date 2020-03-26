import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { toDMS } from "../js/functions"



const About = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const additional = documentToReactComponents( props.data.additional.json, props.text )

	const socialMedia = props.data.socialMedia

	const lat = toDMS( props.data.location.lat, false )
	const long = toDMS( props.data.location.lon, true )



	return (
		<footer>
			{ props.data.detail }
			{ props.data.headline }

			<div>
				{ description }
			</div>

			<div>
				{ additional }
			</div>

			<ul>
				{ socialMedia.map( ( link ) => {
					return (
				        <li><a href={ link.url } target="_blank" rel="noopener noreferrer">{ link.name }</a></li>
			        )
				})}
			</ul>

			{ lat }
			{ long }
		</footer>
	)
}



export default About