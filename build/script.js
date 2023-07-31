'use strict';
function showBarAndSearch() {
    const box = document.getElementById("search-wrapper");
    const input = document.getElementsByClassName("search")[0];
    const icon = document.getElementsByClassName("search-icon2")[0];
    const icon1 = document.getElementsByClassName("search-icon1")[0];
    if (input.value =='') {
        icon1.style.display = "none";
        icon.style.display = "inline";
        icon.style.animationName = "rotate";
        icon.style.animationDuration = "5s";
        box.style.animationName = "close";
        box.style.animationDuration = "1.5s"
        box.style.marginLeft = "0px"
        input.style.display = "flex";
        input.style.animationName = "open";
        input.style.animationDuration = "1.5s";
    } else {
        userSearch(input.value);
    }
};

let weather = {
    key:'fca951a4460bdc5dfd67303ebdb06216',
    fetchLocation:function() {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    },lati:'',
    long:'',
    success:function (position) {
         const {latitude, longitude} = position.coords;
         console.log(latitude);
        //  this.lati = String(latitude);
        //  this.long = String(longitude);
         weather.fetchWeather(latitude, longitude);
    },
    error:function () {
        console.log("unable to get user location");
    },
    fetchWeather:function(lat, long) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=fca951a4460bdc5dfd67303ebdb06216").then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const location = document.querySelector("#location");
        const tempinfo = document.querySelector("#temp");
        const cloud = document.querySelector("#w-type");
        const humi = document.querySelector("#humidity");
        const wsp = document.querySelector("#w-speed");
        const ico =  document.querySelector("#icon")
        const {main:{temp, humidity}, sys:{country}, name, weather:{0:{main, icon}}, wind:{speed}} = data;
        location.innerHTML = `weather in ${name}, ${country}`;
        tempinfo.innerHTML = `${temp}℃`;
        cloud.innerHTML = `${main}`;
        humi.innerHTML = `Humidity : ${humidity}%`;
        wsp.innerHTML = `Wind Speed : ${speed}Km/H`;
        ico.src = "http://openweathermap.org/img/wn/"+ icon +".png";
        location.style.display = 'block';
        tempinfo.style.display = 'block';
        cloud.style.display = 'block';
        humi.style.display = 'block';
        wsp.style.display = 'block';
        ico.style.display = 'block';
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#searchB").style.display = "inline";
    }
};
weather.fetchLocation();
function userSearch(input) {
    const location = document.querySelector("#location");
    const tempinfo = document.querySelector("#temp");
    const cloud = document.querySelector("#w-type");
    const humi = document.querySelector("#humidity");
    const wsp = document.querySelector("#w-speed");
    const ico =  document.querySelector("#icon");
    location.style.display = 'none';
    tempinfo.style.display = 'none';
    cloud.style.display = 'none';
    humi.style.display = 'none';
    wsp.style.display = 'none';
    ico.style.display = 'none';
    document.querySelector("#loader").style.display = "grid";
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+input+",234&limit=5&appid=fca951a4460bdc5dfd67303ebdb06216").then((response) => response.json()).then((data) => getCoords(data));
};
function getCoords(inf) {
  for (let result of inf) {
    if (result.country === 'NG') {
       weather.fetchWeather(result.lat, result.lon);
       location.style.display = 'block';
       tempinfo.style.display = 'block';
       cloud.style.display = 'block';
       humi.style.display = 'block';
       wsp.style.display = 'block';
       ico.style.display = 'block';
       document.querySelector("#loader").style.display = "none";
    };
  };
};




    
