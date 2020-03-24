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
		{
			resolve: `gatsby-plugin-web-font-loader`,
			options: {
				custom: {
					familes: [ 'BluuNext' ],
					urls: [ '/fonts/fonts.css' ],
				},
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-helmet`
	],
}