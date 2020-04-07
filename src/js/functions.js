// Number Functions

//// Convert number to roman numeral
export function toRomanNumeral( number ) {
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};

	var str = '';



	for ( var i of Object.keys( roman ) ) {
	    var q = Math.floor( number / roman[i] );

	    number -= q * roman[i];

	    str += i.repeat( q );
	}


	return str;
}



//// Convert decimal degrees to HMS degrees
export function toDMS( decimal, isLong ) {
	var dir = decimal < 0
		? isLong ? 'W' : 'S'
		: isLong ? 'E' : 'N';



	var absDecimal = Math.abs( decimal ),
		deg = absDecimal | 0,
		frac = absDecimal - deg;



	var min = ( frac * 60 ) | 0,
		sec = frac * 3600 - min * 60;

	sec = sec.toFixed( 3 );



	return deg + '°' + min + "'" + sec + '"' + dir;
}





// Color Functions

//// Convert rgb to hex
export function toHex( color ) {
	var hex = Number( color ).toString( 16 );



	if ( hex.length < 2 ) {
	   hex = '0' + hex;
	}



	return hex;
}

export function rgbToHex( r, g, b ) {
	var red = toHex( r ),
		green = toHex( g ),
		blue = toHex( b );



	return red + green + blue;
}





// Other Utility Functions

//// Debounce
//// https://davidwalsh.name/javascript-debounce-function
export function debounce( func, wait, immediate ) {
	var timeout;



	return function() {
		var context = this,
			args = arguments;

		var later = function() {
				timeout = null;



				if ( !immediate ) func.apply( context, args );
			};

		var callNow = immediate && !timeout;



		clearTimeout( timeout );

		timeout = setTimeout( later, wait );



		if ( callNow ) func.apply( context, args );
	};
};



//// Key Mapping
//// https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93
export function doomGuy() {
	const $body = document.getElementsByTagName( 'body' )[0];

	const code = 'iddqd';



	var keys = [],
		keySequence,
		lastKeyTime = Date.now();



	document.addEventListener( 'keydown', event => {
		const key = event.key.toLowerCase();



		if ( code.indexOf( key ) === -1 ) return;



		const currentTime = Date.now();



		if ( currentTime - lastKeyTime > 600 ) {
            keys = [];
        }



        keys.push( key );



		lastKeyTime = currentTime;



		keySequence = keys.join( '' );

		if ( keySequence === code ) {
			console.log( 'god mode activated' );
		}
	});
}