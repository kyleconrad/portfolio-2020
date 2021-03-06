import React from "react"
import { Component } from "react"



class Logo extends Component {
	constructor( props ) {
		super( props );



		this.logo = React.createRef();



		this.state = {
			posY: 0
		}
	}



	componentDidMount() {
		this.setState({
			posY: this.logo.getBoundingClientRect().top
		});
	}



	render() {
		return (
			<button ref={ ( logo ) => { this.logo = logo } } className="logo color-stop color-stop--scroll color-stop--nav overflow--hidden" onClick={ this.props.toggleNav }>
				<div className="logo__padding">
					<div className="logo__border color-stop color-stop--scroll color-stop--nav z--3">
						<div className="logo__interior flex--row flex--center flex--align-center">
							<svg className="logo__logo color-stop color-stop--scroll z--2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 102 90" xmlSpace="preserve">
								<defs>
									<linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
										<stop offset="0%" className="logo__logo__color-top" />
										<stop offset="100%" className="logo__logo__color-bottom" />
									</linearGradient>
								</defs>

								<g stroke="url( #logoGradient )">
									<path d="M87,63.5c0,0-14-20-36.1-20s-36.1,20-36.1,20"/>
									<path d="M84.9,60c0,0-9.9,8-17.4,13.7c-6.2,4.7-12.5,6.1-16.6,6.1h0.3c-4.2,0-10.4-1.4-16.6-6.1 C26.9,68,17.1,60.6,17.1,60.6"/>
									<circle cx="50.8" cy="58.5" r="5.5"/>
									<circle cx="50.8" cy="58.5" r="15"/>
									<path d="M95.6,54.2c0,0-17.2-21.1-44.4-21.1S6.8,54.2,6.8,54.2"/>
									<path d="M27.9,87.6C19.5,81.9,8.3,74.7,8.3,74.7"/>
									<path d="M93.4,74.7c0,0-10.9,7.2-19.3,12.9"/>
									<polygon points="0.9,87.6 50.9,1 100.9,87.6 	"/>
								</g>
							</svg>

							<span className="logo__icon color-stop color-stop--scroll z--1" />
						</div>
					</div>
				</div>
			</button>
		)
	}
}



export default Logo