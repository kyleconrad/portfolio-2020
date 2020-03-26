import React from "react"
import Img from 'gatsby-image'



const Image = ( props ) => {
	return (
		<Img alt="" fluid={ props.data.fluid } className="bkg--black" />
	)
}



export default Image