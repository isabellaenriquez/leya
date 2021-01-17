document.addEventListener('DOMContentLoaded', () =>{
    // listen for change in radio
    chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
        const themes = ['cafe', 'rain', 'beach'];

        console.log('received message: ' + request.selection);

        themes.forEach((theme) => {
            if (theme == request.selection){
                const themeFile = document.getElementById('themeFile');
                themeFile.data = theme + '/' + theme + '.html';
            }
        });
    });
})