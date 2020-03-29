import React from "react"
import { Component } from "react"



class Logo extends Component {
	constructor() {
		super();



		this.logo = React.createRef();



		this.state = {
			posY: 0,
			stickY: 0
		}



		this.scrollStick = this.scrollStick.bind( this );
	}



	scrollStick( e ) {
		var	scrollPosY = window.scrollY,
			stickPosY = this.state.stickY;



		if ( scrollPosY >= stickPosY ) {
			this.logo.classList.add( 'logo--scrolled' );
		}
		else {
			this.logo.classList.remove( 'logo--scrolled' );
		}
	}



	componentDidMount() {
		this.setState({
			posY: this.logo.getBoundingClientRect().top,
			stickY: document.getElementsByTagName( 'header' )[ 0 ].getBoundingClientRect().top + getComputedStyle( document.getElementsByTagName( 'header' )[ 0 ] ).borderTopWidth.slice( 0, -2 )
		}, () => {
			window.addEventListener( 'scroll', this.scrollStick );
		});
	}

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.scrollStick );
	}



	render() {
		return (
			<button ref={ ( logo ) => { this.logo = logo } } className="logo color-stop color-stop--scroll overflow--hidden">
				<div className="logo__padding">
					<div className="logo__interior-border color-stop color-stop--scroll">
						<div className="logo__interior">
						</div>
					</div>
				</div>
			</button>
		)
	}
}



export default Logo