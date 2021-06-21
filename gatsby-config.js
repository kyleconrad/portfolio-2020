require( "dotenv" ).config({
	path: `.env.${process.env.NODE_ENV}`,
})



const siteAddress = new URL( "https://kyleconrad.com" )



module.exports = {
	siteMetadata: {
		author: `@kyle_conrad`,
		siteUrl: siteAddress.href,
	},
	plugins: [
		`gatsby-plugin-sharp`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
				downloadLocal: false,
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				trackingIds: [
					"UA-25023620-1",
				],
				gtagConfig: {
					anonymize_ip: true,
				},
				pluginConfig: {
					head: true,
					respectDNT: true,
				},
			},
		},
		`gatsby-plugin-zopfli`,
		{
			resolve: `gatsby-plugin-html-comments`,
			options: {
				files: [
					'./public/**/*.html',
					'./public/*.html',
				],
				comment: [
					{
						regexp: /<footer-comment>(.*?)<\/footer-comment>/g,
						comment: `<!-- All design, ideas, fantastical inventions, etc. etc. © 2021 Kyle Conrad -->`,
					},
					{
						regexp: /<contact-comment>(.*?)<\/contact-comment>/g,
						comment: `<!-- Contact: kyle@kyleconrad.com / @kyle_conrad -->`,
					},
				],
			},
		},
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: "kyleconrad",
				protocol: siteAddress.protocol.slice( 0, -1 ),
				hostname: siteAddress.hostname,
			},
		},
	],
}