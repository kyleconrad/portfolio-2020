const path = require( `path` )



exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions



	if ( node.internal.type === `CaseStudy` ) {
		const slug = createFilePath({ node, getNode, basePath: `/` })



		createNodeField({
			node,
			name: `slug`,
			value: slug,
		})
	}
}



exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions



	const result = await graphql(`
        query {
         	allContentfulCaseStudy {
         		edges {
         			node {
     					slug
         			}
         		}
         	}
        }
    `)



	result.data.allContentfulCaseStudy.edges.forEach(({ node }) => {
		createPage({
			path: node.slug,
			component: path.resolve( `./src/templates/caseStudy.jsx` ),
			context: {
				slug: node.slug,
			}
		})
	})
}