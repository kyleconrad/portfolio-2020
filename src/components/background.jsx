import React from "react"
import { Component } from "react"

import { rgbToHex } from "../js/functions"
import { hexToRgb } from "../js/functions"
import { findColor } from "../js/functions"
import { debounce } from "../js/functions"



class Background extends Component {
	constructor( props ) {
		super( props );


		this.background = React.createRef();



		this.state = {
			primaryColor: null,
			secondaryColor: null,
			height: 0
		}



		this.color = false;



		this.createGradient = this.createGradient.bind( this );
		this.colorStops = this.colorStops.bind( this );

		this.iconScroll = this.iconScroll.bind( this );
	}



	createGradient( complete, className ) {
		var primaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorPrimary' ),
			secondaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorSecondary' );

		var height = this.background.getBoundingClientRect().height;



		this.setState({
			primaryColor: primaryColor.split('#')[1],
			secondaryColor: secondaryColor.split('#')[1],
			height: height
		}, () => {
			if ( complete && className ) {
				complete( className, false );
			}
		});
	}



	colorStops( className, scroll, scrollElement ) {
		const elements = document.querySelectorAll( '.' + className );

		var primaryColor = hexToRgb( this.state.primaryColor ),
			secondaryColor = hexToRgb( this.state.secondaryColor );

		var height = this.state.height;



		[ ...elements ].forEach( function( element ) {
			var elementTop = element.getBoundingClientRect().top,
				elementBottom = elementTop + element.getBoundingClientRect().height;



			if ( scroll && scrollElement ) {
				elementTop = element.getBoundingClientRect().top + scrollElement.scrollTop;
				elementBottom = elementTop + element.getBoundingClientRect().height;
			}



			var percentTop = elementTop / height,
				percentBottom = elementBottom / height;

			var rgbTop = findColor( primaryColor, secondaryColor, percentTop ),
				rgbBottom = findColor( primaryColor, secondaryColor, percentBottom );

			var colorTop = rgbToHex( rgbTop[ 0 ], rgbTop[ 1 ], rgbTop[ 2 ] ),
				colorBottom = rgbToHex( rgbBottom[ 0 ], rgbBottom[ 1 ], rgbBottom[ 2 ] );



			element.style.setProperty( '--colorTop', '#' + colorTop );
			element.style.setProperty( '--colorBottom', '#' + colorBottom );
		});
	}



	iconScroll( scrollElement ) {
		var scroll = scrollElement.scrollTop;

		var percent = scroll / this.state.height;

		var rgbColor = findColor( hexToRgb( this.state.primaryColor ), hexToRgb( this.state.secondaryColor ), percent ),
			color = rgbToHex( rgbColor[ 0 ], rgbColor[ 1 ], rgbColor[ 2 ] );



		var favicon = document.getElementById( 'favicon' ),
			icon = document.createElement( 'img' ),
			size = 32;

		var canvas = document.createElement( 'canvas' ),
			context = canvas.getContext( '2d' );



		icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAMFBMVEVHcEwXFxcXFxcWFhYWFhYZGRkWFhYWFhYWFhYhISEYGBgWFhYXFxcWFhYWFhYWFhZ47OadAAAAEHRSTlMAQW/T4BthsJYKMYVSwaHziTcpDwAAAQdJREFUeNrNktGKxDAIRW+iRo0x+f+/3XSGUsp25nHZ8yCRAxHx4u8pFd8hlq++abVv3lmcOj4TAQz97IUdQBZ8YlZsOj3by8z2ZM+//T3picGRi3nxpHj2WQUbH3OF/5qfywBIKX27tqjdfePB0m2tzLW0gIaq4yJSLCYpCSCamS0Ruzmp6n1xgMXDxFkGr4FB1wkcugokYVZ3GRBih+CibI+uyCKMaICs+6pk1OGMwlyRHZJ2C0abWzVYHNNGou+m2i0GgOQU1TGMpHEHcAXj3Ci4DbNWUo/WNa8YNG6vx2RVfuehUOQAzvOKpuCgd38NDeo4z99XbGjXC1q2K1cclPaRgX/BDzm/Cero/XepAAAAAElFTkSuQmCC';

		canvas.width = size;
		canvas.height = size;



		if ( this.color !== color ) {
			this.color = color;



			icon.onload = () => {
				context.fillStyle = '#' + this.color;
				context.fillRect( 0, 0, canvas.width, canvas.height );
				context.fill();



				context.drawImage( icon, 0, 0, canvas.width, canvas.height );



				favicon.href = canvas.toDataURL( 'image/png' );
			}
		}
	}



	onResize = debounce( ( e ) => {
		const 	$main = document.getElementsByTagName( 'main' )[ 0 ],
				$nav = document.getElementsByTagName( 'nav' )[ 0 ];

		var height = this.background.getBoundingClientRect().height;



		this.setState({
			height: height
		}, () => {
			if ( this.props.open ) {
				$nav.dispatchEvent( new CustomEvent( 'scroll' ) );
			}
			else if ( this.props.open !== undefined && !this.props.open ) {
				$main.dispatchEvent( new CustomEvent( 'scroll' ) );
			}
		});
	}, 350 );



	componentDidMount() {
		const $main = document.getElementsByTagName( 'main' )[ 0 ];



		if ( this.props.open === undefined ) {
			this.createGradient( this.colorStops, this.props.colorStops );



			$main.addEventListener( 'scroll', this.colorStops.bind( null, this.props.colorStopsScroll, true, $main ) );

			$main.addEventListener( 'scroll', this.iconScroll.bind( null, $main ) );
		}
		else {
			this.createGradient();
		}



		window.addEventListener( 'resize', this.onResize.bind( this ) );
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		const 	$main = document.getElementsByTagName( 'main' )[ 0 ],
				$nav = document.getElementsByTagName( 'nav' )[ 0 ];



		if ( this.props.open !== undefined ) {
			if ( this.props.open ) {
				this.colorStops( this.props.colorStops, true, $nav );



				$nav.addEventListener( 'scroll', this.colorStops.bind( null, this.props.colorStopsScroll, true, $nav ) );
			}
			else {
				$nav.removeEventListener( 'scroll', this.colorStops.bind( null, this.props.colorStopsScroll, true, $nav ) );



				$main.dispatchEvent( new CustomEvent( 'scroll' ) );
			}
		}
	}

	componentWillUnmount() {
		const $main = document.getElementsByTagName( 'main' )[ 0 ];



		if ( this.props.open === undefined ) {
			$main.removeEventListener( 'scroll', this.colorStops.bind( null, this.props.colorStopsScroll, true, $main ) );

			$main.removeEventListener( 'scroll', this.iconScroll.bind( null, $main ) );
		}



		window.removeEventListener( 'resize', this.onResize.bind( this ) );
	}



	render() {
		return (
			<div ref={ ( background ) => { this.background = background } } id={ `bkg--` + this.props.container } className="background bkg--gradient z--1" />
		)
	}
}



export default Background