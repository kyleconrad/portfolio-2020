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
					familes: [ "futura-pt", "ten-oldstyle", "BluuNext" ],
					urls: [ "/fonts/fonts.css" ],
				},
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-zopfli`,
		},
		{
			resolve: `gatsby-plugin-html-comments`,
			options: {
				files: [ './public/**/*.html', './public/*.html' ],
				comment: [
					{
						regexp: /<head-comment>(.*?)<\/head-comment>/g,
						comment: `<!-- All design, ideas, fantastical inventions, etc. etc. © 2020 Kyle Conrad -->`,
					},
					{
						regexp: /<contact-comment>(.*?)<\/contact-comment>/g,
						comment: `<!-- Contact: kyle@kyleconrad.com / @kyle_conrad -->`,
					},
				]
			}
		}
	],
}