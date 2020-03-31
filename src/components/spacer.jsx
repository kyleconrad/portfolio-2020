import React from "react"



const Spacer = ( props ) => {
	return (
		<div className={ `border border--top--3 ${ !props.bottom ? 'border--bottom--3' : '' } border--black` }>
			<div className="border border--1 border--transparent">
				<div className={ `height--${ props.height } bkg--topo ${ props.invert ? 'bkg--topo--invert' : 'bkg--topo--black' }` }></div>
			</div>
		</div>
	)
}



export default Spacer