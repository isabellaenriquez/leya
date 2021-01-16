function getTopTest(data) {
    var top = document.getElementById("topSite");
    console.log(top);
    top.href = data[0].url;
    top.innerHTML = data[0].title;
}

window.onload = function() {
    chrome.topSites.get(getTopTest);
}



