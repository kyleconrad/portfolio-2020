import React from "react"
import { Fragment, Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import Logo from "../components/logo"
import Header from "../components/header"
import Spacer from "../components/spacer"
import Background from "../components/background"

import { toRomanNumeral } from "../js/functions"
import { doomGuy } from "../js/functions"



class Navigation extends Component {
	constructor( props ) {
		super( props );



		this.navigation = React.createRef();



		this.state = {
			navOpen: false
		}



		this.hideNav = this.hideNav.bind( this );
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

	hideNav() {
		this.setState({
			navOpen: false
		});
	}



	componentDidMount() {
		doomGuy();
	}



	render() {
		const home = this.props.home
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
						        		<div className="padding--top--50 padding--right--100 padding--bottom--100 padding--left--400 landscape-padding--left--300 mobile-padding--left--100">
											<Header text={ navigation.detail } />

											<ul className="nav__contents padding--top--400 landscape-padding--left--50 portrait-padding--left--25 mobile-padding--left--0">
												<li>
													<Link to="/" className="nav__contents__link margin--bottom--200" activeStyle={{ display: `none` }} onClick={ this.hideNav }>
														<span className="headline text--black">{ home.title }.</span>
													</Link>
												</li>

												{ navigation.links.map( ( caseStudy ) => {
													return (
														<li key={ caseStudy.slug }>
															<Link to={ `/` + caseStudy.slug + `/` } className="nav__contents__link margin--bottom--200" activeStyle={{ display: `none` }} partiallyActive={ true } onClick={ this.hideNav }>
																<div className="flex--row flex--start flex--align-center margin--bottom--25">
																	<span className="detail detail--small text--black">{ toRomanNumeral( caseStudy.hero.year ) }</span>
																	<span className="break width--200 margin--left--50 margin--right--50 bkg--black" />
																	<span className="detail detail--small text--black">{ caseStudy.hero.detail }</span>
																</div>
																<span className="headline text--black">{ caseStudy.hero.headline }</span>
															</Link>
														</li>
											        )
												})}
											</ul>

											<ul className="nav__social flex--row flex--between flex--align-center landscape-padding--left--50 portrait-padding--left--25 mobile-padding--left--0 mobile-flex--row mobile-flex--wrap">
												{ navigation.socialMedia.map( ( link ) => {
													return (
												        <li key={ link.name } className="mobile-width--50">
												        	<OutboundLink href={ link.url } target="_blank" rel="noopener noreferrer">{ link.name }</OutboundLink>
											        	</li>
											        )
												})}
											</ul>
						        		</div>
					        		</div>

					        		<Spacer height="500" bottom />
				        		</div>
			        		</div>
			        	</div>

			        	<Background container="navigation" open={ this.state.navOpen } colorStops="color-stop--nav" colorStopsScroll="color-stop--nav" />
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
     			contentfulHome( title: { eq: "Home" } ) {
     				title
     			}
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
 		render = { ({ contentfulHome, contentfulNavigation }) => <Navigation home={ contentfulHome } navigation={ contentfulNavigation } { ...props } /> }
	/>
)