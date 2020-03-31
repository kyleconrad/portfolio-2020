import React from "react"

import { toRomanNumeral } from "../js/functions"
import { toDMS } from "../js/functions"



const Hero = ( props ) => {
	const year = toRomanNumeral( props.data.year )



	return (
		<header className="border border--1 border--transparent">
			<div className="bkg--black padding--top--50 padding--right--100 padding--bottom--400 padding--left--400">
				<div className="header flex--row flex--start flex--align-center margin--bottom--100">
					<span className="detail color-stop text--gradient">{ props.data.detail }</span>
				</div>
				
				<div className="padding--top--400">
					<h1 className="headline text--white">{ props.data.headline } </h1><h2 className="headline text--gray">{ props.data.subhead }</h2>
				</div>

				<div className="color-stop sidebar sidebar--gradient flex--column flex--between flex--align-center">
					<div className="padding--bottom--50 bkg--black z--2">
						<span className="color-stop detail text--gradient--reverse">{ year }</span>
					</div>

					{ props.data.location &&
						<div className="padding--top--50 bkg--black z--2">
							<span className="color-stop detail text--gradient--reverse">{ toDMS( props.data.location.lat, false ) } { toDMS( props.data.location.lon, true ) }</span>
						</div>
					}
				</div>
			</div>
		</header>
	)
}



export default Hero