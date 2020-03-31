import React from "react"
import { Fragment, Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

import Logo from "../components/logo"
import Header from "../components/header"
import Spacer from "../components/spacer"
import Background from "../components/background"

import { toRomanNumeral } from "../js/functions"



class Navigation extends Component {
	constructor( props ) {
		super( props );



		this.navigation = React.createRef();



		this.state = {
			navOpen: false
		}
	}



	toggleNav() {
		var navigation = this.navigation,
			duration = Number( ( window.getComputedStyle( navigation ).transitionDuration.split( 's' )[ 0 ] ) * 1000 );


		this.state.navOpen ?
			this.setState({
				navOpen: false
			}, () => {
				setTimeout( function() {
					navigation.scrollTop = 0;
				}, ( duration + 10 ) );
			}) : this.setState({ navOpen: true });
	}



	render() {
		const navigation = this.props.navigation



		return (
		    <Fragment>
		    	<Helmet>
		        	<body className={ `${ this.state.navOpen ? 'nav--open' : '' }` } />
		        </Helmet>

		    	<Logo toggleNav={ this.toggleNav.bind( this ) } />
		    	
		        <nav ref={ ( navigation ) => { this.navigation = navigation } } className="nav">
		        	<div className="nav__container bkg--gradient">
			        	<div className="border border--wide border--transparent overflow--hidden z--2">
			        		<div className="border border--1 border--black overflow--hidden">
			        			<div className="border border--3 border--transparent overflow--hidden">
			        				<div className="border border--1 border--black overflow--hidden">
						        		<div className="padding--top--50 padding--right--100 padding--bottom--100 padding--left--400">
											<Header text={ navigation.detail } />

											<ul className="nav__contents padding--top--400">
												{ navigation.links.map( ( caseStudy ) => {
													return (
														<li key={ caseStudy.slug } className="padding--bottom--200">
															<div className="flex--row flex--start flex--align-center margin--bottom--25">
																<span className="detail detail--small text--black">{ toRomanNumeral( caseStudy.hero.year ) }</span>
																<span className="break width--200 margin--left--50 margin--right--50 bkg--black" />
																<span className="detail detail--small text--black">{ caseStudy.hero.detail }</span>
															</div>
															<span className="headline text--black">{ caseStudy.hero.headline }</span>
														</li>
											        )
												})}
											</ul>

											<ul className="nav__social flex--row flex--between flex--align-center">
												{ navigation.socialMedia.map( ( link ) => {
													return (
												        <li key={ link.name } ><a href={ link.url } target="_blank" rel="noopener noreferrer">{ link.name }</a></li>
											        )
												})}
											</ul>
						        		</div>
					        		</div>

					        		<Spacer height="500" bottom />
				        		</div>
			        		</div>
			        	</div>

			        	<Background container="navigation" open={ this.state.navOpen } />
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