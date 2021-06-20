import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"



const Image = ( props ) => {
	return (
		<div className="bkg--black">
			<GatsbyImage alt="" image={ props.data.source } />
		</div>
	)
}



export default Image