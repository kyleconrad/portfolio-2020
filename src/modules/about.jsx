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
			<div className="border border--1 border--transparent">
				<div className="bkg--black padding--top--100 padding--right--100 padding--bottom--300 padding--left--400">
					<div className="header flex--row flex--start flex--align-center margin--bottom--100">">
						<span className="detail color-stop text--gradient">{ props.data.detail }</span>
					</div>

					<div className="padding--top--200 padding--right--50">
						<h3 className="text--white padding--bottom--100">{ props.data.headline }</h3>

						<div className="flex--row flex--between flex--align-start padding--bottom--100">
							<div className="text--white">{ description }</div>

							<ul className="aside width--20 flex--shrink--0 margin--left--75">
								{ socialMedia.map( ( link ) => {
									return (
								        <li key={ link.name } ><a href={ link.url } target="_blank" rel="noopener noreferrer" className="color-stop text--gradient">{ link.name }</a></li>
							        )
								})}
							</ul>
						</div>

						<div className="caption color-stop text--gradient">
							{ additional }
						</div>
					</div>

					<div className="color-stop sidebar sidebar--gradient flex--column flex--end flex--align-center">
						<div className="padding--top--50 bkg--black z--2">
							<span className="color-stop detail text--gradient--reverse">{ toDMS( lat, false ) } { toDMS( long, true ) }</span>
						</div>
					</div>
				</div>
			</div>

			<div className="border border--top--3 border--black">
				<div className="border border--1 border--transparent">
					<div className="height--500 bkg--topo bkg--topo--invert"></div>
				</div>
			</div>
		</footer>
	)
}



export default About