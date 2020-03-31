import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Spacer from "../components/spacer"

import { toDMS } from "../js/functions"



const About = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const additional = documentToReactComponents( props.data.additional.json, props.text )

	const socialMedia = props.data.socialMedia



	return (
		<footer>
			<div className="border border--1 border--transparent">
				<div className="bkg--black padding--top--50 padding--right--100 padding--bottom--300 padding--left--400">
					<div className="header flex--row flex--start flex--align-center margin--bottom--100">
						<span className="detail color-stop text--gradient">{ props.data.detail }</span>
					</div>

					<div className="padding--top--200 padding--right--50">
						<h3 className="headline--small text--white padding--bottom--100">{ props.data.headline }</h3>

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
							<span className="color-stop detail text--gradient--reverse">{ toDMS( props.data.location.lat, false ) } { toDMS( props.data.location.lon, true ) }</span>
						</div>
					</div>
				</div>
			</div>

			<Spacer height="500" invert bottom />
		</footer>
	)
}



export default About