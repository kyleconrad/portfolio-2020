import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Image from "../components/image"



const DoubleColumn = ( props ) => {
	const leftImages = props.data.leftColumnImages
	const rightImages = props.data.rightColumnImages



	return (
		<section className="flex--row flex--between flex--align-stretch border border--left--1 border--transparent">
			<div className={ `width--200 flex--shrink--0 flex--column border border--right--1 border--transparent margin--bottom--1 ${ props.data.alignment === 'Right' ? 'order--1' : 'order--2' }` }>
		        <div className="flex--grow bkg--topo bkg--topo--invert"></div>
	        </div>

			<div className={ `flex--grow ${ props.data.alignment === 'Right' ? 'order--2' : 'order--1' }` }>
				{ props.data.caption &&
					<div className="border border--right--1 border--transparent margin--bottom--1">
						<div className="bkg--black padding--75">
							<div className="caption color-stop text--gradient">{ documentToReactComponents( props.data.caption.json, props.text ) }</div>
						</div>
					</div>
				}

				<div className="flex--row flex--between flex--align-stretch">
					<div className="width--50 border border--right--1 border--transparent">
						{ leftImages.map( ( image ) => {
							return (
						        <div key={ image.id } className="margin--bottom--1">
							        <Image data={ image } />
						        </div>
					        )
						})}
					</div>

					<div className="width--50 flex--equal--2 border border--right--1 border--transparent">
						{ rightImages.map( ( image ) => {
							return (
						        <div key={ image.id } className="margin--bottom--1">
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