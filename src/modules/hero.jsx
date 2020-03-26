import React from "react"

import { toRomanNumeral } from "../js/functions"
import { toDMS } from "../js/functions"



const Hero = ( props ) => {
	const year = toRomanNumeral( props.data.year )



	return (
		<header>
			{ props.data.detail }
			{ props.data.headline }
			{ props.data.subhead }
			{ year }

			{ props.data.location &&
				<span>{ toDMS( props.data.location.lat, false ) } { toDMS( props.data.location.lon, true ) }</span>
			}
		</header>
	)
}



export default Hero