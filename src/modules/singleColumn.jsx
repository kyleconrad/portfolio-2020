import React from "react"

import Image from "../components/image"
import Caption from "../components/caption"



const SingleColumn = ( props ) => {
	const images = props.data.images



	return (
		<section className="flex--row flex--between flex--align-stretch border border--left--1 border--transparent">
			<div className={ `width--500 landscape-width--400 portrait-width--350 mobile-width--100 flex--shrink--0 flex--column border border--right--1 border--bottom--1 border--transparent overflow--hidden ${ props.data.alignment === 'Right' ? 'order--1' : 'order--2' }` }>
		        <div className="flex--grow bkg--topo bkg--topo--invert" />
	        </div>

			<div className={ `flex--grow ${ props.data.alignment === 'Right' ? 'order--2' : 'order--1' }` }>
				{ props.data.caption &&
					<Caption caption={ props.data.caption } text={ props.text } />
				}

				{ images.map( ( image ) => {
					return (
				        <div key={ image.id } className="border border--right--1 border--bottom--1 border--transparent">
					        <Image data={ image } />
				        </div>
			        )
				})}
			</div>
		</section>
	)
}



export default SingleColumn