import React from "react"



const Header = ( props ) => {
	return (
		<div className="header flex--row flex--start flex--align-center mobile-flex--end margin--bottom--100 landscape-padding--left--50 portrait-padding--left--25">
			<span className={ `detail ${ props.gradient ? 'color-stop text--gradient' : 'text--black' }` }>{ props.text }</span>
		</div>
	)
}



export default Header