import React from "react"
import { Fragment } from "react"
import { graphql } from "gatsby"

import Navigation from "../layouts/navigation"
import Home from "../layouts/home"

import Seo from "../components/seo"



const Homepage = ( props ) => {
	const home = props.data.contentfulHome



	return (
        <Fragment>
        	<Seo
        		title={ props.data.contentfulHome.metadataTitle }
        		author={ props.data.site.siteMetadata.author }
        		description={ props.data.contentfulHome.metadataDescription }
        		url={ props.data.site.siteMetadata.siteUrl }
        		baseUrl={ props.data.site.siteMetadata.siteUrl }
    		/>

			<Navigation />
			
	        <Home data={ home } />
        </Fragment>
	)
}



export default Homepage



export const homeQuery = graphql`
	query homeQuery {
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
			about {
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
	}
`