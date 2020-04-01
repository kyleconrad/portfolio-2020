import React from "react"
import { Fragment } from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

import CaseStudy from "../layouts/caseStudy"

import Hero from "../modules/hero"
import About from "../modules/about"

import Spacer from "../components/spacer"
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
		[BLOCKS.PARAGRAPH]: ( node, children ) => <Text>{ children }</Text>,
		[INLINES.HYPERLINK]: ( node ) => {
			return <a href={ node.data.uri } target="_blank" rel="noopener noreferrer" className="color-stop text--gradient">{ node.content[0].value }</a>;
		}
	},
	renderText: text => text.replace( /\s(?=[^\s]*$)/g, '\u00a0' ),
}



const Home = ( props ) => {
	const hero = props.data.hero
	const caseStudies = props.data.caseStudies
	const about = props.data.about



	return (
        <main className="bkg--gradient">
        	<section className="main__container">
				<div className="border border--wide border--black overflow--hidden z--2">
					<div className="border border--1 border--transparent overflow--hidden">
						<div className="border border--3 border--black overflow--hidden">
							<Hero data={ hero } />

							<Spacer height="100" invert />

							{ caseStudies.map( ( caseStudy ) => {
								return (
							        <Fragment key={ caseStudy.slug }>
								        <CaseStudy data={ caseStudy } />

								        <Spacer height="100" invert />
							        </Fragment>
						        )
							})}

							<About data={ about } text={ textOptions } />
						</div>
					</div>
				</div>

				<Background container="main" colorStops="color-stop" colorStopsScroll="color-stop--scroll" />
			</section>
		</main>
	)
}



export default Home