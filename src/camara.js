module.exports = {

	captura: function(){
		var img = new Image();
		var video = document.querySelector('video');
		var canvas = document.createElement('canvas');
		canvas.width = 320;
		canvas.height = 400;

		var ctx = canvas.getContext('2d')
		ctx.drawImage(video, 0,0, canvas.width, canvas.height);

		img.src = canvas.toDataURL("image/png");


		return img;

	},
	startWebcam: function (){
		if (navigator.getUserMedia) {
			 navigator.getUserMedia (

					// constraints
					{
						 video: true,
						 audio: false
					},

					// successCallback
					function(localMediaStream) {
							video = document.querySelector('video');
						 video.src = window.URL.createObjectURL(localMediaStream);
						 webcamStream = localMediaStream;
					},

					// errorCallback
					function(err) {
						 console.log("The following error occured: " + err);
					}
			 );
		} else {
			 console.log("getUserMedia not supported");
		}
	}

}