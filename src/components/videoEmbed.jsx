import React from "react"
import { Component } from "react"



class VideoEmbed extends Component {
	constructor( props ) {
		super( props );



		this.videoEmbed = React.createRef();



		this.paused = true;
		this.preload = false;
		this.interaction = false;

		this.state = {
			paused: true,
			preload: 'metadata',
			height: 0,
			posY: 0,
			progress: '0'
		};



		this.playVideo = this.playVideo.bind( this );
		this.pauseVideo = this.pauseVideo.bind( this );
		this.toggleVideo = this.toggleVideo.bind( this );

		this.preloadVideo = this.preloadVideo.bind( this );

		this.updateProgress = this.updateProgress.bind( this );

		this.scrollLoad = this.scrollLoad.bind( this );
	}



	playVideo() {
		if ( this.videoEmbed.currentTime === this.videoEmbed.duration ) {
			this.videoEmbed.currentTime = 0;
		}



		this.videoEmbed.play();

		this.paused = false;

		this.setState({
			paused: this.paused
		});
	}

	pauseVideo() {
		this.videoEmbed.pause();

		this.paused = true;

		this.setState({
			paused: this.paused
		});
	}

	toggleVideo() {
		this.paused ? this.playVideo() : this.pauseVideo();

		this.interaction = true;
	}



	preloadVideo() {
		this.preload = true;

		this.setState({
			preload: 'auto'
		});
	}



	updateProgress( e ) {
		if ( typeof e !== 'undefined' && typeof e.target.value !== 'undefined' ) {
			var currentTime = ( e.target.value / 100 ) * this.videoEmbed.duration;



			this.videoEmbed.currentTime = currentTime;

			this.setState({
				progress: e.target.value
			});


			e.preventDefault();
		}
		else {
			var currentProgress = ( this.videoEmbed.currentTime / this.videoEmbed.duration ) * 100;



			if ( this.videoEmbed.currentTime === this.videoEmbed.duration ) {
				this.paused = true;
			}



			this.setState({
				paused: this.paused,
				progress: currentProgress
			});
		}
	}



	scrollLoad( e ) {
		var windowHeight = window.innerHeight;

		var	scrollPosY = window.scrollY,
			preloadPosY = this.state.posY - ( windowHeight * 2 ),
			playPosY = this.state.posY - ( windowHeight * 0.75 );



		if ( scrollPosY >= preloadPosY && !this.preload ) {
			this.preloadVideo();
		}



		if ( scrollPosY >= playPosY && this.paused && !this.interaction ) {
			this.playVideo();
		}
	}



	componentDidMount() {
		this.setState({
			height: this.videoEmbed.getBoundingClientRect().height,
			posY: this.videoEmbed.getBoundingClientRect().top
		}, () => {
			window.addEventListener( 'scroll', this.scrollLoad );
		});
	}

	componentWillUnmount() {
		window.removeEventListener( 'scroll', this.scrollLoad );
	}



	render() {
		return (
			<div className={ `video__container bkg--black ${ this.paused ? 'video--paused' : 'video--playing' }` }>
				<div className="video__control z--3">
					<div className="video__control__progress__container overflow--hidden">
						<div className="video__control__progress color-stop bkg--gradient bkg--gradient--stop z--2" style={{ transform: `translateX( ${ this.state.progress - 100 }% )` }} />
					</div>
					<input type="range" value={ `${ this.state.progress }` } min="0" max="100" step="0.01" onChange={ this.updateProgress } className="video__control__input z--1" />
				</div>

				<button onClick={ this.toggleVideo } className="video__overlay custom-cursor z--2" />

				<video ref={ ( videoEmbed ) => { this.videoEmbed = videoEmbed } } preload={ this.state.preload } playsInline muted onTimeUpdate={ this.updateProgress } poster={ this.props.data.videoPoster.file.url } className="z--1">
					<source src={ this.props.data.videoWebM.file.url } type="video/webm" />
					<source src={ this.props.data.videoOgg.file.url } type="video/ogg" />
					<source src={ this.props.data.videoMp4.file.url } type="video/mp4" />
				</video>
			</div>
		)
	}
}



export default VideoEmbed



// https://github.com/jacobvenable/portfolio-gatsby/blob/master/src/components/Video.js