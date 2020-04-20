import React from "react"
import Img from 'gatsby-image'



const Image = ( props ) => {
	const contentType = props.data.file.contentType
	const url = props.data.file.url



	return (
		<div className="bkg--black">
			{ contentType === 'image/gif'
				? <img alt="" src={ url } />
				: <Img alt="" fluid={ props.data.localFile.childImageSharp.fluid } />
			}
		</div>
	)
}



export default Image