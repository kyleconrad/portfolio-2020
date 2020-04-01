import React from "react"
import { Component } from "react"

// import Store from "../components/store"

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
			// if ( this.props.container === 'main' ) {
			// 	Store.backgroundData = this.state.canvasData;
			// }



			if ( complete && className ) {
				complete( this.state.canvasData, className, false );
			}
		});
	}



	colorStops( canvasData, className, scroll, scrollElement ) {
		var elements = document.getElementsByClassName( className );



		for ( let i = 0; i < elements.length; i++ ) {
			var element = elements[ i ];

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
				indexTop = ( Math.floor( elementTop ) * this.state.canvasData.width ) * 4;
				indexBottom = ( Math.floor( elementBottom ) * this.state.canvasData.width ) * 4;

				colorTop = rgbToHex( this.state.canvasData.data[ indexTop ], this.state.canvasData.data[ indexTop + 1 ], this.state.canvasData.data[ indexTop + 2 ] );
				colorBottom = rgbToHex( this.state.canvasData.data[ indexBottom ], this.state.canvasData.data[ indexBottom + 1 ], this.state.canvasData.data[ indexBottom + 2 ] );
			}



			element.style.setProperty( '--colorTop', '#' + colorTop );
			element.style.setProperty( '--colorBottom', '#' + colorBottom );
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
		}
		else {
			this.createGradient();
		}



		window.addEventListener( 'resize', this.onResize.bind( this ) );
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		const 	$main = document.getElementsByTagName( 'main' )[ 0 ],
				$nav = document.getElementsByTagName( 'nav' )[ 0 ];
		// if ( this.props.container === 'navigation' ) {
		// 	console.log( Store.backgroundData );
		// }
		// console.log( this.props.container, this.props.open, this.state.canvasData, Store.backgroundData );



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