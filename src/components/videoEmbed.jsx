import React from "react"
import { Component } from "react"
import ReactGA from "react-ga"



class VideoEmbed extends Component {
	constructor( props ) {
		super( props );



		this.videoEmbed = React.createRef();



		this.videoId = Math.round( Math.random() * 500 );



		this.paused = true;
		this.preload = false;
		this.interaction = false;

		this.mute = true;

		this.tracked = false;


		this.state = {
			paused: true,
			tracked: false,
			preload: 'metadata',
			height: 0,
			posY: 0,
			progress: '0',
			audio: props.data.audio.toLowerCase(),
			mute: true
		};



		this.playVideo = this.playVideo.bind( this );
		this.pauseVideo = this.pauseVideo.bind( this );
		this.toggleVideo = this.toggleVideo.bind( this );

		this.muteAudio = this.muteAudio.bind( this );
		this.unmuteAudio = this.unmuteAudio.bind( this );
		this.toggleAudio = this.toggleAudio.bind( this );

		this.preloadVideo = this.preloadVideo.bind( this );

		this.trackVideo = this.trackVideo.bind( this );

		this.updateProgress = this.updateProgress.bind( this );

		this.scrollLoad = this.scrollLoad.bind( this );
	}



	playVideo() {
		if ( this.videoEmbed ) {
			if ( this.videoEmbed.currentTime === this.videoEmbed.duration && this.interaction ) {
				this.videoEmbed.currentTime = 0;
			}



			this.videoEmbed.play();

			this.paused = false;



			this.setState({
				paused: this.paused
			});



			this.trackVideo();
		}
	}

	pauseVideo() {
		if ( this.videoEmbed ) {
			this.videoEmbed.pause();

			this.paused = true;



			this.setState({
				paused: this.paused
			});
		}
	}

	toggleVideo() {
		this.paused ? this.playVideo() : this.pauseVideo();



		this.interaction = true;
	}



	muteAudio() {
		if ( this.videoEmbed ) {
			this.videoEmbed.muted = true;

			this.mute = true;



			this.setState({
				mute: true
			});
		}
	}

	unmuteAudio() {
		if ( this.videoEmbed ) {
			this.videoEmbed.muted = false;

			this.mute = false;



			this.setState({
				mute: false
			});
		}
	}

	toggleAudio() {
		this.mute ? this.unmuteAudio() : this.muteAudio();
	}



	preloadVideo() {
		this.preload = true;



		this.setState({
			preload: 'auto'
		});
	}



	trackVideo() {
		var videoTitleString = this.videoEmbed.poster.split( '/' ).pop(),
			videoTitle = videoTitleString.substring( 0, videoTitleString.length - 4 );

		

		if ( !this.tracked && !this.interaction ) {
			ReactGA.event({
				category: 'Videos',
				action: 'Autoplay',
				label: videoTitle
			});
		}



		if ( this.interaction ) {
			ReactGA.event({
				category: 'Videos',
				action: 'Play',
				label: videoTitle
			});
		}



		this.tracked = true;
	
		this.setState({
			tracked: this.tracked
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
		const main = document.getElementsByTagName( 'main' )[ 0 ];

		var windowHeight = window.innerHeight;

		var	scrollPosY = main.scrollTop,
			preloadPosY = this.state.posY - ( windowHeight * 3 ),
			playPosY = this.state.posY - ( windowHeight * 0.75 ),
			pausePosY = this.state.posY + this.state.height;



		if ( scrollPosY >= preloadPosY && !this.preload ) {
			this.preloadVideo();
		}



		if ( scrollPosY >= pausePosY && !this.paused ) {
			this.pauseVideo();
		}
		else if ( scrollPosY < pausePosY && scrollPosY >= playPosY && this.paused && !this.interaction ) {
			this.playVideo();
		}
	}



	componentDidMount() {
		const main = document.getElementsByTagName( 'main' )[ 0 ];



		this.setState({
			height: this.videoEmbed.getBoundingClientRect().height,
			posY: this.videoEmbed.getBoundingClientRect().top
		}, () => {
			main.addEventListener( 'scroll', this.scrollLoad );
		});
	}

	componentWillUnmount() {
		const main = document.getElementsByTagName( 'main' )[ 0 ];



		main.removeEventListener( 'scroll', this.scrollLoad );
	}



	render() {
		return (
			<div className={ `video__container bkg--black ${ this.paused ? 'video--paused' : 'video--playing' } ${ this.state.mute ? 'video--mute' : '' }` }>
				<div className="video__control flex--row flex--between flex--align-end z--3">
					<div className="flex--grow">
						<div className="video__control__progress__container flex--grow overflow--hidden">
							<div className="video__control__progress color-stop bkg--gradient bkg--gradient--stop z--2" style={{ transform: `translateX( ${ this.state.progress - 100 }% )` }} />
						</div>
						<input type="range" value={ `${ this.state.progress }` } min="0" max="100" step="0.01" onChange={ this.updateProgress } className="video__control__input z--1" />
					</div>

					{ this.state.audio === 'true' &&
						<div className="flex--shrink--0 padding--left--25">
							<button className="video__control__sound" onClick={ this.toggleAudio }>
								<svg className="color-stop" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 83 83" xmlSpace="preserve">
									<defs>
										<linearGradient id={ `controlGradient--${ this.videoId }` } x1="0%" y1="0%" x2="0%" y2="100%">
											<stop offset="0%" className="video__control__sound__color-top" />
											<stop offset="100%" className="video__control__sound__color-bottom" />
										</linearGradient>
									</defs>

									<g stroke={ `url( #controlGradient--${ this.videoId } )` } className="video__control__sound--playing" fill="none" stroke-width="2px" stroke-miterlimit="10">
										<polygon class="st0" points="38.5,19.5 26.3,30.7 13.2,30.7 13.2,50.3 26.6,50.3 38.5,61.5 	"/>
										<path class="st0" d="M46.8,19.5c11.6,0,21,9.4,21,21s-9.4,21-21,21"/>
										<path class="st0" d="M46.8,28.8c6.5,0,11.7,5.2,11.7,11.7s-5.2,11.7-11.7,11.7"/>
										<circle class="st0" cx="41" cy="41" r="40"/>
									</g>
									<g stroke={ `url( #controlGradient--${ this.videoId } )` } className="video__control__sound--mute" fill="none" stroke-width="2px" stroke-miterlimit="10">
										<line x1="46.9" y1="31.1" x2="65.7" y2="49.9"/>
										<line x1="65.7" y1="31.1" x2="46.9" y2="49.9"/>
										<polygon points="38.7,19.5 26.4,30.7 13.3,30.7 13.3,50.3 26.7,50.3 38.7,61.5 	"/>
										<circle cx="41" cy="41" r="40"/>
									</g>
								</svg>
							</button>
						</div>
					}
				</div>

				<button onClick={ this.toggleVideo } className="video__overlay custom-cursor z--2" />

				<video ref={ ( videoEmbed ) => { this.videoEmbed = videoEmbed } } preload={ this.state.preload } playsInline muted onTimeUpdate={ this.updateProgress } poster={ this.props.data.videoPoster.fluid.base64 } className="z--1">
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