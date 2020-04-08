import React from "react"

import { toRomanNumeral } from "../js/functions"
import { toDMS } from "../js/functions"



const Sidebar = ( props ) => {
	return(
		<div className={ `color-stop sidebar sidebar--gradient flex--column ${ props.year ? 'flex--between' : 'flex--end' } flex--align-center mobile-flex--row mobile-flex--end` }>
			{ props.year &&
				<div className="sidebar__year padding--bottom--50 mobile-padding--bottom--0 mobile-padding--left--75 bkg--black z--2">
					<span className="color-stop detail text--gradient--reverse">{ toRomanNumeral( props.year ) }</span>
				</div>
			}

			{ props.location &&
				<div className="sidebar__location padding--top--50 bkg--black z--2">
					<span className="color-stop detail text--gradient--reverse">{ toDMS( props.location.lat, false ) } { toDMS( props.location.lon, true ) }</span>
				</div>
			}
		</div>
	)
}



export default Sidebar