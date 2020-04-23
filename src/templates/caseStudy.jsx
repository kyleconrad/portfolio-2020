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



export default ({ data }) => {
	const caseStudy = data.contentfulCaseStudy
	const about = data.contentfulContentAbout



	return (
        <Fragment>
        	<Seo
        		title={ data.contentfulCaseStudy.hero.headline + ` — ` + data.contentfulHome.metadataTitle }
        		author={ data.site.siteMetadata.author }
        		description={ data.contentfulCaseStudy.metadataDescription }
        		url={ data.site.siteMetadata.siteUrl + `/` + data.contentfulCaseStudy.slug + `/` }
        		baseUrl={ data.site.siteMetadata.siteUrl }
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
					json
				}
				description {
					json
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
						}
						fluid(
							resizingBehavior: SCALE,
							quality: 100
						) {
							...GatsbyContentfulFluid
						}
						localFile {
							childImageSharp {
								fluid(
									quality: 100,
									traceSVG: {#161616
										background: "#272727",
										color: "#161616"
									}
								) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
					}
				}
				... on ContentfulMediaVideo {
					id
					internal {
						type
					}
					videoWebM {
						localFile {
							localURL
						}
					}
					videoOgg {
						localFile {
							localURL
						}
					}
					videoMp4 {
						localFile {
							localURL
						}
					}
					videoPoster {
						localFile {
							childImageSharp {
								fluid(
									quality: 100,
									traceSVG: {
										background: "#272727",
										color: "#161616"
									}
								) {
									tracedSVG
								}
							}
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
						json
					}
					images {
						id
						file {
							contentType
						}
						fluid(
							resizingBehavior: SCALE,
							quality: 100
						) {
							...GatsbyContentfulFluid
						}
						localFile {
							childImageSharp {
								fluid(
									quality: 100,
									traceSVG: {
										background: "#272727",
										color: "#161616"
									}
								) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
					}
				}
				... on ContentfulMediaDoubleColumn {
					id
					internal {
						type
					}
					alignment
					caption {
						json
					}
					leftColumnImages {
						id
						file {
							contentType
						}
						fluid(
							resizingBehavior: SCALE,
							quality: 100
						) {
							...GatsbyContentfulFluid
						}
						localFile {
							childImageSharp {
								fluid(
									quality: 100,
									traceSVG: {
										background: "#272727",
										color: "#161616"
									}
								) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
					}
					rightColumnImages {
						id
						file {
							contentType
						}
						fluid(
							resizingBehavior: SCALE,
							quality: 100
						) {
							...GatsbyContentfulFluid
						}
						localFile {
							childImageSharp {
								fluid(
									quality: 100,
									traceSVG: {
										background: "#272727",
										color: "#161616"
									}
								) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
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
				json
			}
			additional {
				json
			}
			socialMedia {
				name
				url
			}
		}
	}
`