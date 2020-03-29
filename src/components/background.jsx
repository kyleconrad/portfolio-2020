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



		this.createGradient = this.createGradient.bind( this );
		this.colorStops = this.colorStops.bind( this );
	}



	createGradient( clear, complete, class1, class2 ) {
		var canvas = this.background;

		var parent = canvas.parentElement,
			parentWidth = parent.getBoundingClientRect().width,
			parentHeight = parent.getBoundingClientRect().height;

		var primaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--primaryColor' ),
			secondaryColor = getComputedStyle( document.documentElement ).getPropertyValue( '--secondaryColor' );



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
			complete( class1, false );
			complete( class2, true );
		});
	}



	colorStops( className, scroll ) {
		var	scrollPosY = window.scrollY,
			stickPosY = document.getElementsByTagName( 'header' )[ 0 ].getBoundingClientRect().top + getComputedStyle( document.getElementsByTagName( 'header' )[ 0 ] ).borderTopWidth.slice( 0, -2 );

		var elements = document.getElementsByClassName( className );



		for ( let i = 0; i < elements.length; i++ ) {
			var element = elements[ i ];

			var elementTop = element.getBoundingClientRect().top,
				elementBottom = elementTop + element.getBoundingClientRect().height;



			if ( scroll && scrollPosY >= stickPosY ) {
				elementTop = element.getBoundingClientRect().top + scrollPosY;
				elementBottom = elementTop + element.getBoundingClientRect().height;
			}



			var indexTop = ( Math.floor( elementTop ) * this.state.canvasData.width ) * 4,
				indexBottom = ( Math.floor( elementBottom ) * this.state.canvasData.width ) * 4;

			var colorTop = rgbToHex( this.state.canvasData.data[ indexTop ], this.state.canvasData.data[ indexTop + 1 ], this.state.canvasData.data[ indexTop + 2 ] ),
				colorBottom = rgbToHex( this.state.canvasData.data[ indexBottom ], this.state.canvasData.data[ indexBottom + 1 ], this.state.canvasData.data[ indexBottom + 2 ] );



			element.style.setProperty( '--colorTop', '#' + colorTop );
			element.style.setProperty( '--colorBottom', '#' + colorBottom );
		}
	}



	onResize = debounce( ( e ) => {
		this.createGradient( true, this.colorStops, 'color-stop', 'color-stop--scroll' );
	}, 350 );



	componentDidMount() {
		if ( this.props.name === 'main' ) {
			this.createGradient( false, this.colorStops, 'color-stop' );



			window.addEventListener( 'resize', this.onResize.bind( this ) );

			window.addEventListener( 'scroll', this.colorStops.bind( null, 'color-stop--scroll', true ) );
		}
	}

	componentWillUnmount() {
		if ( this.props.name === 'main' ) {
			window.removeEventListener( 'resize', this.onResize.bind( this ) );

			window.removeEventListener( 'scroll', this.colorStops.bind( null, 'color-stop--scroll', true ) );
		}
	}



	render() {
		return (
			<canvas ref={ ( background ) => { this.background = background } } id={ `bkg--` + this.props.name } className="background z--1"></canvas>
		)
	}
}



export default Background