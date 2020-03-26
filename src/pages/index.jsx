import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Home from "../layouts/home"




export default ({ data }) => {
	const home = data.contentfulHome



	return (
        <Fragment>
        	<Helmet>
	        	<title>{ data.contentfulHome.metadataTitle }</title>
	        	<meta name="description" content={ data.contentfulHome.metadataDescription } />

	        	<link rel="canonical" href={ data.site.siteMetadata.siteURL } />
	        	<meta name="url" content={ data.site.siteMetadata.siteURL } />
			    <meta name="identifier-URL" content={ data.site.siteMetadata.siteURL } />
			</Helmet>

	        <Home data={ home } />
        </Fragment>
	)
}



export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				author
				siteURL
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
					detail {
						json
					}
					description {
						json
					}
				}
				media {
					... on ContentfulMediaImage {
						internal {
							type
						}
						padded
						image {
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
							}
						}
					}
					... on ContentfulMediaVideo {
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
					}
					... on ContentfulMediaSingleColumn {
						internal {
							type
						}
						alignment
						caption {
							json
						}
						images {
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
							}
						}
					}
					... on ContentfulMediaDoubleColumn {
						internal {
							type
						}
						alignment
						caption {
							json
						}
						leftColumnImages {
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						rightColumnImages {
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
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