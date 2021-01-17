document.addEventListener('DOMContentLoaded', () => {
    const themeFile = document.getElementById('themeFile');

    chrome.storage.local.get(['selection'], function (result) {
        console.log(result.selection);
        let themeChoice = result.selection;
		if (themeChoice == 'none') {
			themeFile.data = 'cafe/cafe.html';
		} else {
			themeFile.data = themeChoice + '/' + themeChoice + '.html';
		}
	});

    // listen for change in radio
    chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
        const themes = ['cafe', 'rain', 'beach'];

        console.log('received message: ' + request.selection);

        themes.forEach((theme) => {
            if (theme == request.selection) {
                themeFile.data = theme + '/' + theme + '.html';
            }
        });
    });

})