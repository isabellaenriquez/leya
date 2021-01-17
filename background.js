const pageConditions = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: { schemes: ['https', 'http', 'chrome'] }
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
const audioNames = audios.map((audio) => audio.name);

let muted = false;

chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.set({ selection: 'none', muted: false });
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
	});
});

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
	// Handle playing/pausing audio files
	function playAudio(name) {
		console.log(name);
		audios.forEach((audio) => {
			if (audio.name == name && !muted) {
				audio.file.play();
			} else {
				audio.file.pause();
			}
		});
	}

	//Handle requests
	if (request.action == 'play') {
		playAudio(request.selection);
	} else if (request.action == 'mute') {
		muted = true;
		playAudio(request.selection);
	} else if (request.action == 'unmute') {
		muted = false;
		playAudio(request.selection.selection); // TODO: look at this?
	}
});
