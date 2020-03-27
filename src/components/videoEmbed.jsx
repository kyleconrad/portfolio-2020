import React from "react"



const VideoEmbed = ( props ) => {
	return (
		<video className="bkg--black" playsInline muted poster={ props.data.videoPoster.file.url }>
			<source src={ props.data.videoWebM.file.url } type="video/webm" />
			<source src={ props.data.videoOgg.file.url } type="video/ogg" />
			<source src={ props.data.videoMp4.file.url } type="video/mp4" />
		</video>
	)
}



export default VideoEmbed