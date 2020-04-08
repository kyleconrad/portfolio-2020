import React from "react"

import Header from "../components/header"
import Sidebar from "../components/sidebar"



const Hero = ( props ) => {
	return (
		<header className="border border--1 border--transparent">
			<div className="bkg--black padding--top--50 padding--right--100 padding--bottom--400 padding--left--400 landscape-padding--left--300 mobile-padding--left--100">
				<Header text={ props.data.detail } gradient />
				
				<div className="padding--top--400 landscape-padding--left--50 portrait-padding--left--25 mobile-padding--left--0">
					<h1 className="headline text--white">{ props.data.headline } </h1><h2 className="headline text--gray">{ props.data.subhead }</h2>
				</div>

				<Sidebar year={ props.data.year } location={ props.data.location } />
			</div>
		</header>
	)
}



export default Hero