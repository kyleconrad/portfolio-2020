import React from "react"

import Image from "../components/image"



const SingleImage = ( props ) => {
	const imageData = props.data.image



	return (
        <section className="border border--left--1 border--right--1 border--transparent margin--bottom--1">
	        <div className={ `bkg--black ${ props.data.padded ? 'padding--50' : '' }` }>
				<Image data={ imageData } />
			</div>
		</section>
	)
}



export default SingleImage