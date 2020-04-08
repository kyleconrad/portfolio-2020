import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import Header from "../components/header"
import Sidebar from "../components/sidebar"
import Spacer from "../components/spacer"



const About = ( props ) => {
	const description = documentToReactComponents( props.data.description.json, props.text )
	const additional = documentToReactComponents( props.data.additional.json, props.text )

	const socialMedia = props.data.socialMedia



	return (
		<footer>
			<div className="border border--1 border--transparent">
				<div className="bkg--black padding--top--50 padding--right--100 padding--bottom--300 padding--left--400 landscape-padding--left--300">
					<Header text={ props.data.detail } gradient />

					<div className="padding--top--200 padding--right--50 landscape-padding--left--50 portrait-padding--left--25">
						<h3 className="headline headline--small text--white padding--bottom--100">{ props.data.headline }</h3>

						<div className="flex--row flex--between flex--align-start padding--bottom--100">
							<div className="text--white">{ description }</div>

							<ul className="aside width--20 flex--shrink--0 margin--left--75">
								{ socialMedia.map( ( link ) => {
									return (
								        <li key={ link.name } >
								        	<OutboundLink href={ link.url } target="_blank" rel="noopener noreferrer" className="color-stop text--gradient">{ link.name }</OutboundLink>
							        	</li>
							        )
								})}
							</ul>
						</div>

						<div className="caption color-stop text--gradient">
							{ additional }
						</div>
					</div>

					<Sidebar location={ props.data.location } />
				</div>
			</div>

			<Spacer height="500" invert bottom />
		</footer>
	)
}



export default About