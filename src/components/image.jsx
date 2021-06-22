import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"



const Image = ( props ) => {
	const contentType = props.data.file.contentType



	return (
		<div className="bkg--black">
			{ contentType === 'image/gif'
				? <img alt="" src={ props.data.file.url } width={ props.data.file.details.image.width } height={ props.data.file.details.image.height } loading="lazy" />
				: <GatsbyImage alt="" image={ props.data.source } />
			}
		</div>
	)
}



export default Image