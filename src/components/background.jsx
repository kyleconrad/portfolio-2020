import React from "react"
import { Component } from "react"

import { rgbToHex } from "../js/functions"
import { debounce } from "../js/functions"



class Background extends Component {
	_isMounted = false;



	constructor( props ) {
		super( props );


		this.background = React.createRef();



		this.state = {
			height: 0,
			canvasData: null
		}



		this.createGradient = this.createGradient.bind( this );
		this.colorStops = this.colorStops.bind( this );

		this.iconScroll = this.iconScroll.bind( this );

		this.mainListener = this.mainListener.bind( this );
		this.navListener = this.navListener.bind( this );
		this.iconListener = this.iconListener.bind( this );



		this.onResize = debounce( this.resizeDebounce.bind( this ), 350 );
	}



	createGradient( complete, className ) {
		var primaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorPrimary' ),
			secondaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorSecondary' );

		var height = this.background.getBoundingClientRect().height;



		var canvas = document.createElement( 'canvas' );

		canvas.width = 1;
		canvas.height = 1000;

		var context = canvas.getContext( '2d' );

		var grad = context.createLinearGradient( 0, 0, 0, canvas.height );

		grad.addColorStop( 0, primaryColor );
		grad.addColorStop( 1, secondaryColor );

		context.fillStyle = grad;

		context.fillRect( 0, 0, canvas.width, canvas.height );

		var canvasData = context.getImageData( 0, 0, canvas.width, canvas.height );



		this.setState({
			height: height,
			canvasData: canvasData
		}, () => {
			canvas.remove();



			if ( complete && className ) {
				complete( className, false );
			}
		});
	}



	colorStops( className, scroll, scrollElement ) {
		const elements = document.querySelectorAll( '.' + className );

		var canvasData = this.state.canvasData,
			height = this.state.height;



		[ ...elements ].forEach( function( element ) {
			var colorTopVar = false,
				colorBottomVar = false;

			var elementTop = element.getBoundingClientRect().top,
				elementBottom = elementTop + element.getBoundingClientRect().height;



			if ( scroll && scrollElement ) {
				elementTop = element.getBoundingClientRect().top + scrollElement.scrollTop;
				elementBottom = elementTop + element.getBoundingClientRect().height;
			}



			var pixelTop = ( elementTop / height ) * canvasData.height,
				pixelBottom = ( elementBottom / height ) * canvasData.height;

			var indexTop = ( Math.floor( pixelTop ) * canvasData.width ) * 4,
				indexBottom = ( Math.floor( pixelBottom ) * canvasData.width ) * 4;



			var colorTop = rgbToHex( canvasData.data[ indexTop ], canvasData.data[ indexTop + 1 ], canvasData.data[ indexTop + 2 ] ),
				colorBottom = rgbToHex( canvasData.data[ indexBottom ], canvasData.data[ indexBottom + 1 ], canvasData.data[ indexBottom + 2 ] );




			if ( colorTopVar !== colorTop ) {
				colorTopVar = colorTop;



				element.style.setProperty( '--colorTop', '#' + colorTopVar );
			}

			if ( colorBottomVar !== colorBottom ) {
				colorBottomVar = colorBottom;



				element.style.setProperty( '--colorBottom', '#' + colorBottomVar );
			}
		});
	}



	iconScroll( scrollElement ) {
		var canvasData = this.state.canvasData;

		var scroll = scrollElement.scrollTop;

		var percent = ( scroll / this.state.height ) * canvasData.height;

		var index = ( Math.floor( percent ) * canvasData.width ) * 4,
			colorVar = false,
			color = rgbToHex( canvasData.data[ index ], canvasData.data[ index + 1 ], canvasData.data[ index + 2 ] );



		var favicon = document.getElementById( 'favicon' ),
			icon = document.createElement( 'img' ),
			size = 32;

		var canvas = document.createElement( 'canvas' ),
			context = canvas.getContext( '2d' );



		icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAMFBMVEVHcEwXFxcXFxcWFhYWFhYZGRkWFhYWFhYWFhYhISEYGBgWFhYXFxcWFhYWFhYWFhZ47OadAAAAEHRSTlMAQW/T4BthsJYKMYVSwaHziTcpDwAAAQdJREFUeNrNktGKxDAIRW+iRo0x+f+/3XSGUsp25nHZ8yCRAxHx4u8pFd8hlq++abVv3lmcOj4TAQz97IUdQBZ8YlZsOj3by8z2ZM+//T3picGRi3nxpHj2WQUbH3OF/5qfywBIKX27tqjdfePB0m2tzLW0gIaq4yJSLCYpCSCamS0Ruzmp6n1xgMXDxFkGr4FB1wkcugokYVZ3GRBih+CibI+uyCKMaICs+6pk1OGMwlyRHZJ2C0abWzVYHNNGou+m2i0GgOQU1TGMpHEHcAXj3Ci4DbNWUo/WNa8YNG6vx2RVfuehUOQAzvOKpuCgd38NDeo4z99XbGjXC1q2K1cclPaRgX/BDzm/Cero/XepAAAAAElFTkSuQmCC';

		canvas.width = size;
		canvas.height = size;



		if ( colorVar !== color ) {
			colorVar = color;



			icon.onload = () => {
				context.fillStyle = '#' + colorVar;
				context.fillRect( 0, 0, canvas.width, canvas.height );
				context.fill();



				context.drawImage( icon, 0, 0, canvas.width, canvas.height );



				favicon.href = canvas.toDataURL( 'image/png' );
			}
		}
	}


	mainListener() {
		const $main = document.querySelector( 'main' );



		this.colorStops( this.props.colorStopsScroll, true, $main );
	}

	navListener() {
		const $nav = document.querySelector( 'nav' );



		this.colorStops( this.props.colorStopsScroll, true, $nav );
	}

	iconListener() {
		const $main = document.querySelector( 'main' );



		this.iconScroll( $main );
	}



	resizeDebounce = () => {
		const 	$main = document.querySelector( 'main' ),
				$nav = document.querySelector( 'nav' );

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
	}



	componentDidMount() {
		this._isMounted = true;



		const $main = document.querySelector( 'main' );



		if ( this.props.open === undefined ) {
			this.createGradient( this.colorStops, this.props.colorStops );



			$main.addEventListener( 'scroll', this.mainListener );

			$main.addEventListener( 'scroll', this.iconListener );
		}
		else {
			this.createGradient();
		}



		window.addEventListener( 'resize', this.onResize );
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		const 	$main = document.querySelector( 'main' ),
				$nav = document.querySelector( 'nav' );

		

		if ( this._isMounted ) {
			var background = this.background;



			setTimeout( () => {
				var height = background.getBoundingClientRect().height;



				if ( height !== prevState.height ) {
					this.setState({
						height: height
					});
				}
			}, 75 );
		}
		



		if ( this.props.open !== undefined ) {
			$nav.removeEventListener( 'scroll', this.navListener );



			if ( this.props.open ) {
				this.colorStops( this.props.colorStops, true, $nav );



				$nav.addEventListener( 'scroll', this.navListener );
			}
			else {
				$main.dispatchEvent( new CustomEvent( 'scroll' ) );
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;



		const $main = document.querySelector( 'main' );



		if ( this.props.open === undefined ) {
			$main.removeEventListener( 'scroll', this.mainListener );

			$main.removeEventListener( 'scroll', this.iconListener );
		}



		window.removeEventListener( 'resize', this.onResize );
	}



	render() {
		return (
			<div ref={ ( background ) => { this.background = background } } id={ `bkg--` + this.props.container } className="background bkg--gradient z--1" />
		)
	}
}



export default Background