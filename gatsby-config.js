require( "dotenv" ).config({
	path: `.env.${process.env.NODE_ENV}`,
})



module.exports = {
	siteMetadata: {
		author: `@kyle_conrad`,
		siteUrl: `https://kyleconrad.com`,
	},
	plugins: [
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
				downloadLocal: true,
			},
		},
		`gatsby-transformer-remote-filesystem`,
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
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-sharp`,
			options: {
				checkSupportedExtensions: false,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-zopfli`,
		{
			resolve: `gatsby-plugin-html-comments`,
			options: {
				files: [ './public/**/*.html', './public/*.html' ],
				comment: [
					{
						regexp: /<footer-comment>(.*?)<\/footer-comment>/g,
						comment: `<!-- All design, ideas, fantastical inventions, etc. etc. © 2020 Kyle Conrad -->`,
					},
					{
						regexp: /<contact-comment>(.*?)<\/contact-comment>/g,
						comment: `<!-- Contact: kyle@kyleconrad.com / @kyle_conrad -->`,
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-25023620-1",
				head: true,
				respectDNT: true,
			},
		},
		`gatsby-plugin-sitemap`,
	],
}