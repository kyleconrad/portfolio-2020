import React from "react"
import Img from 'gatsby-image'



const Image = ( props ) => {
	return (
		<Img alt="" fluid={ props.data.fluid } />
	)
}



export default Image