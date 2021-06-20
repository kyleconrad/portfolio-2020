import { useEffect } from 'react'
import { navigate } from 'gatsby'



const FourOhFour = () => {
	useEffect( () => {
		navigate( '/' );
	}, [] );



	return null;
};



export default FourOhFour