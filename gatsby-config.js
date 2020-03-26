require( "dotenv" ).config({
	path: `.env.${process.env.NODE_ENV}`,
})



module.exports = {
	siteMetadata: {
		author: `@kyle_conrad`,
		siteURL: `https://kyleconrad.com`,
	},
	plugins: [
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
			},
		},
		{
			resolve: `gatsby-plugin-web-font-loader`,
			options: {
				custom: {
					familes: [ 'futura-pt', 'ten-oldstyle', 'BluuNext' ],
					urls: [ '/fonts/fonts.css' ],
				},
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-helmet`,
	],
}



// reference static images: https://github.com/gatsbyjs/gatsby/issues/11013