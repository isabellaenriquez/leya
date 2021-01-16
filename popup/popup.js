document.addEventListener('DOMContentLoaded', () => {
	const radios = document.getElementsByName('flexRadioDefault');
	const sound = document.getElementById('soundSwitch');
	let soundLabel = document.getElementById('soundLabel');

	// Send messages for radio buttons
	radios.forEach((radio) => {
		radio.addEventListener('change', (e) => {
			console.log(e);
			chrome.runtime.sendMessage({ action: e.target.id });
		});
	});

	// Send messages for sound toggle
	sound.addEventListener('change', () => {
		if (sound.checked) {
			soundLabel.innerHTML = 'sound on';
			chrome.runtime.sendMessage({ action: 'play' });
		} else if (!sound.checked) {
			soundLabel.innerHTML = 'sound off';
			chrome.runtime.sendMessage({ action: 'mute' });
		}
	});
});
