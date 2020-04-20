import React from "react"
import Img from 'gatsby-image'



const Image = ( props ) => {
	const contentType = props.data.file.contentType



	return (
		<div className="bkg--black">
			{ contentType === 'image/gif'
				? <Img alt="" fluid={ props.data.fluid } />
				: <Img alt="" fluid={ props.data.localFile.childImageSharp.fluid } />
			}
		</div>
	)
}



export default Image