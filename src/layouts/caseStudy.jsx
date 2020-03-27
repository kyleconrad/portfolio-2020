import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

import Hero from "../modules/hero"
import Description from "../modules/description"
import SingleImage from "../modules/singleImage"
import Video from "../modules/video"
import SingleColumn from "../modules/singleColumn"
import DoubleColumn from "../modules/doubleColumn"



const Bold = ({ children }) => <strong>{children}</strong>
const Italic = ({ children }) => <em>{children}</em>
const Underline = ({ children }) => <u>{children}</u>
const Text = ({ children }) => <p>{children}</p>

const textOptions = {
	renderMark: {
		[MARKS.BOLD]: text => <Bold>{ text }</Bold>,
		[MARKS.ITALIC]: text => <Italic>{ text }</Italic>,
		[MARKS.UNDERLINE]: text => <Underline>{ text }</Underline>,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: ( node, children ) => <Text>{ children }</Text>,
		[INLINES.HYPERLINK]: ( node ) => {
			return <a href={ node.data.uri } target="_blank" rel="noopener noreferrer">{ node.content[0].value }</a>;
		}
	},
	renderText: text => text.replace( /\s(?=[^\s]*$)/g, '\u00a0' ),
}



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
	    return <MediaModule key={ module.id } data={ module } text={ textOptions } />
	}

	return null
}



const CaseStudy = ( props ) => {
	const hero = props.data.hero
	const description = props.data.description
	const media = props.data.media



	return (
		<article>
			<Hero data={ hero } />
			<Description data={ description } text={ textOptions } />

			{ media && media.map( ( module, i ) =>
				getMediaModule( module, i )
			)}
		</article>
	)
}



export default CaseStudy