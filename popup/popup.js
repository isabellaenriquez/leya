document.addEventListener('DOMContentLoaded', () => {
	const radios = document.getElementsByName('flexRadioDefault');
	const sound = document.getElementById('soundSwitch');
	let soundLabel = document.getElementById('soundLabel');

	// Set UI from storage

	chrome.storage.local.get(['selection'], function (result) {
		console.log(result.selection);
		if (result.selection == 'none') {
			radios.forEach((radio) => {
				radio.checked = false;
			});
		} else {
			document.getElementById(result.selection).checked = true;
		}
	});

	chrome.storage.local.get(['muted'], function (result) {
		console.log(result.muted);
		if (result.muted) {
			soundLabel.innerHTML = 'sound off';
			sound.checked = false;
		} else {
			soundLabel.innerHTML = 'sound on';
			sound.checked = true;
		}
	});

	// Send messages for selecting radio buttons
	radios.forEach((radio) => {
		radio.addEventListener('change', (e) => {
			chrome.storage.local.set({ selection: e.target.id }, function () {
				chrome.runtime.sendMessage({
					action: 'play',
					selection: e.target.id
				});
			});
		});
	});

	// Send messages for sound toggle
	sound.addEventListener('change', () => {
		// Returns promise the resolves to selected radio button
		const getSelectedRadio = () => {
			return new Promise((resolve) => {
				radios.forEach((radio) => {
					if (document.getElementById(radio.id).checked) {
						resolve(radio.id);
					}
				});
				resolve('none');
			});
		};

		// Handle sound toggle messages
		if (sound.checked) {
			chrome.storage.local.get(['selection'], function (response) {
				chrome.storage.local.set({ muted: false }, function () {
					soundLabel.innerHTML = 'sound on';
					chrome.runtime.sendMessage({
						action: 'unmute',
						selection: response
					});
				});
			});

			/* 			getSelectedRadio().then((response) => {
				soundLabel.innerHTML = 'sound on';
				chrome.runtime.sendMessage({
					action: 'unmute',
					selection: response
				});
			}); */
		} else if (!sound.checked) {
			chrome.storage.local.get(['selection'], function (response) {
				chrome.storage.local.set({ muted: true }, function () {
					soundLabel.innerHTML = 'sound off';
					chrome.runtime.sendMessage({
						action: 'mute',
						selection: response
					});
				});
			});

			/* 			getSelectedRadio().then((response) => {
				soundLabel.innerHTML = 'sound off';
				chrome.runtime.sendMessage({
					action: 'mute',
					selection: response
				});
			}); */
		}
	});
});
