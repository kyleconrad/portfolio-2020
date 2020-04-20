import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"

import Navigation from "../layouts/navigation"
import Home from "../layouts/home"

import Seo from "../components/seo"



export default ({ data }) => {
	const home = data.contentfulHome



	return (
        <Fragment>
        	<Seo
        		title={ data.contentfulHome.metadataTitle }
        		author={ data.site.siteMetadata.author }
        		description={ data.contentfulHome.metadataDescription }
        		url={ data.site.siteMetadata.siteUrl }
    		/>

			<Navigation />
			
	        <Home data={ home } />
        </Fragment>
	)
}



export const homeQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				author
				siteUrl
			}
		}
		contentfulHome( title: { eq: "Home" } ) {
			metadataTitle
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
			caseStudies {
				slug
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
							fluid(
								resizingBehavior: SCALE,
								quality: 75
							) {
								base64
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
								url
							}
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
			about {
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
	}
`