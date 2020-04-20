import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"

import Navigation from "../layouts/navigation"
import CaseStudy from "../layouts/caseStudy"

import Seo from "../components/seo"
import Background from "../components/background"



export default ({ data }) => {
	const caseStudy = data.contentfulCaseStudy



	return (
        <Fragment>
        	<Seo
        		title={ data.contentfulCaseStudy.hero.headline + ` — ` + data.contentfulHome.metadataTitle }
        		author={ data.site.siteMetadata.author }
        		description={ data.contentfulCaseStudy.metadataDescription }
        		url={ data.site.siteMetadata.siteUrl + `/` + data.contentfulCaseStudy.slug + `/` }
    		/>

    		<Navigation />

	        <main className="bkg--gradient">
	        	<section className="main__container">
					<div className="border border--wide border--black overflow--hidden z--2">
						<div className="border border--1 border--transparent overflow--hidden">
							<div className="border border--3 border--black overflow--hidden">
								<CaseStudy data={ caseStudy } />
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
									traceSVG: {
										background: "#161616",
										color: "#272727"
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
										background: "#161616",
										color: "#272727"
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
										background: "#161616",
										color: "#272727"
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
										background: "#161616",
										color: "#272727"
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
	}
`