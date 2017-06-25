function getVideoSrc(url) {
	var src = url.replace('watch?v=', 'embed/');
	return src+'?rel=0';
}

function loadVideo() {
	var videoPlayer = document.getElementById('videoPlayer');
	var url = document.getElementById('videoURL').value; // https://www.youtube.com/watch?v={videoId}
	if (url == "") {
		var errorMessage = document.createElement('div');
		errorMessage.setAttribute('id', 'errorMessage');
		errorMessage.innerHTML = 'You must enter a Youtube URL.';
		errorMessage.setAttribute('style', 'color: red');
		videoPlayer.appendChild(errorMessage);
	} else {
		var errorMessage = document.getElementById("errorMessage");
		if (errorMessage) {
			videoPlayer.removeChild(errorMessage)
		}
		var iframe = document.createElement('iframe');
		iframe.setAttribute('id', 'videoPlayer');
		iframe.setAttribute('width', '575px');
		iframe.setAttribute('height', '390px');
		iframe.setAttribute('frameborder', '0px');
		var src = getVideoSrc(url);
		iframe.setAttribute('src', src); // https://www.youtube.com/embed/{videoId}?rel=0
		videoPlayer.appendChild(iframe);
	}
}