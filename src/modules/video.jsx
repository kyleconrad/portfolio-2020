import React from "react"

import VideoEmbed from "../components/videoEmbed"



const Video = ( props ) => {
	const videoData = props.data



	return (
        <section className="border border--left--1 border--right--1 border--bottom--1 border--transparent overflow--hidden">
			<VideoEmbed data={ videoData } />
		</section>
	)
}



export default Video