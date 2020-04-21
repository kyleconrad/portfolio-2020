import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

import Hero from "../modules/hero"
import Description from "../modules/description"
import SingleImage from "../modules/singleImage"
import Video from "../modules/video"
import SingleColumn from "../modules/singleColumn"
import DoubleColumn from "../modules/doubleColumn"



const CaseStudy = ( props ) => {
	const hero = props.data.hero
	const description = props.data.description
	const media = props.data.media



	// reference: https://github.com/Khaledgarbaya/chocolate-free-website/blob/master/src/templates/article.js
	const mediaModulesMap = {
		ContentfulMediaImage: SingleImage,
		ContentfulMediaVideo: Video,
		ContentfulMediaSingleColumn: SingleColumn,
		ContentfulMediaDoubleColumn: DoubleColumn
	}

	const getMediaModule = ( module, index ) => {
		const MediaModule = mediaModulesMap[ module.internal.type ]

		if ( MediaModule ) {
		    return <MediaModule key={ module.id } data={ module } text={ props.text } />
		}

		return null
	}



	return (
		<article>
			<Hero data={ hero } />

			<Description title={ hero.headline } data={ description } text={ props.text } />

			{ media && media.map( ( module, i ) =>
				getMediaModule( module, i )
			)}
		</article>
	)
}



export default CaseStudy