import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"



const Caption = ( props ) => {
	return (
        <div className="border border--bottom--1 border--right--1 border--transparent">
			<div className="bkg--black padding--75">
				<div className="caption color-stop text--gradient">{ documentToReactComponents( props.caption, props.text ) }</div>
			</div>
		</div>
	)
}



export default Caption