import { key } from '../key.js'

document.addEventListener('DOMContentLoaded', () => {

    // most visited
    const top = document.getElementById("most-visited");
    function getRecent(data) {
        for (let i = 0; i < 3; i++) {
            let p = document.createElement('p');
            let a = document.createElement('a');
            a.innerHTML = data[i].title;
            a.href = data[i].url;
            p.appendChild(a);
            top.appendChild(p);
        }
    }
    chrome.topSites.get(getRecent);
    
    // quote of the day
    function getQuote(){
        const quote = document.getElementById('quote');
        fetch('https://api.quotable.io/random?maxLength=50')
        .then(response => response.json())
        .then(data => {
            //console.log(`${data.content} —${data.author}`);
            quote.innerHTML = `${data.content} —${data.author}`;
        });
    }
    getQuote();

    // weather
    function getWeather(postalCode){
        const weatherText = document.getElementById('weather');
        fetch("https://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + postalCode, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.location);
            const location = document.getElementById('location');
            location.innerHTML = data.location.name;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = "https:" + data.current.condition.icon;
            const weather = document.getElementById('weather');
            weather.innerHTML = data.current.condition.text;
        });
    }
    //getWeather();

    const postalBtn = document.getElementById('postal-btn');
    postalBtn.addEventListener('click', () =>{
        const postalCode = document.getElementById('postal-input').value;
        getWeather(postalCode);
    })

    // see/close menu
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', () => {
        const menus = document.getElementsByClassName('menu');
        console.log(menus);
        for (let menu of menus){
            if (menu.style.display == 'none') {
                menu.style.display = 'block';
                console.log('display menu');
                menuBtn.innerHTML = 'Close menu';
            } else {
                menu.style.display = 'none';
                console.log('close menu');
                menuBtn.innerHTML = 'See menu'
            }
        }
    });
    
});



