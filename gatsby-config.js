require( "dotenv" ).config({
	path: `.env.${process.env.NODE_ENV}`,
})



module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-helmet`
	],
}