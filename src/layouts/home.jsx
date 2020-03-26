import React from "react"
import { Fragment } from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

import CaseStudy from "../layouts/caseStudy"

import Hero from "../modules/hero"
import About from "../modules/about"

import Background from "../components/background"



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
		[BLOCKS.PARAGRAPH]: (node, children) => <Text>{ children }</Text>,
		[INLINES.HYPERLINK]: (node) => {
			return <a href={ node.data.uri } target="_blank" rel="noopener noreferrer">{ node.content[0].value }</a>;
		}
	},
}



const Home = ( props ) => {
	const hero = props.data.hero
	const caseStudies = props.data.caseStudies
	const about = props.data.about



	return (
        <Fragment>
			<section className="z--2">
				<Hero data={ hero } />

				{ caseStudies.map( ( caseStudy ) => {
					return (
				        <CaseStudy data={ caseStudy } />
			        )
				})}

				<About data={ about } text={ textOptions } />
			</section>

			<Background />
		</Fragment>
	)
}



export default Home