$(function(){
  $("#name-search-button").on('click', getWeather);
});

var getWeather = function(){
  getCurrentWeather();
  get5dayForecast();
};

var getCurrentWeather = function(){
  var searchTerm = $("#name-search-input").val();
  $.get('/currentWeather/' + searchTerm).done(renderCurrentWeather);
};

var get5dayForecast = function(){
  var searchTerm = $("#name-search-input").val();
  $.get('/5dayForecast/' + searchTerm).done(renderForecast);
};

var kelvinToFahrenheit = function(kelvin){
  return kelvin * (9.0/5.0) - 459.67;
};

var renderCurrentWeather = function(weather) {
  var info = JSON.parse(weather);

  // turns on weather div element and clears last data
  $("#currentWeather").css("display", "block");
  $("#currentWeatherSubTitle").css("display", "block");
  $("#currentWeather").html("");

  //adds elements from weather JSON data
  var currentWeather = $("<h4>");
  currentWeather.addClass("weatherElement");
  currentWeather.html(info.weather[0].description.toUpperCase());
  $("#currentWeather").append(currentWeather);

  var temp = $("<p>");
  temp.addClass("weatherElement");
  temp.html(Math.round(kelvinToFahrenheit(info.main.temp)) + "\&#8457;");
  $("#currentWeather").append(temp);

  var wind = $("<p>");
  wind.addClass("weatherElement");
  wind.html("Wind: " + info.wind.speed + " MPH");
  $("#currentWeather").append(wind);

  var humidity = $("<p>");
  humidity.addClass("weatherElement");
  humidity.html("Humidity: " + info.main.humidity + "%");
  $("#currentWeather").append(humidity);
};

var renderForecast = function(weather) {
  var info = JSON.parse(weather);
  console.log(info);

  $("#forecastWeatherSubTitle").css("display", "block");

  var vizArea = d3.select("#forecastWeather")
                  .selectAll("p")
                  .data(info.list)
                  .enter()
                  .append("p")
                  .text(function (d) {
                    return d.weather[0].description;
                  });
};
