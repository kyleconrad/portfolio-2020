import React from "react"
import { Fragment, Component } from "react"
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
		return (
		    <Fragment>
		    	<Helmet>
		        	<body className={ `${ this.state.navOpen ? 'nav--open' : '' }` } />
		        </Helmet>

		    	<Logo toggleNav={ this.toggleNav.bind( this ) } />
		    	
		        <nav className="nav" />
	        </Fragment>
		)
	}
}



export default Navigation