import React from "react"
import classNames from "classnames"



const Spacer = ( props ) => {
	return (
		<div className={ classNames( 'border', 'border--top--3', {
			'border--bottom--3': !props.bottom,
			'border--black': props.invert,
			'border--transparent': !props.invert
		})}>
			<div className={ classNames( 'border', 'border--1', {
				'border--black': !props.invert,
				'border--transparent': props.invert
			})}>
				<div className={ classNames( `height--${ props.height }`, 'bkg--topo', {
					'bkg--topo--black': !props.invert,
					'bkg--topo--invert': props.invert
				})}></div>
			</div>
		</div>
	)
}



export default Spacer