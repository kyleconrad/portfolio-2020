import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

import Navigation from "../layouts/navigation"
import CaseStudy from "../layouts/caseStudy"

import About from "../modules/about"

import Seo from "../components/seo"
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

const detailOptions = {
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
	}
}



const CasestudyTemplate = ( props ) => {
	const caseStudy = props.data.contentfulCaseStudy
	const about = props.data.contentfulContentAbout



	return (
        <Fragment>
        	<Seo
        		title={ props.data.contentfulCaseStudy.hero.headline + ` — ` + props.data.contentfulHome.metadataTitle }
        		author={ props.data.site.siteMetadata.author }
        		description={ props.data.contentfulCaseStudy.metadataDescription }
        		url={ props.data.site.siteMetadata.siteUrl + `/` + props.data.contentfulCaseStudy.slug + `/` }
        		baseUrl={ props.data.site.siteMetadata.siteUrl }
    		/>

    		<Navigation />

	        <main>
	        	<section className="main__container">
					<div className="border border--wide border--black overflow--hidden z--2">
						<div className="border border--1 border--transparent overflow--hidden">
							<div className="border border--3 border--black overflow--hidden">
								<CaseStudy data={ caseStudy } text={ textOptions } detail={ detailOptions } />

								<About data={ about } text={ textOptions } />
							</div>
						</div>
					</div>

					<Background container="main" colorStops="color-stop" colorStopsScroll="color-stop--scroll" />
				</section>
			</main>
		</Fragment>
	)
}



export default CasestudyTemplate



export const caseStudyQuery = graphql`
	query( $slug: String! ) {
		site {
			siteMetadata {
				author
				siteUrl
			}
		}
		contentfulHome( title: { eq: "Home" } ) {
			metadataTitle
		}
		contentfulCaseStudy( slug: { eq: $slug } ) {
			slug
			metadataDescription
			hero {
				headline
				subhead
				detail
				year
				location {
					lon
					lat
				}
			}
			description {
				url
				detail {
					raw
				}
				description {
					raw
				}
			}
			media {
				... on ContentfulMediaImage {
					id
					internal {
						type
					}
					padded
					image {
						file {
							contentType
							url
							details {
								image {
									width
									height
								}
							}
						}
						description
						source: gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: DOMINANT_COLOR
							quality: 100,
							formats: [AUTO, WEBP]
							resizingBehavior: SCALE
						)
					}
				}
				... on ContentfulMediaVideo {
					id
					title
					internal {
						type
					}
					videoWebM {
						file {
							url
						}
					}
					videoOgg {
						file {
							url
						}
					}
					videoMp4 {
						file {
							url
						}
					}
					videoPoster {
						file {
							url
						}
					}
					audio
				}
				... on ContentfulMediaSingleColumn {
					id
					internal {
						type
					}
					alignment
					caption {
						raw
					}
					images {
						file {
							contentType
							url
							details {
								image {
									width
									height
								}
							}
						}
						description
						source: gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: DOMINANT_COLOR
							quality: 100,
							formats: [AUTO, WEBP]
							resizingBehavior: SCALE
						)
					}
				}
				... on ContentfulMediaDoubleColumn {
					id
					internal {
						type
					}
					alignment
					caption {
						raw
					}
					leftColumnImages {
						file {
							contentType
							url
							details {
								image {
									width
									height
								}
							}
						}
						description
						source: gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: DOMINANT_COLOR
							quality: 100,
							formats: [AUTO, WEBP]
							resizingBehavior: SCALE
						)
					}
					rightColumnImages {
						file {
							contentType
							url
							details {
								image {
									width
									height
								}
							}
						}
						description
						source: gatsbyImageData(
							layout: FULL_WIDTH
							placeholder: DOMINANT_COLOR
							quality: 100,
							formats: [AUTO, WEBP]
							resizingBehavior: SCALE
						)
					}
				}
			}
		}
		contentfulContentAbout( title: {eq: "About" } ) {
			headline
			location {
				lat
				lon
			}
			detail
			description {
				raw
			}
			additional {
				raw
			}
			socialMedia {
				name
				url
			}
		}
	}
`