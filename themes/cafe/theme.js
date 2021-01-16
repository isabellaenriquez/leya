function getTopTest(data) {
    var top = document.getElementById("mostVisited");
    var ul = top.appendChild(document.createElement("ul"));

    for (var i = 0; i < 3; i++) {
        var li = ul.appendChild(document.createElement("li"));
        var a = li.appendChild(document.createElement ("a"));
        a.innerHTML = data[i].title;
        a.href = data[i].url;
    }
}

window.onload = function() {
    chrome.topSites.get(getTopTest);
}



