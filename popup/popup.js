document.addEventListener('DOMContentLoaded', () => {
	const radios = document.getElementsByName('flexRadioDefault');
	const sound = document.getElementById('soundSwitch');
	let soundLabel = document.getElementById('soundLabel');

	// Send messages for radio buttons
	radios.forEach((radio) => {
		radio.addEventListener('change', (e) => {
			chrome.runtime.sendMessage({
				action: 'play',
				selection: e.target.id
			});
		});
	});

	// Send messages for sound toggle
	sound.addEventListener('change', () => {
		const selectedRadio = () => {
			return new Promise((resolve) => {
				radios.forEach((radio) => {
					if (document.getElementById(radio.id).checked) {
						resolve(radio.id);
					}
				});
				resolve('none');
			});
		};

		if (sound.checked) {
			selectedRadio().then((response) => {
				soundLabel.innerHTML = 'sound on';
				chrome.runtime.sendMessage({
					action: 'unmute',
					selection: response
				});
			});
		} else if (!sound.checked) {
			selectedRadio().then((response) => {
				soundLabel.innerHTML = 'sound off';
				chrome.runtime.sendMessage({
					action: 'mute',
					selection: response
				});
			});
		}
	});
});
