import React from "react"

import VideoEmbed from "../components/videoEmbed"



const Video = ( props ) => {
	const videoData = props.data



	return (
        <div className="border border--left--1 border--right--1 border--transparent margin--bottom--1">
			<VideoEmbed data={ videoData } />
		</div>
	)
}



export default Video