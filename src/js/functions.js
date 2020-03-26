//// Number Functions

// Convert number to roman numeral
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



// Convert decimal degrees to HMS degrees
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



	return deg + "° " + min + "' " + sec + '" ' + dir;
}