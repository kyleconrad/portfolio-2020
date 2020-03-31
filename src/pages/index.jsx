import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"

import Home from "../layouts/home"

import Navigation from "../modules/navigation"




export default ({ data }) => {
	const navigation = data.contentfulNavigation
	const home = data.contentfulHome



	return (
        <Fragment>
        	<Seo
        		title={ data.contentfulHome.metadataTitle }
        		author={ data.site.siteMetadata.author }
        		description={ data.contentfulHome.metadataDescription }
        		url={ data.site.siteMetadata.siteURL }
    		/>

			<Navigation data={ navigation } />
			
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
		contentfulNavigation( title: { eq: "Navigation" } ) {
			detail
			links {
				slug
				hero {
					year
					detail
					headline
				}
			}
			socialMedia {
				name
				url
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
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
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
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
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
							fluid( resizingBehavior: SCALE, quality: 100 ) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						rightColumnImages {
							id
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