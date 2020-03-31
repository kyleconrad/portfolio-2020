import React from "react"
import { Fragment, Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Logo from "../components/logo"



class Navigation extends Component {
	constructor( props ) {
		super( props );



		this.state = {
			navOpen: false
		}
	}



	toggleNav() {
		this.state.navOpen ? this.setState({ navOpen: false }) : this.setState({ navOpen: true });
	}



	render() {
		const navigation = this.props.navigation

		console.log( navigation )



		return (
		    <Fragment>
		    	<Helmet>
		        	<body className={ `${ this.state.navOpen ? 'nav--open' : '' }` } />
		        </Helmet>

		    	<Logo toggleNav={ this.toggleNav.bind( this ) } />
		    	
		        <nav className="nav">
		        	<div class="nav__container">
		        	</div>
		        </nav>
	        </Fragment>
		)
	}
}



export default props => (
     <StaticQuery
     	query = { graphql`
     		query {
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
			}
 		`}
 		render = { ({ contentfulNavigation }) => <Navigation navigation={ contentfulNavigation } { ...props } /> }
	/>
)