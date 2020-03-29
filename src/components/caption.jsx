import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"



const Caption = ( props ) => {
	return (
        <div className="border border--right--1 border--transparent margin--bottom--1">
			<div className="bkg--black padding--75">
				<div className="caption color-stop text--gradient">{ documentToReactComponents( props.caption, props.text ) }</div>
			</div>
		</div>
	)
}



export default Caption