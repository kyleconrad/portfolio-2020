import React from "react"

import Image from "../components/image"
import Caption from "../components/caption"



const DoubleColumn = ( props ) => {
	const leftImages = props.data.leftColumnImages
	const rightImages = props.data.rightColumnImages



	return (
		<section className="flex--row flex--between flex--align-stretch border border--left--1 border--transparent">
			{ props.data.alignment !== 'Full' &&
				<div className={ `width--250 flex--shrink--0 flex--column border border--right--1 border--bottom--1 border--transparent overflow--hidden ${ props.data.alignment === 'Right' ? 'order--1' : 'order--2' }` }>
			        <div className="flex--grow bkg--topo bkg--topo--invert" />
		        </div>
		    }

			<div className={ `flex--grow ${ props.data.alignment === 'Right' ? 'order--2' : 'order--1' }` }>
				{ props.data.caption &&
					<Caption caption={ props.data.caption.json } text={ props.text } />
				}

				<div className="flex--row flex--between flex--align-stretch">
					<div className="width--50 border border--right--1 border--transparent">
						{ leftImages.map( ( image ) => {
							return (
						        <div key={ image.id } className="border border--bottom--1 border--transparent">
							        <Image data={ image } />
						        </div>
					        )
						})}
					</div>

					<div className="width--50 border border--right--1 border--transparent">
						{ rightImages.map( ( image ) => {
							return (
						        <div key={ image.id } className="border border--bottom--1 border--transparent">
							        <Image data={ image } />
						        </div>
					        )
						})}
					</div>
				</div>
			</div>
		</section>
	)
}



export default DoubleColumn