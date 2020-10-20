var apiKey = "6d5c05d695c258c26331ffda6614ba80";
var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather?q=";
var weatherQParams = "&units=imperial&APPID=" + apiKey;

var searchWeather = function (city) {
    var queryURL = openWeatherMap + city + weatherQParams;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        $("#query").val("");
        var cityName = res.name;
        var temp = res.main.temp;
        var humidity = res.main.humidity;
        var windSpeed = res.wind.speed;
        var weatherIcon = res.weather[0].icon;

        createHTML(cityName, temp, humidity, windSpeed, weatherIcon);
        prevCityList(cityName);
    });
}

function createHTML(city, temp, humidity, windSpeed, weatherIcon) {
    var todayDate = new Date().toISOString().slice(0, 10);
    var icon = ("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'/>");
    var htmlString = '<div>' +
    '<div class="cityName">' + city + ' ( ' + todayDate + ')' +
    '<div class="image">' + icon + '</div> </div>' +
    '<div class="weatherData"> Temperature: ' + temp + ' °F </div>' +
    '<div class="weatherData"> Humidity: ' + humidity + ' % </div>' +
    '<div class="weatherData"> Wind Speed: ' + windSpeed + ' MPH </div>' +
    '</div>';
    
    $('#weatherResults').html(htmlString);
}

function prevCityList(cityName) {
    var cityListString = '<div class="card text-danger list-group list-group-flush">' +
    '<p id=' + cityName + '>' + cityName +
    '</p> </div>';

    $('#searchCityResults').append(cityListString);
}

$(document).ready(function () {
    $("#search").on('click', function () {
        var newSearchTerm = $("#query").val();
        console.log(newSearchTerm);
        searchWeather(newSearchTerm);
    });
})