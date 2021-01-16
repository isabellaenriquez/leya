const pageConditions = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: { schemes: ['https', 'http'] }
		})
	],
	actions: [new chrome.declarativeContent.ShowPageAction()]
};

const cafeAudio = new Audio(chrome.runtime.getURL('audio/cafe.mp3'));
const rainAudio = new Audio(chrome.runtime.getURL('audio/rain.mp3'));
const beachAudio = new Audio(chrome.runtime.getURL('audio/beach.mp3'));

const audios = [
	{ name: 'cafe', file: cafeAudio },
	{ name: 'rain', file: rainAudio },
	{ name: 'beach', file: beachAudio }
];

chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
	});
});

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
	function muteElement(elem) {
		elem.muted = true;
		elem.pause();
	}

	function muteAll() {
		document.querySelectorAll('audio').forEach((elem) => muteElement(elem));
	}

	// Handle playing/pausing audio files
	audios.forEach((audio) => {
		if (audio.name == request.action) {
			audio.file.play();
		} else {
			audio.file.pause();
		}
	});

	//Handle mute
	if (request.action == 'muteAll') {
		muteAll();
	}
});
