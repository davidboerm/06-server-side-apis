// 7a3ab3fca5c10f62a04c7656195495c6
$(document).ready(function() {
    // GIVEN a weather dashboard with form inputs
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    var searchHistoryContainer = $('#past-searches');
    var searchForm = $('#search-form');
    var currentWeatherContainer = $('#current-weather');
    var forecastWeatherContainer = $('#forecast-weather');
    var apiKey = '7a3ab3fca5c10f62a04c7656195495c6'
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrlF = 'https://api.openweathermap.org/data/2.5/forecast?';
    // WHEN I search for a city
    searchForm.submit(function(event) {
        event.preventDefault();
        console.log(event);
        // $(this) = this form that just submitted
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        // ho to create an element with jquery selector
        var searchTermDiv = $('<div class="past-search-term">');
        searchTermDiv.text(city);
        searchHistoryContainer.append(searchTermDiv);
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
            var date = moment().format('MM/DD/YYYY');
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var weatherIcon = data.weather.icon;
            var wind = data.wind.speed;
            console.log(temp, humidity, wind);
            var cityDiv = $('<div class="city-name">');
            var tempDiv = $('<div class="temp-name">');
            var humidityDiv = $('<div class="humidity-name">');
            var weatherIconDiv = $('<div class="icon-name">');
            var windDiv = $('<div class="wind-name">');
            cityDiv.text(city + " " + date);
            tempDiv.text("Temperature: " + temp + "\u00B0F");
            humidityDiv.text("Humidity: " + humidity + "\u0025");
            windDiv.text("Windspeed: " + wind + "mph")
            currentWeatherContainer.append(cityDiv);
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
            console.log("Five Day Forecast", data);
            for (var i = 0; i < data.list.length; i++) {
                
            }
        });

        // WHEN I view future weather conditions for that city
        // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

    }
});