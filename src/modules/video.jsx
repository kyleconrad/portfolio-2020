import React from "react"

import VideoEmbed from "../components/videoEmbed"



const Video = ( props ) => {
	const videoData = props.data



	return (
		<VideoEmbed data={ videoData } />
	)
}



export default Video