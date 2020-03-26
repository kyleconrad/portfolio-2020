import React from "react"

import Image from "../components/image"



const SingleImage = ( props ) => {
	const imageData = props.data.image



	return (
		<Image data={ imageData } />
	)
}



export default SingleImage