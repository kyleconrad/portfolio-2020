import React from "react"

import Image from "../components/image"
import Caption from "../components/caption"



const SingleColumn = ( props ) => {
	const images = props.data.images



	return (
		<section className="flex--row flex--between flex--align-stretch border border--left--1 border--transparent">
			<div className={ `width--500 flex--shrink--0 flex--column border border--right--1 border--transparent margin--bottom--1 ${ props.data.alignment === 'Right' ? 'order--1' : 'order--2' }` }>
		        <div className="flex--grow bkg--topo bkg--topo--invert"></div>
	        </div>

			<div className={ `flex--grow border border--right--1 border--transparent ${ props.data.alignment === 'Right' ? 'order--2' : 'order--1' }` }>
				{ props.data.caption &&
					<Caption caption={ props.data.caption.json } text={ props.text } />
				}

				{ images.map( ( image ) => {
					return (
				        <div key={ image.id } className="margin--bottom--1">
					        <Image data={ image } />
				        </div>
			        )
				})}
			</div>
		</section>
	)
}



export default SingleColumn