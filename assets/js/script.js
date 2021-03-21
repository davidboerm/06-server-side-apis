$(document).ready(function() {
    // GIVEN a weather dashboard with form inputs
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    var searchHistoryContainer = $('#past-searches');
    var searchForm = $('#search-form');
    var currentWeatherContainer = $('#current-weather');
    var forecastWeatherContainer = $('#forecast-weather');
    
    //Enter api key here
    var apiKey = '';  
    
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrlF = 'https://api.openweathermap.org/data/2.5/forecast?';
    var iconBaseUrl = 'http://openweathermap.org/img/wn/';
    var searchHistory = [];
    // WHEN I search for a city
    searchForm.submit(function(event) {
        event.preventDefault();
        console.log(event);
        // $(this) = this form that just submitted
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        // searchTermDiv.text(city);
        // searchHistoryContainer.append(searchTermDiv);
        console.log(formValues, city);
        // real value gotten from form
        searchCityWeather(city);
        searchCityForecast(city);
    });
    function searchCityWeather(city) {
        var fullUrl = baseUrl + "q=" + city + "&appid=" + apiKey + "&units=imperial";
        console.log(fullUrl);
        //WHEN I view current weather conditions for that city
        // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed
        fetch(fullUrl).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var city = data.name;
            var date = moment().format('(M/DD/YYYY)');
            var temp = data.main.temp;
            var roundedTemp = Math.round(10 * temp)/10;
            var humidity = data.main.humidity;
            var weather = data.weather;
            var iconUrl = iconBaseUrl + weather[0].icon + "@2x.png";
            console.log(iconUrl);
            var wind = data.wind.speed;
            console.log(temp, humidity, wind);
            var cityDiv = $('<div class="city-name">');
            var tempDiv = $('<div class="temp-name">');
            var humidityDiv = $('<div class="humidity-name">');
            var weatherIconImg = $('<img src="" class="icon-name" />');
            var windDiv = $('<div class="wind-name">');
            cityDiv.text(city + " " + date);
            weatherIconImg.attr('src', iconUrl);
            tempDiv.text("Temperature: " + roundedTemp + "\u00B0F");
            humidityDiv.text("Humidity: " + humidity + "\u0025");
            windDiv.text("Windspeed: " + Math.round(wind) + " mph")
            currentWeatherContainer.append(cityDiv);
            currentWeatherContainer.append(weatherIconImg);
            currentWeatherContainer.append(tempDiv);
            currentWeatherContainer.append(humidityDiv);
            currentWeatherContainer.append(windDiv);

            // currentWeatherContainer
        });
    }
    function searchCityForecast(city) {
        var forecastUrl = baseUrlF + "q=" + city + "&appid=" + apiKey + "&units=imperial";
        fetch(forecastUrl).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(forecastUrl);
            console.log("Five Day Forecast", data);
            
            for (var i = 0; i < data.list.length; i++) {
                var isThreeOClock = data.list[i].dt_txt.search('21:00:00');
                var cityName = data.city.name;
                if (isThreeOClock > -1) {
                    var forecast = data.list[i];
                    var temp = forecast.main.temp;
                    var roundedTemp = Math.round(10 * temp)/10;
                    var humidity = forecast.main.humidity;
                    var weatherIcon = forecast.weather;
                    var iconUrl = iconBaseUrl + weatherIcon[0].icon + ".png";
                    var wind = forecast.wind.speed;
                    var date = moment(forecast.dt_txt).format('ddd M/DD');
                    console.log(forecast, temp, humidity, weatherIcon, wind, cityName);
                    var rowDiv = $('<div class="col-2 m-1">');
                    var dateDiv = $('<div class="date-name">');
                    var tempDiv = $('<div class="temp-name">');
                    var humidityDiv = $('<div class="humidity-name">');
                    var weatherImg = $('<img class="icon-name" />');
                    weatherImg.attr('src', iconUrl);
                    var windDiv = $('<div class="wind-name">');
                    dateDiv.text(date);
                    tempDiv.text("Temp: " + roundedTemp + "\u00B0F");
                    humidityDiv.text("Hum: " + humidity + "\u0025");
                    windDiv.text("Wind: " + Math.round(wind) + " mph");
                    rowDiv.append(dateDiv);
                    rowDiv.append(weatherImg);
                    rowDiv.append(tempDiv);
                    rowDiv.append(humidityDiv);
                    rowDiv.append(windDiv);
                    forecastWeatherContainer.append(rowDiv);

                }
            }
        });

        // WHEN I view future weather conditions for that city
        // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

    }
    function retrieveSearchHistory() {
        if (localStorage.getItem('searchHistory')) {
            searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            for (var i = 0; i < searchHistory.length; i++) {
                var searchTermDiv = $('<div class="past-search-term">');
                searchTermDiv.text(searchHistory[i]);
                searchHistoryContainer.append(searchTermDiv);
            }
        }
    }
    retrieveSearchHistory();
});
