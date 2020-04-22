import React from "react"

import { toRomanNumeral } from "../js/functions"
import { toDMS } from "../js/functions"



const Sidebar = ( props ) => {
	return(
		<div className={ `sidebar sidebar--gradient flex--column flex--start flex--align-center mobile-flex--row` }>
			{ props.year &&
				<div className="sidebar__year padding--bottom--50 mobile-padding--bottom--0 mobile-padding--left--75 bkg--black order--1 mobile-order--2">
					<span className="color-stop detail text--gradient--reverse">{ toRomanNumeral( props.year ) }</span>
				</div>
			}

			<div className="sidebar__bar color-stop flex--grow order--2 mobile-order--1" />

			{ props.location &&
				<div className="sidebar__location padding--top--50 bkg--black order--3">
					<span className="color-stop detail text--gradient--reverse">{ toDMS( props.location.lat, false ) } { toDMS( props.location.lon, true ) }</span>
				</div>
			}
		</div>
	)
}



export default Sidebar