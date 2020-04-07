import React from "react"
import { Component } from "react"

import { rgbToHex } from "../js/functions"
import { debounce } from "../js/functions"



class Background extends Component {
	constructor( props ) {
		super( props );


		this.background = React.createRef();



		this.state = {
			canvasData: false,
			width: 0,
			height: 0
		}



		this.color = false;



		this.createGradient = this.createGradient.bind( this );
		this.colorStops = this.colorStops.bind( this );

		this.iconScroll = this.iconScroll.bind( this );
	}



	createGradient( clear, complete, className ) {
		var canvas = this.background;

		var parent = canvas.parentElement,
			parentWidth = parent.getBoundingClientRect().width,
			parentHeight = parent.getBoundingClientRect().height;

		var primaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorPrimary' ),
			secondaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--colorSecondary' );



		canvas.width = parentWidth;
		canvas.height = parentHeight;



		var context = canvas.getContext( '2d' );



		if ( clear ) {
			context.clearRect( 0, 0, canvas.width, canvas.height );
		}



		var grad = context.createLinearGradient( 0, 0, 0, canvas.height );

		grad.addColorStop( 0, primaryColor );
		grad.addColorStop( 1, secondaryColor );

		context.fillStyle = grad;

		context.fillRect( 0, 0, canvas.width, canvas.height );



		this.setState({
			canvasData: context.getImageData( 0, 0, canvas.width, canvas.height ),
			width: canvas.width,
			height: canvas.height
		}, () => {
			if ( complete && className ) {
				complete( this.state.canvasData, className, false );
			}
		});
	}



	colorStops( canvasData, className, scroll, scrollElement ) {
		const elements = document.querySelectorAll( '.' + className );

		var stateCanvasData = this.state.canvasData;



		[ ...elements ].forEach( function( element ) {
			var elementTop = element.getBoundingClientRect().top,
				elementBottom = elementTop + element.getBoundingClientRect().height;

			var indexTop,
				indexBottom;

			var colorTop,
				colorBottom;



			if ( scroll && scrollElement ) {
				elementTop = element.getBoundingClientRect().top + scrollElement.scrollTop;
				elementBottom = elementTop + element.getBoundingClientRect().height;
			}



			if ( canvasData ) {
				indexTop = ( Math.floor( elementTop ) * canvasData.width ) * 4;
				indexBottom = ( Math.floor( elementBottom ) * canvasData.width ) * 4;

				colorTop = rgbToHex( canvasData.data[ indexTop ], canvasData.data[ indexTop + 1 ], canvasData.data[ indexTop + 2 ] );
				colorBottom = rgbToHex( canvasData.data[ indexBottom ], canvasData.data[ indexBottom + 1 ], canvasData.data[ indexBottom + 2 ] );
			}
			else {
				indexTop = ( Math.floor( elementTop ) * stateCanvasData.width ) * 4;
				indexBottom = ( Math.floor( elementBottom ) * stateCanvasData.width ) * 4;

				colorTop = rgbToHex( stateCanvasData.data[ indexTop ], stateCanvasData.data[ indexTop + 1 ], stateCanvasData.data[ indexTop + 2 ] );
				colorBottom = rgbToHex( stateCanvasData.data[ indexBottom ], stateCanvasData.data[ indexBottom + 1 ], stateCanvasData.data[ indexBottom + 2 ] );
			}



			element.style.setProperty( '--colorTop', '#' + colorTop );
			element.style.setProperty( '--colorBottom', '#' + colorBottom );
		});
	}



	iconScroll( canvasData, scrollElement ) {
		var stateCanvasData = this.state.canvasData;

		var scroll = scrollElement.scrollTop;



		var favicon = document.getElementById( 'favicon' ),
			icon = document.createElement( 'img' ),
			size = 32;

		var canvas = document.createElement( 'canvas' ),
			context = canvas.getContext( '2d' );



		var index,
			color;



		icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAMFBMVEVHcEwXFxcXFxcWFhYWFhYZGRkWFhYWFhYWFhYhISEYGBgWFhYXFxcWFhYWFhYWFhZ47OadAAAAEHRSTlMAQW/T4BthsJYKMYVSwaHziTcpDwAAAQdJREFUeNrNktGKxDAIRW+iRo0x+f+/3XSGUsp25nHZ8yCRAxHx4u8pFd8hlq++abVv3lmcOj4TAQz97IUdQBZ8YlZsOj3by8z2ZM+//T3picGRi3nxpHj2WQUbH3OF/5qfywBIKX27tqjdfePB0m2tzLW0gIaq4yJSLCYpCSCamS0Ruzmp6n1xgMXDxFkGr4FB1wkcugokYVZ3GRBih+CibI+uyCKMaICs+6pk1OGMwlyRHZJ2C0abWzVYHNNGou+m2i0GgOQU1TGMpHEHcAXj3Ci4DbNWUo/WNa8YNG6vx2RVfuehUOQAzvOKpuCgd38NDeo4z99XbGjXC1q2K1cclPaRgX/BDzm/Cero/XepAAAAAElFTkSuQmCC';

		canvas.width = size;
		canvas.height = size;



		if ( canvasData ) {
			index = ( Math.floor( scroll ) * canvasData.width ) * 4;

			color = rgbToHex( canvasData.data[ index ], canvasData.data[ index + 1 ], canvasData.data[ index + 2 ] );
		}
		else {
			index = ( Math.floor( scroll ) * stateCanvasData.width ) * 4;

			color = rgbToHex( stateCanvasData.data[ index ], stateCanvasData.data[ index + 1 ], stateCanvasData.data[ index + 2 ] );
		}




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



		this.createGradient( true );



		if ( this.props.open ) {
			$nav.dispatchEvent( new CustomEvent( 'scroll' ) );
		}
		else if ( this.props.open !== undefined && !this.props.open ) {
			$main.dispatchEvent( new CustomEvent( 'scroll' ) );
		}
	}, 350 );



	componentDidMount() {
		const $main = document.getElementsByTagName( 'main' )[ 0 ];



		if ( this.props.open === undefined ) {
			this.createGradient( false, this.colorStops, this.props.colorStops, true );



			$main.addEventListener( 'scroll', this.colorStops.bind( null, this.state.canvasData, this.props.colorStopsScroll, true, $main ) );

			$main.addEventListener( 'scroll', this.iconScroll.bind( null, this.state.canvasData, $main ) );
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
				this.colorStops( this.state.canvasData, this.props.colorStops, true, $nav );



				$nav.addEventListener( 'scroll', this.colorStops.bind( null, this.state.canvasData, this.props.colorStopsScroll, true, $nav ) );
			}
			else {
				$nav.removeEventListener( 'scroll', this.colorStops.bind( null, this.state.canvasData, this.props.colorStopsScroll, true, $nav ) );



				$main.dispatchEvent( new CustomEvent( 'scroll' ) );
			}
		}
	}

	componentWillUnmount() {
		const $main = document.getElementsByTagName( 'main' )[ 0 ];



		if ( this.props.open === undefined ) {
			$main.removeEventListener( 'scroll', this.colorStops.bind( null, this.state.canvasData, this.props.colorStopsScroll, true, $main ) );

			$main.removeEventListener( 'scroll', this.iconScroll.bind( null, this.state.canvasData, $main ) );
		}



		window.removeEventListener( 'resize', this.onResize.bind( this ) );
	}



	render() {
		return (
			<canvas ref={ ( background ) => { this.background = background } } id={ `bkg--` + this.props.container } className="background z--1"></canvas>
		)
	}
}



export default Background